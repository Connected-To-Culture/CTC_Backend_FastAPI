# CSS Reference per CTC.org

## 🎨 **CTC Market Website Styles → CSS Conversion Reference**

This document converts the actual CSS classes used on the CTC Market website (https://www.connectedtoculture.org/ctc-market) into CSS equivalents for building the web screens. Use these as reference when implementing components.

### **Form & Input Styles**

```css
/* Form field styling - solid style with borders */
.form-field-solid {
  background-color: var(--surface-light);
  border: 1px solid var(--border-light);
  border-radius: 0; /* Square shape */
  padding: 0.75rem;
  font-size: 1rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.form-field-solid:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(109, 236, 19, 0.2);
}

/* Checkbox styling - icon-based with solid fill */
.checkbox-icon-solid {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--border-light);
  border-radius: 0; /* Square shape */
  background-color: var(--surface-light);
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}

.checkbox-icon-solid:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkbox-icon-solid:checked::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--background-dark);
  font-size: 0.875rem;
  font-weight: 600;
}

/* Radio button styling - icon-based with solid fill */
.radio-icon-solid {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--border-light);
  border-radius: 50%; /* Pill shape */
  background-color: var(--surface-light);
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}

.radio-icon-solid:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.radio-icon-solid:checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--background-dark);
}
```

### **Button Styles**

```css
/* Primary button - solid style */
.btn-primary-solid {
  background-color: var(--primary-color);
  color: var(--background-dark);
  border: none;
  border-radius: 0; /* Square shape */
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary-solid:hover {
  background-color: #5ecf0a; /* Slightly darker green */
  transform: translateY(-1px);
}

/* Secondary button - solid style */
.btn-secondary-solid {
  background-color: var(--surface-dark);
  color: var(--text-dark-primary);
  border: none;
  border-radius: 0; /* Square shape */
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary-solid:hover {
  background-color: #344a2a; /* Slightly lighter dark */
}

/* Tertiary button - solid style */
.btn-tertiary-solid {
  background-color: var(--gray-600);
  color: var(--white);
  border: none;
  border-radius: 0; /* Square shape */
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-tertiary-solid:hover {
  background-color: var(--gray-500);
}
```

### **Layout & Content Styles**

```css
/* Full-width layouts */
.layout-full-width {
  width: 100%;
  max-width: none;
}

/* Left-aligned text (most common) */
.text-align-left {
  text-align: left;
}

/* Center-aligned text */
.text-align-center {
  text-align: center;
}

/* Image placement above content */
.image-placement-above {
  display: block;
  margin-bottom: 1rem;
}

.image-placement-above img {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
}

/* Content positioning - center */
.content-position-center {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Excerpt display */
.content-excerpt {
  display: block;
  margin-bottom: 1rem;
  color: var(--text-light-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Read more styling */
.read-more-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.read-more-link:hover {
  color: #5ecf0a;
  text-decoration: underline;
}
```

### **Blog & Content Grid Styles**

```css
/* Blog masonry layout */
.blog-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
}

/* Blog basic grid */
.blog-basic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

/* Blog single column */
.blog-single-column {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

/* Alternating side-by-side layout */
.blog-alternating-side-by-side {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.blog-alternating-side-by-side:nth-child(even) {
  direction: rtl;
}

.blog-alternating-side-by-side:nth-child(even) > * {
  direction: ltr;
}

/* Meta information positioning */
.meta-position-top {
  order: -1;
  margin-bottom: 1rem;
}

.meta-position-below-title {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-light-secondary);
}

/* Content delimiters */
.delimiter-bullet::after {
  content: "•";
  margin: 0 0.5rem;
  color: var(--text-light-secondary);
}

.delimiter-space::after {
  content: "";
  margin: 0 1rem;
}
```

### **Portfolio & Gallery Styles**

```css
/* Portfolio grid basic */
.portfolio-grid-basic {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  width: 100%;
}

.portfolio-grid-basic img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 0.5rem;
  transition: transform 0.3s ease;
}

.portfolio-grid-basic:hover img {
  transform: scale(1.05);
}

/* Portfolio grid overlay */
.portfolio-grid-overlay {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
}

.portfolio-grid-overlay img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.portfolio-grid-overlay:hover img {
  transform: scale(1.1);
}

.portfolio-grid-overlay-text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 2rem 1rem 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-grid-overlay:hover .portfolio-grid-overlay-text {
  opacity: 1;
}
```

### **Event Styles**

```css
/* Events stacked layout */
.events-stacked {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.event-card {
  background-color: var(--surface-light);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.event-thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.event-content {
  padding: 1.5rem;
}

.event-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-light-primary);
}

.event-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--text-light-secondary);
  margin-bottom: 1rem;
}

.event-description {
  color: var(--text-light-primary);
  line-height: 1.6;
}
```

### **Header & Navigation Styles**

```css
/* Full-width header */
.header-full-width {
  width: 100%;
  background-color: var(--surface-light);
  border-bottom: 1px solid var(--border-light);
  padding: 1rem 0;
}

/* Fixed header style */
.header-fixed-basic {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--surface-light);
  border-bottom: 1px solid var(--border-light);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Header overlay alignment */
.header-overlay-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 10;
}
```

### **Animation & Interaction Styles**

```css
/* Global animations - detailed complexity */
.animation-fade {
  transition: opacity 0.3s ease;
}

.animation-scale-up {
  transition: transform 0.3s ease;
}

.animation-scale-up:hover {
  transform: scale(1.05);
}

/* Hover effects */
.hover-effect-fade {
  transition: opacity 0.3s ease;
}

.hover-effect-fade:hover {
  opacity: 0.8;
}

/* Animation curves */
.animation-curve-ease {
  transition-timing-function: ease;
}

/* Animation types */
.animation-type-none {
  transition: none;
}

.animation-type-fade {
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
```

### **Modal & Overlay Styles**

```css
/* Modal overlays */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  background-color: var(--surface-light);
  border-radius: 0.5rem;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-light-secondary);
  transition: color 0.2s;
}

.modal-close:hover {
  color: var(--text-light-primary);
}
```

### **Product & E-commerce Styles**

```css
/* Quick view button */
.product-quick-view-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: var(--primary-color);
  color: var(--background-dark);
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-quick-view-btn {
  opacity: 1;
}

/* Currency display */
.currency-usd::before {
  content: "$";
}
```

### **Responsive & Mobile Styles**

```css
/* Mobile available styles */
@media (max-width: 768px) {
  .mobile-style-available {
    /* Mobile-specific adjustments */
    padding: 1rem;
    font-size: 0.875rem;
  }

  .blog-alternating-side-by-side {
    grid-template-columns: 1fr;
  }

  .portfolio-grid-basic {
    grid-template-columns: 1fr;
  }

  .events-stacked {
    padding: 1rem;
  }
}

/* Squarespace 7.1 specific styles */
.sqs-seven-one {
  /* Base styles for Squarespace 7.1 template */
  font-family: "Plus Jakarta Sans", sans-serif;
  line-height: 1.6;
}
```

## 🔧 **Implementation Guidelines**

### **Component Building Reference**

When building web screens, reference these CSS classes:

1. **Cards & Content Blocks**: Use `.content-position-center` with `.text-align-left`
2. **Form Elements**: Use `.form-field-solid` with appropriate focus states
3. **Buttons**: Choose from `.btn-primary-solid`, `.btn-secondary-solid`, `.btn-tertiary-solid`
4. **Layouts**: Use grid layouts like `.blog-basic-grid` or `.portfolio-grid-basic`
5. **Images**: Apply `.image-placement-above` for consistent image positioning
6. **Typography**: Use the font utility classes (`.text-base`, `.font-medium`, etc.)
7. **Interactive Elements**: Add hover effects with `.animation-fade` or `.hover-effect-fade`

### **Common Patterns**

- **Full-width sections**: Apply `.layout-full-width`
- **Left-aligned content**: Use `.text-align-left` (default)
- **Excerpt display**: Add `.content-excerpt` class
- **Meta information**: Position with `.meta-position-top` or `.meta-position-below-title`
- **Grid layouts**: Use responsive grids that adapt to mobile with CSS Grid

### **CSS Block Structure Example**

```css
.customer-home-card {
  @extend .content-position-center;
  @extend .text-align-left;
  background-color: var(--surface-light);
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.customer-home-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.customer-home-card img {
  @extend .image-placement-above;
}

.customer-home-card .title {
  @extend .text-xl;
  @extend .font-semibold;
  margin-bottom: 0.5rem;
}

.customer-home-card .description {
  @extend .text-base;
  @extend .content-excerpt;
}
```
