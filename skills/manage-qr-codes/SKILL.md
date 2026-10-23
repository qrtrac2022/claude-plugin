---
name: manage-qr-codes
description: Create, update, repoint, duplicate, organize, or delete dynamic QR codes without needing to reprint physical materials.
---

# Dynamic QR Code Management Workflow

Use this skill whenever the user wants to create dynamic QR codes, repoint existing codes, manage destination URLs, organize codes into folders, or delete codes.

## Core Principle: Post-Print Editable Codes

Dynamic QR codes have a permanent short link or scan URL encoded into the printed black-and-white matrix. The destination URL is resolved dynamically by QRTrac edge redirect servers.
- **Key Benefit**: Users can change the destination URL anytime after printing without reprinting packaging, business cards, table tents, or posters.
- **Safety First**: Repointing or deleting a live QR code immediately impacts all printed copies in circulation. Always clarify or confirm before destructive actions or before repointing a live production code if the user did not specify the target code ID.

---

## Tool Mapping & Execution Steps

### 1. Create a Dynamic QR Code
- **Trigger**: "Create a QR code for https://example.com/spring-sale", "Generate a dynamic QR code"
- **Tool**: `create_qr_code`
- **Display Title (`annotations.title`)**: `Create a QR code`
- **Annotations**: `readOnlyHint: false`, `destructiveHint: false`
- **Parameters**:
  - `targetUrl` (`string`, required): Destination URL (https://, http://, mailto:, tel:, sms:)
  - `name` (`string`, optional): Name of campaign/code in QRTRAC dashboard (e.g. "Spring Campaign 2026")
  - `folderId` (`string`, optional): Folder ID to place the code in
  - `expiresAt` (`string` or `number`, optional): Expiration date/time
- **Output**:
  - `id`: Unique QR code ID
  - `scanUrl`: The short scan link (e.g. `https://qrtrac.com/s/xyz` or custom domain)
  - `qrImageUrl`: Printable high-resolution PNG image URL
- **User Presentation**:
  - Show the destination URL and scan URL.
  - Present the QR code image preview so the user can scan and test it immediately.
  - Remind the user that they can change the destination URL anytime post-print.

### 2. Update / Repoint Destination URL
- **Trigger**: "Change the destination of my menu QR code to https://example.com/fall-menu", "Repoint my QR code"
- **Tool**: `update_qr_code`
- **Display Title (`annotations.title`)**: `Update a QR code`
- **Annotations**: `readOnlyHint: false`, `destructiveHint: true`
- **Parameters**:
  - `qrId` (`string`, required): Target QR code ID
  - `targetUrl` (`string`, optional): New destination URL
  - `name` (`string`, optional): Updated campaign name
  - `expiresAt` (`string` or `number`, optional): Updated expiration
- **User Presentation**:
  - Confirm the update was applied.
  - Reassure the user that already-printed codes remain 100% active and will redirect to the new URL immediately with zero latency.

### 3. List & Search QR Codes
- **Trigger**: "Show all my QR codes", "Find my restaurant menu QR code"
- **Tool**: `list_qr_codes`
- **Display Title (`annotations.title`)**: `List QR codes`
- **Annotations**: `readOnlyHint: true`, `destructiveHint: false`
- **Parameters**:
  - `search` (`string`, optional): Filter by name
  - `folderId` (`string`, optional): Filter by folder
  - `page` (`number`, optional), `limit` (`number`, optional)
- **User Presentation**:
  - Format the list into a clean Markdown table with Columns: **Name**, **ID**, **Current Destination**, **Created Date**, and **Folder**.

### 4. Folder Organization
- **Tools**:
  - `list_folders` (Title: `List folders`, `readOnlyHint: true`, `destructiveHint: false`): Retrieve current folder hierarchy
  - `create_folder` (Title: `Create a folder`, `readOnlyHint: false`, `destructiveHint: false`): Create a new folder (optional `parentId` for sub-folders)
  - `rename_folder` (Title: `Rename a folder`, `readOnlyHint: false`, `destructiveHint: false`): Rename an existing folder
  - `move_qr_code_to_folder` (Title: `Move a QR code to a folder`, `readOnlyHint: false`, `destructiveHint: false`): Move a QR code into a folder or back to root (`folderId: null`)
  - `delete_folder` (Title: `Delete a folder`, `readOnlyHint: false`, `destructiveHint: true`): Delete folder without deleting codes (codes are automatically moved up to parent/root)

### 5. Deleting QR Codes
- **Tools**:
  - `delete_qr_code` (Title: `Delete a QR code`, `readOnlyHint: false`, `destructiveHint: true`)
  - `bulk_delete_qr_codes` (Title: `Delete several QR codes`, `readOnlyHint: false`, `destructiveHint: true`)
- **Warning**: Marked with `destructiveHint: true`. Deleting a code irreversibly breaks any printed material referencing its scan URL. Always ask for explicit user confirmation before executing a deletion unless the user clearly commanded immediate deletion of a specific ID.
