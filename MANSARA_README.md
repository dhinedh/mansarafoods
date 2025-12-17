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

### Admin Panel Features (COMPLETE)
- **Dashboard**: Overview with key metrics (total orders, today's orders, products, pending orders, customers)
  - Quick action buttons for common tasks
  - Real-time statistics

- **Product Management** (FULLY IMPLEMENTED):
  - View all products in a sortable table
  - Add new products with comprehensive form
  - Edit existing products
  - Multiple product images with main image selection
  - Set pricing (regular price + offer price)
  - Manage inventory (stock quantity)
  - Product content (descriptions, ingredients, how to use, storage instructions)
  - Visibility flags: Offer, New Arrival, Featured, Active/Inactive
  - Auto-generate SEO-friendly slugs
  - Delete products

- **Offers Management** (FULLY IMPLEMENTED):
  - Enable/disable offer status on products
  - Set offer prices for products
  - View active offers with discount percentages
  - Quick toggle offer status from centralized dashboard

- **Combos Management** (FULLY IMPLEMENTED):
  - Create new combo packages
  - Edit existing combos
  - Select multiple products with quantities
  - Auto-calculate original price from included products
  - Set combo price with automatic savings calculation
  - Upload combo images
  - Enable/disable combo visibility
  - View savings percentage
  - Delete combos

- **Order Management** (FULLY IMPLEMENTED):
  - View all orders in sortable table
  - Update order status (Pending, Confirmed, Packed, Shipped, Delivered, Cancelled)
  - View detailed order information
  - See customer shipping address
  - Track payment status
  - Order number tracking

- **Customer Management** (FULLY IMPLEMENTED):
  - View all customers (read-only for safety)
  - Customer statistics (total orders, total spent)
  - View individual customer details
  - See customer order history
  - Track customer join date
  - Calculate average order value

- **Banner Management** (FULLY IMPLEMENTED):
  - Add/edit/delete banners
  - Upload banner images
  - Assign banners to specific pages (Home, Offers, Combos, New Arrivals)
  - Set display order
  - Enable/disable banner visibility
  - Reorder banners with up/down arrows

- **Settings** (FULLY IMPLEMENTED):
  - Website name and logo configuration
  - Contact information (email, phone, address)
  - Social media links (Facebook, Instagram, Twitter)
  - Brand colors display
  - All settings stored in database

- **Security**:
  - Admin authentication required
  - Protected admin routes
  - Role-based access control

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

## Admin Panel Access

### Creating an Admin Account

To access the admin panel:

1. Sign up for a regular account through the website
2. Note your email address
3. Run this SQL query in Supabase to make your account an admin:
   ```sql
   UPDATE profiles SET is_admin = true WHERE email = 'your-email@example.com';
   ```
4. Log out and log back in
5. Access the admin panel at `/admin`

### Using the Admin Panel

**Dashboard** (`/admin`)
- View key business metrics at a glance
- Quick access to common actions
- Real-time order and customer statistics

**Products Management** (`/admin/products`)
- Click "Add Product" to create new products
- Click edit icon to modify existing products
- Set product as Offer/New Arrival/Featured for homepage visibility
- Upload multiple product images (use Pexels URLs)
- Set regular price and optional offer price for discounts
- Manage stock quantity
- Toggle active/inactive status

**Offers Management** (`/admin/offers`)
- Enable "Is Offer" flag on products
- Set special offer prices
- View all active offers with discount percentages
- Products marked as offers appear on `/offers` page

**Combos Management** (`/admin/combos`)
- Click "Create Combo" to bundle products together
- Select multiple products with quantities
- System auto-calculates original price
- Set discounted combo price
- System shows savings amount and percentage
- Upload combo image
- Combos appear on `/combos` page

**Orders Management** (`/admin/orders`)
- View all customer orders
- Update order status through the workflow:
  - Pending → Confirmed → Packed → Shipped → Delivered
- View order details including shipping address
- Track payment status

**Customers Management** (`/admin/customers`)
- View all registered customers (read-only)
- See customer statistics (orders, total spent)
- Click view icon to see customer order history
- Track customer lifetime value

**Banner Management** (`/admin/banners`)
- Add banners for different pages
- Upload banner images (use Pexels URLs)
- Set display order
- Use up/down arrows to reorder
- Enable/disable banner visibility

**Settings** (`/admin/settings`)
- Update website name and contact information
- Configure social media links
- View brand colors
- Settings save to database

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
- `/admin` - Admin dashboard with statistics
- `/admin/products` - Product listing
- `/admin/products/new` - Add new product
- `/admin/products/:id` - Edit product
- `/admin/offers` - Offers management
- `/admin/combos` - Combos management
- `/admin/orders` - Order management
- `/admin/customers` - Customer listing and details
- `/admin/banners` - Banner management
- `/admin/settings` - Site settings

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

## Completed Features

The admin panel is now FULLY FUNCTIONAL with all major features implemented:
- ✅ Complete product management (add, edit, delete, images, pricing, inventory)
- ✅ Offers management system
- ✅ Combo creation and management interface
- ✅ Customer management with statistics
- ✅ Banner management system
- ✅ Settings configuration

## Future Enhancements

Additional features that could enhance the platform:
- File upload functionality (currently using image URLs from Pexels)
- Rich text editor for product descriptions
- Content management system for About/Contact pages (currently hardcoded)
- Payment gateway integration (currently using COD only)
- Email notifications for orders
- Product reviews and ratings
- Advanced search functionality with filters
- Wishlist feature
- Inventory alerts for low stock
- Sales analytics and reports
- Discount codes/coupons system
- Multi-language support

## Support

For questions or support, contact MANSARA FOODS at:
- Email: mansarafoods@gmail.com
- Phone: +91 88388 87064
