# CTC Market Font Setup

This directory was created for local font hosting, but the application is now using working Adobe Typekit URLs for Acumin Pro fonts.

## Current Status

**Fonts are now loaded from Adobe Typekit** using working URLs. The application successfully loads Acumin Pro fonts in the following weights:

- Regular (400)
- Bold (700)
- Medium Italic (500 italic)
- Bold Italic (700 italic)

## Previous Local Font Setup (No Longer Needed)

The original plan was to host fonts locally, but working Typekit URLs are now being used instead.

### Required Font Files (No Longer Needed)

If you ever want to switch back to local hosting, you would need:

### Regular Weight (400)

- `acumin-pro-regular.woff2` - WOFF2 format (preferred)
- `acumin-pro-regular.woff` - WOFF format (fallback)
- `acumin-pro-regular.otf` - OpenType format (fallback)

### Medium Weight (500)

- `acumin-pro-medium.woff2`
- `acumin-pro-medium.woff`
- `acumin-pro-medium.otf`

### Semibold Weight (600)

- `acumin-pro-semibold.woff2`
- `acumin-pro-semibold.woff`
- `acumin-pro-semibold.otf`

## How to Obtain Fonts for Local Hosting (If Needed)

1. **Purchase License**: Acumin Pro is a commercial font family. You need to purchase a proper license from:
   - Adobe Fonts (Typekit) - if you have an Adobe Creative Cloud subscription
   - MyFonts.com or other licensed font vendors

2. **Download Files**: Once licensed, download the font files in WOFF2, WOFF, and OTF formats.

3. **File Naming**: Rename the downloaded files to match the names above.

4. **Place in Directory**: Copy all font files to this `public/fonts/` directory.

5. **Update CSS**: Modify `src/styles/globalStyles.css` to use local URLs instead of Typekit URLs.

## Current Typekit URLs

The application currently uses these working Typekit URLs:

- `https://use.typekit.net/af/df6585/00000000000000007735d404/31/l?subset_id=2&fvd=n7&v=3` (Bold)
- `https://use.typekit.net/af/aee3f7/00000000000000007735d426/31/l?subset_id=2&fvd=n5&v=3` (Regular)
- `https://use.typekit.net/af/7e8e7e/00000000000000007735d42a/31/l?subset_id=2&fvd=i5&v=3` (Medium Italic)
- `https://use.typekit.net/af/2cdd37/00000000000000007735d408/31/l?subset_id=2&fvd=i7&v=3` (Bold Italic)

## Important Notes

- **Licensing**: Ensure you have proper licensing for commercial fonts.
- **Performance**: Typekit fonts load asynchronously with `font-display: swap`.
- **Fallback**: If font loading fails, the app falls back to system fonts.

## Alternative: Free Fonts

If you cannot obtain Acumin Pro, consider these free alternatives:

- **Inter**: Modern, highly readable font (Google Fonts)
- **Source Sans Pro**: Clean, professional font (Adobe)
- **Open Sans**: Friendly, readable font (Google Fonts)
