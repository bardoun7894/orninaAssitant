# Design Document

## Overview

The ORNINA AI ASSISTENT landing page is a single-page Next.js application that presents a minimalist, visually striking interface. The page features a navy blue gradient background with a centered headline and an animated sound wave visualization. The design prioritizes visual impact and simplicity, with no navigation or interactive elements.

## Architecture

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: shadcn/ui for consistent styling utilities
- **Animation**: Framer Motion for smooth, performant animations
- **Styling**: Tailwind CSS (included with shadcn/ui)
- **Language**: TypeScript for type safety

### Project Structure

```
ornina-landing-page/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles including gradient
├── components/
│   └── sound-wave.tsx      # Animated sound wave component
├── lib/
│   └── utils.ts            # shadcn/ui utility functions
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── components.json         # shadcn/ui configuration
└── package.json
```

## Components and Interfaces

### 1. Main Page Component (`app/page.tsx`)

**Purpose**: Root page component that orchestrates the layout

**Structure**:
- Full-height container with flexbox centering
- Navy blue gradient background
- Centered content wrapper containing headline and sound wave

**Styling**:
- Uses Tailwind classes for layout
- Custom gradient defined in globals.css
- Responsive text sizing using Tailwind's responsive utilities

### 2. Sound Wave Component (`components/sound-wave.tsx`)

**Purpose**: Animated SVG sound wave visualization

**Props Interface**:
```typescript
interface SoundWaveProps {
  className?: string;
}
```

**Animation Strategy**:
- SVG with multiple vertical bars representing sound wave
- Each bar animates independently with staggered timing
- Uses Framer Motion's `motion.rect` for smooth animations
- Animation loops infinitely with varying heights
- Easing function: `easeInOut` for natural wave motion

**Technical Details**:
- SVG viewBox: `0 0 1200 100` for consistent scaling
- 40-60 vertical bars with 2-3% width each
- Bar heights animate between 20% and 80% of container
- Staggered delay: 0.05-0.1s between bars
- Animation duration: 1.5-2s per cycle
- Color: Light blue/cyan to contrast with navy background

## Data Models

No complex data models required. The application is purely presentational with hardcoded content.

### Configuration Constants

```typescript
// Sound wave configuration
const WAVE_CONFIG = {
  barCount: 50,
  barWidth: 2,
  barGap: 1,
  minHeight: 20,
  maxHeight: 80,
  animationDuration: 1.8,
  staggerDelay: 0.05,
  color: '#60a5fa' // blue-400
};
```

## Styling Details

### Color Palette

- **Background Gradient**: 
  - Start: `#0a1628` (deep navy)
  - End: `#1e3a5f` (lighter navy blue)
  - Direction: Top to bottom
  
- **Headline**: 
  - Color: `#ffffff` (white)
  - Font: Inter or similar modern sans-serif
  - Size: 
    - Mobile: 2.5rem (40px)
    - Tablet: 4rem (64px)
    - Desktop: 5rem (80px)

- **Sound Wave**: 
  - Color: `#60a5fa` (Tailwind blue-400)
  - Opacity: 0.8-1.0 for depth effect

### Responsive Breakpoints

- **Mobile**: < 768px
  - Headline: 2.5rem
  - Wave height: 60px
  - Padding: 1rem

- **Tablet**: 768px - 1279px
  - Headline: 4rem
  - Wave height: 80px
  - Padding: 2rem

- **Desktop**: ≥ 1280px
  - Headline: 5rem
  - Wave height: 100px
  - Padding: 3rem

### Layout Strategy

- Flexbox for vertical and horizontal centering
- Full viewport height (`min-h-screen`)
- Content wrapper with max-width for very large screens
- Gap between headline and wave: 3-4rem

## Animation Specifications

### Sound Wave Animation

**Animation Type**: Continuous loop

**Behavior**:
- Each bar oscillates between min and max height
- Staggered start times create wave propagation effect
- Smooth easing for natural motion
- No user interaction required

**Framer Motion Implementation**:
```typescript
<motion.rect
  animate={{
    height: [minHeight, maxHeight, minHeight],
  }}
  transition={{
    duration: animationDuration,
    repeat: Infinity,
    ease: "easeInOut",
    delay: index * staggerDelay,
  }}
/>
```

**Performance Considerations**:
- Use `will-change: transform` for GPU acceleration
- Limit number of animated elements to 50-60 bars
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid layout-triggering properties

## Error Handling

### Graceful Degradation

- If Framer Motion fails to load, display static sound wave
- If custom fonts fail to load, fall back to system sans-serif
- Ensure gradient background works across all browsers

### Browser Compatibility

- Target modern browsers (Chrome, Firefox, Safari, Edge)
- Use CSS fallbacks for gradient (solid navy if gradient unsupported)
- SVG is widely supported; no fallback needed

## Testing Strategy

### Visual Testing

- Verify gradient renders correctly across browsers
- Confirm headline centering on all screen sizes
- Validate sound wave animation smoothness
- Check responsive behavior at breakpoints

### Performance Testing

- Measure animation frame rate (target: 60fps)
- Test on lower-end devices for performance
- Verify initial page load time < 2 seconds

### Responsive Testing

- Test on physical devices: iPhone, iPad, Android phones/tablets
- Use browser dev tools for responsive simulation
- Verify at breakpoints: 375px, 768px, 1024px, 1920px

### Accessibility Considerations

- Ensure sufficient contrast for headline text
- Add `prefers-reduced-motion` media query to disable animations if requested
- Include proper semantic HTML structure
- Add appropriate meta tags for SEO

## Implementation Notes

### Setup Steps

1. Initialize Next.js project with TypeScript
2. Install and configure shadcn/ui
3. Install Framer Motion
4. Configure Tailwind with custom gradient
5. Set up project structure

### Key Dependencies

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "framer-motion": "^10.0.0",
  "tailwindcss": "^3.0.0"
}
```

### Development Workflow

1. Create base layout and page structure
2. Implement gradient background
3. Add and style headline
4. Build sound wave component
5. Integrate Framer Motion animations
6. Test responsiveness
7. Optimize performance
