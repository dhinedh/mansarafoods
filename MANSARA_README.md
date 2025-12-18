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

### User Account Features

**User Account Page** (`/account`)
- View personal profile information (name, email, phone)
- Edit profile by clicking the edit icon
- Update name and phone number
- View complete order history
- Track order status in real-time
- Check order amounts and payment status
- Logout option on sidebar

### Using the Admin Panel

To access the admin panel, you need an admin account. Admin login is separate from customer login.

**How to Login as Admin:**

1. Go to `/login`
2. Click the **Admin** tab (instead of Customer)
3. Enter admin email and password
4. You'll be redirected to `/admin` dashboard
5. Only accounts with admin privileges can access the admin panel

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

## Login Instructions

### Customer Login Flow

1. Click the **User icon** in the header (top right)
2. If not logged in, you'll be redirected to `/login`
3. Make sure **Customer tab** is selected (default)
4. Enter your email and password
5. Click **Login**
6. You'll be redirected to the homepage
7. Now you can:
   - Click the **User icon** again to go to `/account`
   - Browse products and **Add to Cart**
   - See your orders in account page

### Admin Login Flow

1. Click the **User icon** in the header (top right)
2. If not logged in, you'll be redirected to `/login`
3. Click the **Admin tab**
4. Enter admin email and password
5. Click **Login**
6. You'll be redirected to the admin dashboard (`/admin`)
7. Use the sidebar to navigate admin features

### Creating an Admin Account (First Time Setup)

To make a user account an admin:

1. Create a customer account by signing up normally
2. Note the email used during signup
3. Go to Supabase Dashboard → SQL Editor
4. Run this query:
   ```sql
   UPDATE profiles SET is_admin = true WHERE email = 'your-email@example.com';
   ```
5. Replace `your-email@example.com` with your actual email
6. Log out and log back in
7. Use the **Admin tab** at login to access admin panel

### Add to Cart Flow

1. Login as a customer
2. Browse products or view product details
3. Set quantity using + and - buttons
4. Click **Add to Cart**
5. Button turns green showing "Added to Cart!"
6. Click **Shopping Cart icon** in header to view cart
7. Update quantities or remove items as needed
8. Proceed to checkout

### Cart & Navigation

- **Cart icon** in header shows item count
- Click to visit `/cart`
- **User icon** in header navigates to `/account` when logged in
- After login, user icon takes you to account page instead of login

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

### Admin Panel (FULLY FUNCTIONAL)
- ✅ Complete product management (add, edit, delete, images, pricing, inventory)
- ✅ Offers management system
- ✅ Combo creation and management interface
- ✅ Customer management with statistics
- ✅ Banner management system
- ✅ Settings configuration
- ✅ Admin login with separate Admin tab

### User Features (FULLY FUNCTIONAL)
- ✅ Customer login and signup
- ✅ Add to cart with success feedback
- ✅ Cart functionality with quantity management
- ✅ User account page with profile editing
- ✅ Profile update (name, phone)
- ✅ Order history with status tracking
- ✅ Proper navigation after login (to /account or /admin)

## Recent Updates & Fixes

### Add to Cart & Cart Functionality
- ✅ Fixed navigation after clicking user icon (now goes to /account when logged in)
- ✅ Added success feedback when adding items to cart (green button with checkmark)
- ✅ Fixed login redirect to use navigate instead of window.location.href
- ✅ Cart icon in header shows item count
- ✅ Cart page is fully functional for logged-in users
- ✅ Add loading state while adding to cart

### Account Page Enhancements
- ✅ Added profile editing capability
- ✅ Edit name and phone number
- ✅ Save profile updates to database
- ✅ Edit button with pencil icon
- ✅ Full order history view
- ✅ Order tracking with status colors

### Admin & Login Improvements
- ✅ Separate Admin login tab on login page
- ✅ Admin authentication check on login
- ✅ Proper redirection to /admin dashboard
- ✅ Updated admin navigation

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
- Password reset functionality
- Email verification

## Support

For questions or support, contact MANSARA FOODS at:
- Email: mansarafoods@gmail.com
- Phone: +91 88388 87064
