# Implementation Notes for Logo Replacement

1. Upload the 'Untitled design (1).png' file to: `public/assets/icons/brain-card-rounded.png`
2. The logo has been implemented with rounded corners and a nice glow effect
3. All service icons have been replaced with this new logo throughout the application
4. The logo includes hover effects for better interactivity
5. If the image doesn't appear, verify the path is correct and the image is properly uploaded

## Changes Made:

1. Created a new `BrainCardLogo` component with:
   - Rounded corners
   - Cyan/blue glow effect
   - Hover animations and scaling
   - Size variations (sm, md, lg)

2. Replaced all service icons in:
   - ConnectedDevices component
   - CCONodeMap component
   - Service modals

The component automatically adds the container with rounded corners and glow effects around your logo image.

# CCO Logo Implementation Guide

## Logo Sizes and Use Cases

### Favicon and App Icons
| Size | Purpose | File Name |
|------|---------|-----------|
| 16x16 | Basic favicon | `favicon-16x16.png` |
| 32x32 | Standard favicon | `favicon-32x32.png` |
| 48x48 | Windows site icons | `favicon-48x48.png` |
| 180x180 | Apple Touch icon | `apple-touch-icon.png` |
| 192x192 | Android home screen | `android-chrome-192x192.png` |
| 512x512 | PWA icon | `android-chrome-512x512.png` |

### Social Media and Brand Usage
| Size | Purpose | File Name |
|------|---------|-----------|
| 200x200 | Minimum social profile | `logo-social-small.png` |
| 400x400 | Optimal social profile | `logo-social.png` |
| 1200x630 | Social sharing card | `logo-og-image.png` |
| 1500x500 | Social media banner | `logo-social-banner.png` |

### Application UI
| Size | Purpose | File Name |
|------|---------|-----------|
| 24x24 | Small nav icon | `logo-nav-small.png` |
| 40x40 | Nav bar logo | `logo-nav.png` |
| 120x40 | Header logo | `logo-header.png` |
| 200x60 | Large header logo | `logo-header-large.png` |
| 250x250 | Marketing logo | `logo-marketing.png` |

## Implementation Guidelines

### Web Application

1. **Favicon Implementation**
```html
<!-- Place these in your HTML head -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

2. **Open Graph Meta Tags**
```html
<meta property="og:image" content="https://your-domain.com/logo-og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

### Logo Usage in Components

1. **Navigation Bar**
```tsx
<nav>
  <Image
    src="/logo-nav.png"
    alt="CCO Logo"
    width={40}
    height={40}
    className="dark:invert"
  />
</nav>
```

2. **Header**
```tsx
<header>
  <Image
    src="/logo-header.png"
    alt="CCO Logo"
    width={120}
    height={40}
    className="dark:invert"
  />
</header>
```

## Design Guidelines

### Spacing
- Maintain minimum clear space around the logo equal to the height of the "O" in "CCO"
- Never compress or stretch the logo
- Use appropriate size based on context and viewport

### Color Usage
- Primary logo color: `#4F46E5` (electric-indigo)
- Dark mode logo color: `#FFFFFF` (white)
- Use the `dark:invert` class for automatic dark mode switching

### File Formats
- Use SVG for scalable implementations where possible
- Use PNG with transparency for fixed-size implementations
- Maintain master files in vector format (AI/SVG)

## File Organization
```
public/
├── branding/
│   ├── favicons/
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon-48x48.png
│   │   └── apple-touch-icon.png
│   ├── social/
│   │   ├── logo-social.png
│   │   ├── logo-og-image.png
│   │   └── logo-social-banner.png
│   └── ui/
│       ├── logo-nav.png
│       ├── logo-header.png
│       └── logo-marketing.png
```

## Accessibility
- Ensure all logo implementations include appropriate alt text
- Maintain sufficient contrast ratios in all use cases
- Provide text alternatives for logo-only navigation items

## Performance
- Use appropriate image format for each use case
- Implement lazy loading for non-critical logo images
- Use responsive images when appropriate
- Optimize all logo files for web use

## Version Control
- Maintain a version history of logo files
- Document any changes to logo specifications
- Keep master files in a secure location
- Use semantic versioning for logo updates
