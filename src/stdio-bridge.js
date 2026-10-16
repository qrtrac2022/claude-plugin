#!/usr/bin/env node

/**
 * QRTrac Claude Desktop MCP stdio Bridge
 *
 * Bridges Claude Desktop's stdio-based MCP client to QRTrac's
 * remote Streamable HTTP MCP endpoint (https://mcp.qrtrac.com/mcp).
 */

const readline = require('readline');

const MCP_ENDPOINT = process.env.QRTRAC_MCP_URL || 'https://mcp.qrtrac.com/mcp';
const ACCESS_TOKEN = process.env.QRTRAC_ACCESS_TOKEN || process.env.QRTRAC_API_KEY || '';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

async function handleRpcMessage(line) {
  const trimmed = line.trim();
  if (!trimmed) return;

  try {
    const jsonMessage = JSON.parse(trimmed);

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream'
    };

    if (ACCESS_TOKEN) {
      headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
    }

    const response = await fetch(MCP_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(jsonMessage)
    });

    if (!response.ok) {
      // If 401 Unauthorized, return a friendly JSON-RPC error informing Claude
      if (response.status === 401) {
        const authChallenge = response.headers.get('www-authenticate') || '';
        const errorResponse = {
          jsonrpc: '2.0',
          id: jsonMessage.id ?? null,
          error: {
            code: -32001,
            message: `QRTrac MCP authentication required. Connect via Claude.ai Settings -> Connectors or supply QRTRAC_ACCESS_TOKEN. (Challenge: ${authChallenge})`
          }
        };
        process.stdout.write(JSON.stringify(errorResponse) + '\n');
        return;
      }

      const errorText = await response.text();
      const errorResponse = {
        jsonrpc: '2.0',
        id: jsonMessage.id ?? null,
        error: {
          code: -32603,
          message: `Upstream QRTrac MCP HTTP error ${response.status}: ${errorText}`
        }
      };
      process.stdout.write(JSON.stringify(errorResponse) + '\n');
      return;
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      process.stdout.write(JSON.stringify(data) + '\n');
    } else {
      const text = await response.text();
      // Parse SSE lines or text if returned
      const lines = text.split('\n');
      for (const l of lines) {
        if (l.startsWith('data: ')) {
          try {
            const parsed = JSON.parse(l.slice(6));
            process.stdout.write(JSON.stringify(parsed) + '\n');
          } catch {
            // ignore non-json SSE lines
          }
        }
      }
    }
  } catch (err) {
    const errorResponse = {
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32603,
        message: `Bridge error: ${err.message}`
      }
    };
    process.stdout.write(JSON.stringify(errorResponse) + '\n');
  }
}

rl.on('line', (line) => {
  handleRpcMessage(line).catch((err) => {
    console.error('[qrtrac-bridge] Uncaught error:', err);
  });
});

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
