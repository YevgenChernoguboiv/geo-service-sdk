# Wholesale Terminal - B2B Telegram Mini App

A high-speed wholesale ordering interface designed for mobile commerce, optimized for Telegram Web Apps. This prototype simulates receiving data from a 1C ERP system and enables quick product booking before stock runs out.

## Features

- **Dark Mode Optimized**: High contrast interface designed for sunlight readability
- **Custom Numpad**: Native keyboard-free quantity entry for precise control
- **Real-time Stock Indicators**: Visual alerts with pulsing animations for low stock
- **Cart Persistence**: Orders saved to localStorage across sessions
- **Dense Data Terminal Layout**: Minimal padding, maximum information density
- **Mobile-First Design**: Optimized for ~380px width (Telegram viewport)
- **Smooth Animations**: 200-300ms transitions with no jank
- **Touch-Optimized**: 44px+ touch targets with press feedback

## Tech Stack

- **React 19** + **Vite** - Fast development and build
- **TypeScript** - Type safety throughout
- **Tailwind CSS 4** - Utility-first styling with dark mode
- **Zustand** - Lightweight state management with persistence
- **Lucide React** - Beautiful icon set

## Project Structure

```
src/
├── components/
│   ├── Header.tsx           # App header with refresh button
│   ├── ProductList.tsx      # Product grid with skeleton loaders
│   ├── ProductCard.tsx      # Individual product with stock indicators
│   ├── NumpadModal.tsx      # Custom numeric keypad for quantity entry
│   ├── CartFooter.tsx       # Sticky footer with cart summary
│   ├── CheckoutModal.tsx    # Order summary and confirmation
│   └── Toast.tsx            # Notification system
├── services/
│   ├── api.ts               # Mock API (easily swappable)
│   └── types.ts             # TypeScript interfaces
├── store/
│   └── cartStore.ts         # Zustand cart state management
├── styles/
│   └── globals.css          # Global styles and utilities
├── App.tsx                  # Main application component
└── main.tsx                 # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd telegram-mini-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown (typically http://localhost:5173)

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Mock Data

The app includes 20 realistic wholesale products with varied stock levels:
- ~5 items with low stock (<10) - Red indicator with pulsing animation
- ~8 items with medium stock (10-50) - Yellow/amber indicator
- ~7 items with high stock (>100) - Green indicator

Products include:
- LED Panel 600x1200
- Acoustic Foam Board
- Industrial Cable 3x2.5
- Circuit Breakers
- Junction Boxes
- Cable Trays
- And more...

## Swapping to Real API

To connect to a real 1C ERP system, modify `src/services/api.ts`:

```typescript
// Replace the mock getProducts function with:
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://your-api.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};
```

Ensure the API returns data matching the `Product` interface in `src/services/types.ts`.

## Key Features Breakdown

### Stock Scarcity System
- **Green (>=50 units)**: Full progress bar, green accent
- **Amber (10-49 units)**: Proportional bar, yellow accent
- **Red (<10 units)**: Proportional bar, red accent + **pulsing animation**

### Custom Numpad
- Prevents native mobile keyboard from appearing
- Direct number entry (0-9)
- MAX button fills available stock
- PACK (+12) for quick wholesale increments
- Real-time validation with visual feedback
- Backspace for corrections

### Cart Management
- Add items with custom quantities
- Persistent across page refreshes (localStorage)
- Remove items from checkout
- Real-time total calculation
- Tax calculation (15%)

### Animations
- 200ms slide-up modals
- Staggered fade-in for product list (30ms delay per item)
- Stock pulse animation for urgency
- Button press feedback (scale-down)
- Smooth transitions throughout

## Mobile Optimizations

- Viewport meta tags for Telegram Web App
- Prevent zoom on input focus
- No text selection, no touch highlights
- 44px minimum touch targets
- Overscroll behavior disabled
- Smooth scrolling enabled

## Browser Support

- Modern browsers (Chrome, Safari, Firefox, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Telegram Web App environment

## Development Notes

- Hot Module Replacement (HMR) enabled
- TypeScript strict mode enabled
- ESLint configured for React best practices
- Path aliases configured (@/ for src/)

## Future Enhancements

- [ ] Search and filter products
- [ ] Category navigation
- [ ] Order history
- [ ] Barcode scanner integration
- [ ] Multiple price tiers
- [ ] Favorites/Quick reorder
- [ ] Push notifications for stock updates
- [ ] Multi-language support

## License

MIT

## Support

For issues or questions, please open an issue on the repository.

---

Built with ⚡ by [Your Name]
