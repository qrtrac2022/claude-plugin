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
  - Parameters: `sourceUrl` (HTTPS URL of image) OR `data` (base64 encoded image string)
  - Output: Public HTTPS media URL (`https://storage.googleapis.com/.../media/...`)

### 2. Create a List of Links Page
- **Tool**: `create_link_list_qr_code`
  - Parameters:
    - `name`: Name of the QR code campaign
    - `pageTitle`: Headline displayed at the top of the mobile page
    - `pageDescription`: Bio / subtitle
    - `profileImageUrl`: Team-uploaded avatar image URL
    - `links`: Array of button objects:
      ```json
      [
        { "title": "Visit Website", "url": "https://example.com" },
        { "title": "Book a Consultation", "url": "https://calendly.com/team" },
        { "title": "Instagram", "url": "https://instagram.com/brand" }
      ]
      ```
    - `backgroundColor` / `theme`: Custom hex color or styling
  - Output: QR code ID, scan URL, printable image URL.

### 3. Update Existing List of Links Page
- **Tool**: `update_link_list_qr_code`
  - Parameters: `qrId`, updated title, description, links array, or theme settings.
  - Preservation: Existing unchanged widgets and images are safely preserved.

### 4. Create vCard / Digital Business Card
- **Tool**: `create_vcard_qr_code`
  - Parameters: Name, organization, title, phone, email, website URL, address.
  - Output: Scannable QR code that allows smartphones to instantly save the contact into their address book without an app.
