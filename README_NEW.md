# MANSARA FOODS - E-Commerce Website (Hardcoded Data Version)

A complete, production-ready e-commerce website for MANSARA FOODS built with React, TypeScript, Tailwind CSS, and **hardcoded mock data** (no backend required).

## Key Changes

This version has been **completely converted to use hardcoded data** instead of Supabase:

- All backend/database connections **removed**
- Uses **localStorage** for cart, orders, and user sessions
- Mock data for 10 products, 3 combos, and 2 demo users
- No installation or configuration needed
- Works entirely in the browser

## Demo Credentials

### Customer Login
- **Email**: `customer@example.com`
- **Password**: `customer123`

### Admin Login
- **Email**: `admin@mansarafoods.com`
- **Password**: `admin123`

## Features

### Customer-Facing Features
- **Home Page**: Hero section, product highlights (Offers/Combos/New Arrivals), featured products
- **Products Page**: Complete catalog with category filters (Porridge Mixes, Oil & Ghee)
- **Offers Page**: Special discounted products
- **Combos Page**: Curated product bundles with savings
- **New Arrivals Page**: Latest products
- **Product Detail Page**: Complete product information with image gallery, quantity selector, and add to cart
- **Shopping Cart**: Manage cart items with quantity updates (stored in localStorage)
- **Checkout**: Complete checkout flow with address and payment options
- **User Authentication**: Signup, Login, and Account management
- **Order History**: View past orders (stored in localStorage)
- **About Page**: Complete brand story and founder information
- **Contact Page**: Contact information

### Admin Features (View Only)
- **Dashboard**: Overview with key metrics
- **Product Listing**: View all products
- **Order Management**: View orders
- **Customer Listing**: View customers
- **All data is read from hardcoded mockData.ts**

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

4. Login with demo credentials above

## File Structure

```
src/
├── data/
│   └── mockData.ts          # All hardcoded products, combos, users
├── contexts/
│   └── AuthContext.tsx      # localStorage-based authentication
├── hooks/
│   └── useCart.ts           # localStorage-based cart management
├── pages/
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── Offers.tsx
│   ├── Combos.tsx
│   ├── NewArrivals.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx         # localStorage-based orders
│   ├── Account.tsx          # View order history
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── admin/              # Admin pages (view-only)
└── components/
    ├── Header.tsx
    ├── Footer.tsx
    ├── ProductCard.tsx
    └── AdminLayout.tsx
```

## Mock Data

### Products (10 items)
1. URAD Porridge Mix – Classic (₹180, Offer: ₹150)
2. URAD Porridge Mix – Salt & Pepper (₹200, Offer: ₹170)
3. URAD Porridge Mix – Millet Magic (₹220, New Arrival)
4. URAD Porridge Mix – Premium (₹280, Offer: ₹250)
5. Porridge Mix – Black Rice Delight (₹250, New Arrival)
6. Idly Powder Mix – Millet Fusion (₹150, Offer: ₹130)
7. Groundnut Oil - Classic (₹350)
8. Sesame Oil - Classic (₹400, Offer: ₹360)
9. Coconut Oil - Classic (₹320)
10. Ghee - Classic (₹600, Offer: ₹550)

### Combos (3 items)
1. Health Essentials Combo (₹650, Save ₹80)
2. Traditional Oil Trio (₹950, Save ₹120)
3. Breakfast Bundle (₹480, Save ₹100)

## Data Storage

All data is stored in browser **localStorage**:
- **User Session**: `mansara_user`
- **Shopping Cart**: `mansara_cart_{userId}`
- **Orders**: `mansara_orders_{userId}`

**Note**: Clearing browser data will reset everything.

## How It Works

### Authentication
- Hardcoded demo users in `mockData.ts`
- Login validates against these users
- Session stored in localStorage
- No real password encryption (demo only)

### Shopping Cart
- Add/remove items stored in localStorage
- Persists across page refreshes
- Cleared on logout or checkout

### Orders
- Orders saved to localStorage on checkout
- Viewable in Account page
- No backend processing (demo only)

### Products
- All products loaded from `mockData.ts`
- Filtered by category, offers, new arrivals
- Images from Pexels (free stock photos)

## Available Routes

### Customer Routes
- `/` - Home page
- `/products` - All products
- `/offers` - Special offers
- `/combos` - Product combos
- `/new-arrivals` - New products
- `/product/:slug` - Product detail
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/order-success/:orderNumber` - Order confirmation
- `/about` - About MANSARA
- `/contact` - Contact information
- `/login` - User login
- `/signup` - Create account
- `/account` - User account and order history

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/products` - Product listing
- `/admin/offers` - Offers management
- `/admin/combos` - Combos management
- `/admin/orders` - Order management
- `/admin/customers` - Customer listing
- `/admin/banners` - Banner management
- `/admin/settings` - Site settings

## Brand Colors

- Primary Brand (Golden Yellow): #FDB913
- Accent (Deep Pink): #E91E63
- Trust/Headings (Royal Blue): #1F2A7C
- Main Background (Soft Cream): #FFFDF7
- Section Background (Light Yellow): #FFF2CC

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready to deploy to any static hosting service.

## Limitations

This is a **demo version** with hardcoded data:
- No real database or backend
- No payment processing
- No email notifications
- No user registration (only demo accounts work)
- Data resets on browser clear
- No file uploads
- No admin editing capabilities

## Converting to Production

To convert this to a real production app:
1. Set up a backend (Node.js, Supabase, Firebase, etc.)
2. Replace `mockData.ts` with API calls
3. Implement real authentication
4. Add payment gateway integration
5. Set up email notifications
6. Add file upload functionality
7. Implement admin editing features

## Support

For questions or support, contact MANSARA FOODS at:
- Email: mansarafoods@gmail.com
- Phone: +91 88388 87064
