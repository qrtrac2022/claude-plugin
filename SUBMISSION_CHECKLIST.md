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
- [x] **Tool Annotations & Display Titles** (per [Review Criteria](https://claude.com/docs/connectors/building/review-criteria#provide-tool-annotations)):
  - Every tool exports `annotations.title` with a human-readable name for directory listings.
  - Safe inspection/read tools carry `readOnlyHint: true` (eligible for auto-execution without per-call confirmation).
  - Data modification and deletion tools carry `destructiveHint: true` (prompts user confirmation).
- [x] **Strict Parameter Typing**: All schema inputs have explicit JSON schema types (`backgroundColor: string`, `backgroundImageUrl: string`, `openLinksInNewTab: boolean`, `linkTextAlignment: string`).
- [x] **Destructive Actions Guarded**: `delete_qr_code`, `bulk_delete_qr_codes`, and `delete_folder` carry `destructiveHint: true` and require confirmation.
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

## 5. Developer Portal Submission (claude.ai/directory/manage)

Anthropic accepts submissions via the Developer Portal at [claude.ai/directory/manage](https://claude.ai/directory/manage) under **Submit new**:

### Option 1: Plugin Bundle
- **Repository URL**: `https://github.com/qrtrac2022/claude-plugin`
- **Plugin Path**: `/` (or leave blank for repo root)
- **Tracked Branch / Tag**: `main` or `v1.0.0`
- **Package / Plugin Name** (`plugin.json`): `qrtrac` *(must be lowercase kebab-case for Claude.ai marketplace sync)*
- **Display Name**: `QRTRAC` (or `QRTRAC - Dynamic QR Codes & Analytics`)
- **Author / Legal Entity**: `QRTRAC LLC`
- **One-Liner** (<200 chars): `Create dynamic QR codes, branded short links (Bitly alternative), mobile Link-in-Bio pages, and track real-time analytics with QRTRAC.`
- **Support Contact**: `support@qrtrac.com`
- **Homepage / Website**: `https://qrtrac.com`
- **Privacy Policy URL**: `https://qrtrac.com/privacy-policy/`
- **Terms of Service URL**: `https://qrtrac.com/terms-conditions/`

### Option 2: MCP Connector
- **Connection Endpoint**: `https://mcp.qrtrac.com/mcp`
- **Server / Display Name**: `QRTRAC`
- **Listing Slug**: `qrtrac`
- **Company / Legal Entity**: `QRTRAC LLC`
- **Company Website**: `https://qrtrac.com`
- **Primary Contact**: Your Name / `support@qrtrac.com`
- **Categories**: `Productivity`, `Marketing`, `Developer Tools`
- **Icon**: `assets/icon.png` (512x512 PNG)
- **Documentation URL**: `https://apidocs.qrtrac.com/`
- **Authentication**: OAuth 2.0 / 2.1 Dynamic Client Registration (`https://mcp.qrtrac.com/register`)
- **API Ownership**: First-party API (`https://api.qrtrac.com`)
- **Test Credentials**: Reviewer test account credentials on `qrtrac.com` with sample QR codes and analytics data.

---

## 6. Community Listing vs. Anthropic Verified

- Initial approval places the plugin into the **Community Directory** after automated review.
- Updates pushed to the GitHub repository are automatically mirrored by Claude's CI.
- **Anthropic Verified** status involves deeper manual review. Never claim or display the verified badge prior to official grant.
