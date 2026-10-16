# Changelog

All notable changes to the **QRTrac Claude Plugin** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-16

### Added
- Initial public release for Claude Plugin Marketplace and Claude Code.
- Streamable HTTP remote MCP connector for `https://mcp.qrtrac.com/mcp` with RFC 8414 OAuth 2.1 metadata discovery and S256 PKCE authorization.
- 3 core workflow skills:
  - `manage-qr-codes`: Create dynamic QR codes, repoint destination URLs without reprinting, duplicate codes, and manage folders.
  - `scan-analytics`: Real-time scan metrics, date-range reports, geographic (city/country) & device mix breakdown, and team leaderboard.
  - `link-list-pages`: Build mobile Link-in-Bio pages and vCards with secure image upload handling.
- Lightweight stdio bridge (`src/stdio-bridge.js`) for Claude Desktop integration.
- Ready-to-copy `claude_desktop_config.json` snippet.
- Automated live MCP connection test suite (`test/test-connection.js`).
- Complete permissions and data access inventory.
- GitHub Actions CI workflow for automated verification on pull requests and releases.
