# Axis3D - 3D Printing Service Website

## Overview

Axis3D is a professional 3D printing service website based in Dublin, Ireland. The site serves as a marketing and information platform for a custom 3D printing business offering prototyping, custom prints, and replacement parts using FDM printing technology with PLA and PETG materials. The application is a simple, static front-end website with modal-based interactions for displaying service information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- Pure HTML, CSS, and vanilla JavaScript (no frameworks)
- Google Fonts (Outfit font family) for typography
- ScrollReveal.js library for scroll-based animations

**Design Decisions:**

1. **Static Site Approach**
   - Problem: Need for a lightweight, fast-loading marketing website
   - Solution: Single-page static HTML site with inline CSS
   - Rationale: Minimal overhead, excellent performance, easy to host, and sufficient for informational content
   - Pros: Fast load times, simple deployment, no server-side processing needed
   - Cons: Limited scalability for complex features, manual updates required

2. **Modal-Based UI Pattern**
   - Problem: Display detailed service information without page navigation
   - Solution: JavaScript-controlled modal windows (ModalP, ModalG, ModalO)
   - Rationale: Keeps users on single page while providing detailed information on demand
   - Pros: Smooth user experience, no page reloads, clean interface
   - Cons: Requires JavaScript enabled, content not directly indexable

3. **CSS Variables for Theming**
   - Problem: Consistent color scheme management
   - Solution: CSS custom properties (--bg, --ink, --muted) defined in :root
   - Rationale: Centralized theme management for easy updates and potential dark mode support
   - Pros: Easy theme modifications, maintainable code
   - Cons: Limited browser support for very old browsers

4. **SEO Optimization Strategy**
   - Problem: Need to rank well for local 3D printing searches in Dublin/Ireland
   - Solution: Comprehensive meta tags including geographic tags, Open Graph, and Twitter cards
   - Rationale: Marketing site requires strong search presence and social media sharing capabilities
   - Included: Geographic metadata, structured keywords, canonical URL, social media preview cards
   - Pros: Better search engine visibility, professional social sharing, location-based targeting
   - Cons: Requires manual updates if business details change

5. **Favicon Implementation**
   - Problem: Need professional branding in browser tabs and when users bookmark the site
   - Solution: Multi-size favicon setup with ICO fallback and Apple touch icon
   - Rationale: Professional appearance across all browsers and devices, from legacy to modern
   - Files: favicon.ico (multi-size), favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png (180×180)
   - Pros: Works across all browsers, optimized for each context, professional appearance
   - Cons: Requires maintaining multiple image assets

### Application Structure

**File Organization:**
- `index.html` - Main page with embedded styles, metadata, and favicon links
- `script.js` - Modal functionality and interaction handlers
- `favicon.ico` - Multi-size favicon for legacy browser support
- `favicon-16x16.png` - Small favicon for modern browsers
- `favicon-32x32.png` - Standard favicon for modern browsers
- `apple-touch-icon.png` - iOS home screen icon (180×180)
- `icon-dark.png` - Original logo source file
- Image assets: bull.jpeg, mini-sch.jpg, screw.jpg, mag.jpg - Gallery examples

**Modal System:**
- Three separate modals (P, G, O) likely representing different service categories or information types
- Global modal variables initialized on DOM load
- Click-outside-to-close functionality for improved UX
- Centralized `closeModal()` function for all modals

## External Dependencies

### Third-Party Libraries

1. **ScrollReveal.js**
   - Source: unpkg.com CDN
   - Purpose: Scroll-based animation effects
   - Usage: Likely animates elements as users scroll down the page

2. **Google Fonts (Outfit)**
   - Source: Google Fonts API
   - Purpose: Custom typography
   - Configuration: Variable font weights (100-900) with display=swap optimization

### External Services

No backend services, databases, or APIs are currently integrated. The site operates entirely client-side with no data persistence or server communication.

**Potential Future Integrations:**
- Contact form backend (email service or form handler)
- Quote request system
- File upload for 3D model submissions
- Payment processing for online orders
- Analytics (Google Analytics or similar)