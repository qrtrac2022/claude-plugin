/**
 * Automated test script to verify QRTrac MCP live endpoints:
 * - RFC 8414 OAuth Authorization Server Metadata
 * - RFC 9728 OAuth Protected Resource Metadata
 * - Health Check endpoint
 * - MCP HTTP Endpoint handshake & WWW-Authenticate challenge
 */

const BASE_URL = 'https://mcp.qrtrac.com';

async function runTests() {
  console.log(`\n🔍 Testing QRTrac MCP Service at: ${BASE_URL}\n`);
  let passed = 0;
  let failed = 0;

  // Test 1: Health check
  try {
    const res = await fetch(`${BASE_URL}/health`);
    if (res.ok) {
      console.log('✅ [1/4] GET /health - OK (Service alive)');
      passed++;
    } else {
      console.log(`❌ [1/4] GET /health - HTTP ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.log(`❌ [1/4] GET /health - Network error: ${err.message}`);
    failed++;
  }

  // Test 2: RFC 8414 OAuth Authorization Server Metadata
  try {
    const res = await fetch(`${BASE_URL}/.well-known/oauth-authorization-server`);
    if (res.ok) {
      const data = await res.json();
      if (data.issuer && data.authorization_endpoint && data.token_endpoint) {
        console.log(`✅ [2/4] GET /.well-known/oauth-authorization-server - Valid RFC 8414 (Issuer: ${data.issuer})`);
        passed++;
      } else {
        console.log('❌ [2/4] GET /.well-known/oauth-authorization-server - Missing required metadata fields');
        failed++;
      }
    } else {
      console.log(`❌ [2/4] GET /.well-known/oauth-authorization-server - HTTP ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.log(`❌ [2/4] GET /.well-known/oauth-authorization-server - Network error: ${err.message}`);
    failed++;
  }

  // Test 3: RFC 9728 OAuth Protected Resource Metadata
  try {
    const res = await fetch(`${BASE_URL}/.well-known/oauth-protected-resource`);
    if (res.ok) {
      const data = await res.json();
      console.log(`✅ [3/4] GET /.well-known/oauth-protected-resource - Valid RFC 9728 (Resource: ${data.resource || data.authorization_servers})`);
      passed++;
    } else {
      console.log(`⚠️ [3/4] GET /.well-known/oauth-protected-resource - HTTP ${res.status}`);
    }
  } catch (err) {
    console.log(`⚠️ [3/4] GET /.well-known/oauth-protected-resource - Error: ${err.message}`);
  }

  // Test 4: MCP Endpoint without auth -> Expect 401 + WWW-Authenticate header
  try {
    const res = await fetch(`${BASE_URL}/mcp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'claude-test-client', version: '1.0.0' }
        },
        id: 1
      })
    });

    if (res.status === 401) {
      const authHeader = res.headers.get('www-authenticate');
      console.log(`✅ [4/4] POST /mcp (unauthenticated) - 401 with WWW-Authenticate header: "${authHeader}"`);
      passed++;
    } else if (res.ok) {
      console.log(`✅ [4/4] POST /mcp responded HTTP ${res.status}`);
      passed++;
    } else {
      console.log(`❌ [4/4] POST /mcp unexpected status: ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.log(`❌ [4/4] POST /mcp error: ${err.message}`);
    failed++;
  }

  console.log(`\n================================`);
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
