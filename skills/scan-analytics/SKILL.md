---
name: scan-analytics
description: Query real-time scan metrics, date-range reports, geographic breakdowns, and top-performing QR code leaderboards.
---

# QR Code Scan Analytics & Reporting Workflow

Use this skill when users want to evaluate QR code campaign performance, track scans across time, compare scan volumes, or analyze demographic, geographic, and device breakdowns.

## Privacy & Compliance Foundation
- **GDPR & CCPA Compliant**: QRTrac scan logs never expose individual IP addresses or precise GPS coordinates without user consent.
- **Compliance Note**: QRTrac is GDPR compliant. Do not claim SOC2 compliance.
- **Unlimited Scans**: All QRTrac plans include unlimited scans with zero overages.

---

## Tool Mapping & Workflows

### 1. Lifetime & Daily Scan Analytics for Specific Codes
- **Trigger**: "How many scans did my event QR code get?", "Show performance for QR code abc-123"
- **Tool**: `get_qr_analytics`
  - Parameters:
    - `qrIds`: Array of QR code IDs (e.g. `["code_1", "code_2"]`)
    - `days`: Number of preceding days (e.g. `7`, `30`, `90`)
    - OR `startDate` / `endDate` (UTC `YYYY-MM-DD` or ISO timestamp, max 93 days window)
- **Output**: Total scans, unique scans, and a daily timeline series.
- **Presentation**: Render a concise table or bullet summary of total scans and daily activity.

### 2. Geographic & Device Breakdown
- **Trigger**: "Where are people scanning from?", "What phones are scanning my code?"
- **Tool**: `get_scan_breakdown`
  - Parameters:
    - `qrId`: Targeted QR code ID
    - `days` or `startDate`/`endDate`
- **Output**:
  - Top countries and cities
  - Device mix (Mobile vs Desktop vs Tablet)
  - Operating systems (iOS, Android, Windows, macOS)
  - Browser engines (Safari, Chrome, etc.)
- **Presentation**: Group into Markdown tables highlighting top cities and operating system shares.

### 3. Team Scan Leaderboard
- **Trigger**: "Which QR codes are performing best?", "Show my top 5 most scanned codes"
- **Tool**: `get_team_scan_summary`
  - Output: Ranked list of QR codes sorted by total lifetime scan volume.
- **Presentation**: Ranked leaderboard table:
  | Rank | QR Code Name | ID | Lifetime Scans | Destination URL |

### 4. Comprehensive Date-Range Reports
- **Trigger**: "Generate a scan report for September 2026", "Download our quarterly scan summary"
- **Tools**:
  - `get_scan_report`: For the current connected team (all codes or filtered by `qrIds`)
  - `get_org_scan_report`: Aggregated across **every team in the organization** (Organization Owners/Admins only)
- **Presentation**: Provide executive summary:
  - Total Scans & Peak Scanning Day
  - Top Performing Campaigns
  - Geographic & Device Summary
