# QRTRAC Claude Plugin & MCP Connector Setup

This guide walks you through connecting Claude to your **QRTRAC** workspace via the official remote MCP endpoint:
`https://mcp.qrtrac.com/mcp`

---

## 1. Prerequisites

- A **QRTRAC** account (Any plan, including the **7-day free trial** with no credit card required: [Sign Up](https://qrtrac.com/signup/)).
- Access to Claude through one of the supported surfaces:
  - **Claude.ai / Claude for Work / Enterprise** (via Custom Connectors)
  - **Claude Code CLI** (via `claude plugin install`)
  - **Claude Desktop** (via MCP Server configuration)

> [!NOTE]
> QRTRAC is GDPR and CCPA compliant. Unlimited scans are included on all plans with no per-scan fees or overages. 
> 501(c)(3) nonprofits receive 50% off all plans forever: [Nonprofit Verification](https://qrtrac.com/nonprofit-organizations/verify/).

---

## 2. Connection Methods

### Option A: Claude.ai (Web / Work / Team / Enterprise)

1. Open **Claude.ai** and navigate to **Settings** → **Connectors**.
2. Click **Add custom connector**.
3. Enter the connector URL:
   ```text
   https://mcp.qrtrac.com/mcp
   ```
4. Click **Sign in with QRTRAC**.
5. Log in with your email/password or Google account, select the target Team, and approve the requested scopes:
   - `qr:read` — Read QR codes and folders
   - `qr:write` — Create, update, duplicate, and delete QR codes
   - `analytics:read` — Query scan reports, breakdown statistics, and team leaderboards
6. Once connected, the QRTRAC tools are active in your Claude chats and Claude Projects!

---

### Option B: Claude Code CLI

Install the plugin directly or from your repository clone:

```bash
# Direct from local folder
claude plugin install /Users/carmany/Documents/AI-Agents/qrtrac-claude-plugin

# OR add the remote MCP endpoint directly
claude mcp add qrtrac https://mcp.qrtrac.com/mcp
```

Validate the plugin anytime:
```bash
claude plugin validate ./
```

---

### Option C: Claude Desktop (macOS / Windows)

Open your Claude Desktop configuration file:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add the `qrtrac` server using either the built-in stdio bridge or remote endpoint:

```json
{
  "mcpServers": {
    "qrtrac": {
      "command": "node",
      "args": [
        "/Users/carmany/Documents/AI-Agents/qrtrac-claude-plugin/src/stdio-bridge.js"
      ],
      "env": {
        "QRTRAC_MCP_URL": "https://mcp.qrtrac.com/mcp"
      }
    }
  }
}
```

Restart Claude Desktop. A hammer/tool icon will appear in the input composer.

---

## 3. Verify the Connection

Ask Claude a harmless query to verify the connection:

> *"Check my QRTRAC connection status and show me what team I am connected to."*

Claude will invoke the `get_connection` tool:
- Returns your connected email, organization ID, and team ID.
- Confirms whether read and write permissions are active.

---

## 4. Disconnect & Uninstall

To disconnect or revoke access:
- **Claude.ai**: Go to **Settings** → **Connectors** → Find **QRTRAC** → Click **Disconnect** / **Remove**.
- **Claude Code**: Run `claude plugin uninstall qrtrac` or `claude mcp remove qrtrac`.
- **Claude Desktop**: Remove the `qrtrac` entry from `claude_desktop_config.json` and restart Claude Desktop.
- **Revoke Tokens**: You can also revoke tokens at any time through the QRTRAC dashboard or by calling the OAuth revocation endpoint at `https://mcp.qrtrac.com/revoke`.
