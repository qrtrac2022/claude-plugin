# QRTRAC Claude Plugin & MCP Connector

Official Claude Plugin and Model Context Protocol (MCP) Connector for **[QRTRAC](https://qrtrac.com)** — the enterprise dynamic QR code, branded smart short link (Bitly alternative), and scan analytics platform.

Connects Claude to **`https://mcp.qrtrac.com/mcp`** to create and edit dynamic QR codes, generate branded short links with custom domains, repoint destinations post-print without reprinting, build mobile link-in-bio pages, and query real-time scan analytics directly within Claude conversations.

---

## ⚡ Quick Start

### 1. Claude.ai (Web / Work / Enterprise)
1. Go to **Settings** → **Connectors** → **Add custom connector**.
2. Enter:
   ```text
   https://mcp.qrtrac.com/mcp
   ```
3. Sign in to your QRTrac account (or start a [7-day free trial](https://qrtrac.com/signup/), no credit card required) and select your team.

### 2. Claude Code CLI
```bash
# Install from local directory
claude plugin install /Users/carmany/Documents/AI-Agents/qrtrac-claude-plugin

# OR add remote MCP directly
claude mcp add qrtrac https://mcp.qrtrac.com/mcp
```

### 3. Claude Desktop
Add to your `claude_desktop_config.json`:
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

---

## 📦 Package Structure

This package adheres strictly to the official **Anthropic Claude Plugin Directory** specifications:

```text
qrtrac-claude-plugin/
├── .claude-plugin/
│   └── plugin.json            # Plugin manifest (metadata, author, version)
├── skills/
│   ├── manage-qr-codes/
│   │   └── SKILL.md           # Dynamic QR code creation, repointing, & lifecycle
│   ├── scan-analytics/
│   │   └── SKILL.md           # Scans, geolocation, device breakdowns, & leaderboards
│   └── link-list-pages/
│       └── SKILL.md           # Mobile List of Links & vCard builder
├── assets/                    # Logos, icons, and screenshots
├── src/
│   └── stdio-bridge.js        # Stdio bridge for Claude Desktop
├── test/
│   └── test-connection.js     # Live OAuth discovery & MCP endpoint tests
├── .mcp.json                  # MCP server declaration (https://mcp.qrtrac.com/mcp)
├── mcp.json                   # Standard agent-plugins MCP specification
├── claude_desktop_config.json # Ready-to-copy Claude Desktop configuration
├── SETUP.md                   # Idempotent setup guide and verification flow
├── SUBMISSION_CHECKLIST.md    # Pre-flight checklist for Claude Plugin Directory
└── README.md                  # Complete documentation and permission inventory
```

---

## 🛡️ Permissions & Data Access Inventory

In accordance with Anthropic review guidelines, here is the transparent capability inventory:

| Capability | Scope / Resource | What the User Should Know |
| :--- | :--- | :--- |
| **Remote MCP** | `https://mcp.qrtrac.com/mcp` | Remote Streamable HTTP endpoint over HTTPS. All requests carry user's bound team JWT. |
| **QR Code Read** | `qr:read` | Read-only access to view QR codes, destination URLs, scan URLs, templates, and folders. |
| **QR Code Write** | `qr:write` | Create dynamic QR codes, update destination URLs, duplicate codes, create folders, and manage link-list pages. Deletion has `destructiveHint` and requires confirmation. |
| **Analytics Read** | `analytics:read` | Query scan totals, time-series, geographic (country/city), and device breakdown. Never exposes individual user IP addresses or precise coordinates without consent. |
| **Media Upload** | `upload_image` | Uploads user-provided images (PNG, JPEG, WebP, GIF, max 5 MB) to the team's dedicated media storage. SVG is refused for security. |

---

## 🛠️ Complete Tool Reference

In accordance with [Claude Connector Pre-Submission Review Criteria](https://claude.com/docs/connectors/building/review-criteria#provide-tool-annotations), every tool provides human-readable `title` / `annotations.title` annotations and explicit permission hints (`readOnlyHint` / `destructiveHint`):

| Tool Identifier | Display Title (`annotations.title`) | Permission Hint | Category | Description |
| :--- | :--- | :--- | :--- | :--- |
| `get_connection` | Show the connected QRTRAC account | `readOnlyHint: true` | Account | Inspect which user and team the active connection is bound to. |
| `list_qr_codes` | List QR codes | `readOnlyHint: true` | Codes | Paginated list of QR codes, filterable by name or folder. |
| `get_qr_code` | Get a QR code | `readOnlyHint: true` | Codes | Retrieve full record for a specific QR code. |
| `create_qr_code` | Create a QR code | Safe Write | Codes | Create a dynamic QR code; returns scan URL and printable PNG. |
| `update_qr_code` | Update a QR code | `destructiveHint: true` | Codes | Update destination URL or name post-print without reprinting. |
| `duplicate_qr_code` | Duplicate a QR code | Safe Write | Codes | Clone an existing QR code with a new ID and scan link. |
| `delete_qr_code` | Delete a QR code | `destructiveHint: true` | Codes | Irreversibly delete a QR code. |
| `bulk_delete_qr_codes` | Delete several QR codes | `destructiveHint: true` | Codes | Delete up to 50 codes at once within the connected team. |
| `list_qr_templates` | List QR templates | `readOnlyHint: true` | Styling | List team styling presets and color palettes. |
| `list_folders` | List folders | `readOnlyHint: true` | Folders | View flattened folder hierarchy with parent IDs. |
| `create_folder` | Create a folder | Safe Write | Folders | Create a new organizational folder or sub-folder. |
| `rename_folder` | Rename a folder | Safe Write | Folders | Rename an existing folder. |
| `delete_folder` | Delete a folder | `destructiveHint: true` | Folders | Delete folder (codes automatically move up to parent/root). |
| `move_qr_code_to_folder` | Move a QR code to a folder | Safe Write | Folders | Move a code into a folder or back to root. |
| `create_link_list_qr_code` | Create a list-of-links QR code | Safe Write | Landing Pages | Build a mobile "List of Links" / Link-in-Bio page with buttons, custom theme colors, and layout. |
| `update_link_list_qr_code` | Update a list-of-links QR code | `destructiveHint: true` | Landing Pages | Update links, avatar, title, or colors on a link-list page. |
| `create_vcard_qr_code` | Create a Digital Business Card (vCard) QR code | Safe Write | Business Cards | Generate scannable contact business card QR codes. |
| `update_vcard_qr_code` | Update a Digital Business Card (vCard) QR code | `destructiveHint: true` | Business Cards | Update contact info and details on a digital business card. |
| `upload_image` | Upload an image | Safe Write | Media | Import image into team media bucket (validates bytes, 5 MB max). |
| `get_qr_analytics` | Get scan analytics | `readOnlyHint: true` | Analytics | Scan totals and daily series for specific codes (up to 93 days). |
| `get_scan_breakdown` | Break scans down by country and device | `readOnlyHint: true` | Analytics | Geographic (country/city) and device mix (OS, browser, device). |
| `get_team_scan_summary` | Summarize scans across the team | `readOnlyHint: true` | Analytics | Leaderboard of top-performing QR codes by scan volume. |
| `get_scan_report` | Scan report for a date range | `readOnlyHint: true` | Analytics | Detailed date-range report for the connected team. |
| `get_org_scan_report` | Organisation-wide scan report for a date range | `readOnlyHint: true` | Analytics | Organization-wide scan report across all teams (Admins only). |

---

## 🔒 Data Handling, Privacy & Remote Communication

This plugin communicates with remote services operated by QRTRAC:
- **Remote MCP Endpoint**: `https://mcp.qrtrac.com/mcp`
- **Upstream API**: `https://api.qrtrac.com`

### What Data Is Sent:
- **QR Code Content**: Destination URLs, titles, and button links supplied by the user to create or update dynamic QR codes.
- **Media Uploads**: Images uploaded via `upload_image` are stored in the user's team-scoped Google Cloud Storage bucket.
- **Authentication**: OAuth 2.1 access tokens scoped strictly to the selected user and team (`qr:read`, `qr:write`, `analytics:read`).

### What Data Is Never Sent or Stored:
- No user passwords or unhashed tokens are retained.
- Scan analytics logs never store or expose individual visitor IP addresses or precise GPS coordinates.

### Legal & Privacy Links:
- **Privacy Policy**: [https://qrtrac.com/privacy-policy/](https://qrtrac.com/privacy-policy/)
- **Terms of Service**: [https://qrtrac.com/terms-conditions/](https://qrtrac.com/terms-conditions/)
- **License**: [MIT License](./LICENSE)

---

## 🔒 Compliance & Trust Signals

- **GDPR & CCPA Aligned**: QRTRAC adheres to GDPR and CCPA data privacy frameworks.
- **Compliance Status**: QRTRAC is GDPR compliant. Do NOT claim SOC2 compliance.
- **Unlimited Scans**: All plans include unlimited scans with zero overages or per-scan fees.
- **Nonprofit Discount**: Verified 501(c)(3) nonprofits receive 50% off forever: [https://qrtrac.com/nonprofit-organizations/verify/](https://qrtrac.com/nonprofit-organizations/verify/)

---

## 🧪 Testing & Validation

Run local validation and live endpoint tests:

```bash
# Validate live MCP discovery endpoints
npm test

# Validate Claude plugin syntax and schema (with Claude Code CLI installed)
npm run validate
```
