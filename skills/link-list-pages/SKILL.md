---
name: link-list-pages
description: Build, update, and manage mobile-friendly "List of Links" pages, link-in-bio profiles, and digital business cards.
---

# Link-in-Bio & Mobile Landing Pages Workflow

Use this skill when users want to create or edit multi-link landing pages (similar to Linktree / Flowcode page), digital business cards, or event link directories hosted on their QR code scan URL.

## Capabilities & Media Security

- **Link in Bio / List of Links**: A single dynamic QR code leads to a responsive mobile page with a custom heading, bio description, avatar/profile image, customizable button links, and branded background color or image.
- **Image Upload Security**: Images (profile picture, background banner, button icons) must be uploaded via `upload_image` tool before embedding.
  - Accepted formats: PNG, JPEG, WebP, GIF (Max 5 MB).
  - Storage: Uploaded to secure Google Cloud Storage in the team's media bucket.
  - SVG is refused for security reasons.

---

## Tool Mapping & Execution

### 1. Upload Images (if applicable)
- **Tool**: `upload_image`
- **Display Title (`annotations.title`)**: `Upload an image`
- **Annotations**: `readOnlyHint: false`, `destructiveHint: false`
- **Parameters**:
  - `sourceUrl` (`string`, optional): HTTPS URL of public image to import
  - `data` (`string`, optional): Base64-encoded image data string (PNG, JPEG, WebP, GIF, max 5 MB)
- **Output**: Public HTTPS media URL (`https://storage.googleapis.com/.../media/...`)

### 2. Create a List of Links Page
- **Tool**: `create_link_list_qr_code`
- **Display Title (`annotations.title`)**: `Create a list-of-links QR code`
- **Annotations**: `readOnlyHint: false`, `destructiveHint: false`
- **Parameters**:
  - `name` (`string`, required): Name shown in the QRTRAC dashboard (1–200 characters)
  - `links` (`array`, required): Stack of button objects (1–50 items), top to bottom:
    ```json
    [
      {
        "title": "Visit Website",
        "url": "https://example.com",
        "imageUrl": "https://storage.googleapis.com/.../media/...",
        "buttonColor": "#FFFFFF",
        "buttonTextColor": "#121212"
      }
    ]
    ```
  - `title` (`string`, optional): Heading shown at the top of the mobile page (max 120 characters)
  - `subtitle` (`string`, optional): Short description/bio under the heading (max 500 characters)
  - `profileImageUrl` (`string`, optional): Round avatar/logo image — a URL from `upload_image` (max 2048 characters)
  - `backgroundColor` (`string`, optional): Page background colour — 6-digit hex string, e.g. `#FFFFFF`
  - `backgroundImageUrl` (`string`, optional): Page background image — a URL from `upload_image` (max 2048 characters)
  - `openLinksInNewTab` (`boolean`, optional): Open links in a new browser tab (default `false`)
  - `linkTextAlignment` (`string`, optional): Alignment of button text — `"left"`, `"center"`, or `"right"` (default `"left"`)
  - `folderId` (`string`, optional): Place the code in this folder (see `list_folders`)
  - `tags` (`array of strings`, optional): Tags for filtering in the dashboard (max 20 tags)
- **Output**: Created QR code details (`id`, `scanUrl`, `qrImageUrl`).

### 3. Update Existing List of Links Page
- **Tool**: `update_link_list_qr_code`
- **Display Title (`annotations.title`)**: `Update a list-of-links QR code`
- **Annotations**: `readOnlyHint: false`, `destructiveHint: true`
- **Parameters**:
  - `qrId` (`string`, required): The QR code ID from `list_qr_codes`
  - `name` (`string`, optional): New dashboard name (1–200 characters)
  - `links` (`array`, optional): Complete replacement button list (1–50 items)
  - `title` (`string`, optional): Updated headline at the top of the page (max 120 characters)
  - `subtitle` (`string`, optional): Updated bio/description under the heading (max 500 characters)
  - `profileImageUrl` (`string`, optional): Updated profile image URL, or empty string `""` to remove
  - `backgroundColor` (`string`, optional): Updated page background colour (6-digit hex string, e.g. `#FFFFFF`)
  - `backgroundImageUrl` (`string`, optional): Updated page background image URL, or empty string `""` to remove
  - `openLinksInNewTab` (`boolean`, optional): Open links in a new browser tab (default `false`)
  - `linkTextAlignment` (`string`, optional): Alignment of button text — `"left"`, `"center"`, or `"right"`
- **Preservation**: Existing web-app widgets and untouched settings are safely preserved.

### 4. Create vCard / Digital Business Card
- **Tool**: `create_vcard_qr_code`
- **Display Title (`annotations.title`)**: `Create a Digital Business Card (vCard) QR code`
- **Annotations**: `readOnlyHint: false`, `destructiveHint: false`
- **Parameters**:
  - `firstName` (`string`, required): First name (1–80 characters)
  - `lastName` (`string`, optional): Last name (max 80 characters)
  - `organization` (`string`, optional): Company or organization name (max 120 characters)
  - `jobTitle` (`string`, optional): Role or title (max 120 characters)
  - `email` (`string`, optional): Contact email address
  - `phone` (`string`, optional): Primary phone number
  - `websiteUrl` (`string`, optional): Website link
  - `address` (`object`, optional): Physical/mailing address
- **Output**: Scannable QR code that allows smartphones to instantly save the contact into their address book without an app.
