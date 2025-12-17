# MANSARA FOODS - E-Commerce Website

A complete, production-ready e-commerce website for MANSARA FOODS built with React, TypeScript, Tailwind CSS, and Supabase.

## Features Implemented

### Customer-Facing Features
- **Home Page**: Hero section, product highlights (Offers/Combos/New Arrivals), featured products, Why MANSARA, trust strip
- **Products Page**: Complete catalog with category filters
- **Offers Page**: Special discounted products
- **Combos Page**: Curated product bundles with savings
- **New Arrivals Page**: Latest products
- **Product Detail Page**: Complete product information with image gallery, quantity selector, and add to cart
- **Shopping Cart**: Manage cart items with quantity updates
- **Checkout**: Complete checkout flow with address and payment options
- **User Authentication**: Signup, Login, and Account management
- **Order History**: View past orders and their status
- **About Page**: Complete brand story and founder information
- **Contact Page**: Contact information and inquiry options

### Admin Panel Features
- **Dashboard**: Overview with key metrics (total orders, products, customers)
- **Product Management**:
  - View all products in a table format
  - Add/Edit products with images, pricing, inventory
  - Set product flags (Offer, New Arrival, Featured)
  - Delete products
- **Order Management**:
  - View all orders
  - Update order status
  - View order details including shipping address
- **Customers**: View customer list
- **Admin Authentication**: Protected admin routes

### Technical Features
- Complete Supabase database schema with RLS policies
- User authentication with profile management
- Shopping cart functionality
- Order processing system
- Responsive design for all screen sizes
- Brand colors integrated throughout (Golden Yellow #FDB913, Deep Pink #E91E63, Royal Blue #1F2A7C)

## Getting Started

The application is ready to use. The development server will start automatically.

## Pre-Seeded Data

The database has been pre-populated with:
- 10 products (Porridge Mixes and Oil & Ghee)
- Sample product images from Pexels
- Offer prices on select products

## Creating an Admin Account

To access the admin panel:

1. Sign up for a regular account through the website
2. Note your email address
3. Run this SQL query in Supabase to make your account an admin:
   ```sql
   UPDATE profiles SET is_admin = true WHERE email = 'your-email@example.com';
   ```
4. Log out and log back in
5. Access the admin panel at `/admin`

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

### Admin Routes (Require admin authentication)
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management

## Brand Colors

- Primary Brand (Golden Yellow): #FDB913
- Accent (Deep Pink): #E91E63
- Trust/Headings (Royal Blue): #1F2A7C
- Main Background (Soft Cream): #FFFDF7
- Section Background (Light Yellow): #FFF2CC

## Database Schema

The application uses the following main tables:
- `profiles` - User profiles (linked to auth.users)
- `products` - Product catalog
- `combos` - Combo products
- `combo_items` - Products in combos
- `cart` - Shopping cart items
- `orders` - Customer orders
- `order_items` - Items in orders
- `addresses` - Customer shipping addresses
- `banners` - Homepage banners (for future use)
- `content_pages` - CMS content (for future use)

## Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Admin users have full access to manage products and orders
- Secure authentication using Supabase Auth

## Future Enhancements

To further enhance the platform, consider adding:
- Product image upload functionality in admin panel
- Combo creation interface in admin panel
- Customer management features
- Banner management
- Content management system for About/Contact pages
- Payment gateway integration (currently using COD)
- Email notifications for orders
- Product reviews and ratings
- Search functionality
- Wishlist feature
- Inventory alerts for low stock

## Support

For questions or support, contact MANSARA FOODS at:
- Email: mansarafoods@gmail.com
- Phone: +91 88388 87064
