# Claude Plugin Marketplace Submission Checklist

This checklist aligns with Anthropic's official submission requirements and the Flowlines Submission Guide (*"How to Get Listed in the Claude Plugin Marketplace"*).

---

## 1. Package Structure Requirements

- [x] Manifest located precisely at `.claude-plugin/plugin.json`.
- [x] Skills, agents, hooks, commands, and MCP declarations located at the **plugin root** (never inside `.claude-plugin/`).
- [x] `.mcp.json` declares the live remote MCP endpoint: `https://mcp.qrtrac.com/mcp`.
- [x] `SETUP.md` provides an idempotent, step-by-step onboarding and verification process using `get_connection`.
- [x] All visual assets present in `assets/` (`icon.png`, `icon-dark.png`, `logo.png`, `logo-dark.png`, `screenshot.png`).
- [x] No empty directories or placeholder files.

---

## 2. Security & Data Integrity

- [x] **Zero hardcoded secrets**: No API keys, passwords, or test tokens in code, git history, or fixtures.
- [x] **OAuth 2.1 & PKCE Compliance**: Remote MCP endpoint (`https://mcp.qrtrac.com/mcp`) implements RFC 8414 metadata discovery, RFC 7591 dynamic client registration (DCR), and S256 PKCE.
- [x] **Destructive Actions Guarded**: `delete_qr_code` and `bulk_delete_qr_codes` carry `destructiveHint` and require confirmation.
- [x] **Media Validation**: `upload_image` validates image magic bytes (PNG, JPEG, WebP, GIF only) and enforces a 5 MB limit. SVG is blocked.
- [x] **Permissions Inventory**: Transparently documented in `README.md` for reviewers and users.
- [x] **Compliance Note**: Accurately describes GDPR compliance and does NOT claim SOC2 compliance.

---

## 3. Local Testing & Verification

- [x] Live endpoint tests pass:
  ```bash
  node test/test-connection.js
  ```
- [x] Claude plugin schema validation:
  ```bash
  claude plugin validate ./
  ```
  *(Or in CI strict mode: `claude plugin validate ./ --strict`)*

---

## 4. GitHub Repository Submission

1. Push this directory to a public GitHub repository (e.g. `https://github.com/qrtrac2022/claude-plugin`).
   > *Note: Closed-source plugins are not accepted for the public Claude directory.*
2. Ensure repository tags are initialized (e.g. `v1.0.0`).
3. Maintain consistency between GitHub author, domain (`qrtrac.com`), and support contact (`support@qrtrac.com`).

---

## 5. Submission Portals

Choose one of the official Anthropic submission routes:
- **Claude.ai Portal**: [https://claude.ai/admin-settings/directory/submissions/plugins/new](https://claude.ai/admin-settings/directory/submissions/plugins/new) (Requires Team or Enterprise role).
- **Console Portal**: [https://platform.claude.com/plugins/submit](https://platform.claude.com/plugins/submit) (Requires Developer, Admin, or Owner role).

### Submission Form Answers
- **Plugin Name**: `qrtrac`
- **Display Name**: `QRTrac QR Codes & Analytics`
- **Category**: Productivity / Marketing
- **Repository URL**: `https://github.com/qrtrac2022/claude-plugin`
- **MCP Endpoint**: `https://mcp.qrtrac.com/mcp`
- **Core Value Proposition**: Enables Claude users to create, manage, and edit dynamic QR codes, repoint destinations post-print without reprinting, build mobile Link-in-Bio pages, and query real-time scan analytics.
- **Support Contact**: `support@qrtrac.com`
- **Privacy Policy**: `https://qrtrac.com/privacy-policy/`
- **Terms of Service**: `https://qrtrac.com/terms-conditions/`

---

## 6. Community Listing vs. Anthropic Verified

- Initial approval places the plugin into the **Community Directory** after automated review.
- Updates pushed to the GitHub repository are automatically mirrored by Claude's CI.
- **Anthropic Verified** status involves deeper manual review. Never claim or display the verified badge prior to official grant.
