# MANSARA FOODS - ADMIN PANEL GUIDE

## Overview

The MANSARA FOODS Admin Panel is a complete management system that allows you to run your e-commerce business without technical help. This guide covers all features and functionality.

## Demo Credentials

### Customer Account
- **Email**: customer@example.com
- **Password**: customer123
- **Access**: Customer-facing website, shopping cart, orders

### Admin Account
- **Email**: admin@mansarafoods.com
- **Password**: admin123
- **Access**: Full admin panel access at `/admin`

## Getting Started

### Admin Login

1. Go to `/login`
2. Click the **Admin** tab (not Customer)
3. Enter admin credentials
4. Click **Login**
5. You will be redirected to the Admin Dashboard at `/admin`

### Important Note

Admin login is **separate** from customer login. You must use the Admin tab on the login page to access the admin panel.

## Admin Panel Structure

### Sidebar Menu

- **Dashboard**: Overview of business metrics
- **Products**: Manage all products
- **Offers**: Create and manage special offers
- **Combos**: Create product bundles
- **Orders**: Manage customer orders
- **Customers**: View customer information
- **Banners**: Manage homepage banners
- **Settings**: Website configuration
- **Logout**: Secure logout

## Features by Section

### 1. DASHBOARD

**Purpose**: Quick business snapshot

**Displays**:
- Total Orders
- Today's Orders
- Total Products (10 products pre-loaded)
- Pending Orders
- Total Customers (2 demo users)

**Quick Actions**:
- Add Product
- View Orders
- Manage Combos

### 2. PRODUCTS MANAGEMENT

**Location**: `/admin/products`

**Features**:
- View all 10 pre-loaded products
- Product table with image, name, category, price, stock, status
- Visibility flags: Offer, New Arrival, Featured
- Edit product details (view-only in demo)
- Delete products (view-only in demo)

**Product Categories**:
- Porridge Mixes (6 products)
- Oil & Ghee (4 products)

**Visibility Flags**:
- **Is Offer**: Shows on `/offers` page
- **Is New Arrival**: Shows on `/new-arrivals` page
- **Is Featured**: Shows on homepage
- **Is Active**: Makes product visible on site

**Note**: In demo mode, products are read-only from mock data. Edit and delete functions will show alerts.

### 3. OFFERS MANAGEMENT

**Location**: `/admin/offers`

**Features**:
- View active offers (4 pre-configured)
- Enable/disable offer status on products
- Set offer prices
- See discount percentages automatically calculated
- Products with offer flag appear on `/offers` page

**Current Offers**:
1. URAD Porridge Mix – Classic: ₹150 (17% OFF)
2. URAD Porridge Mix – Salt & Pepper: ₹170 (15% OFF)
3. URAD Porridge Mix – Premium: ₹250 (11% OFF)
4. Sesame Oil - Classic: ₹360 (10% OFF)
5. Ghee - Classic: ₹550 (8% OFF)

### 4. COMBOS MANAGEMENT

**Location**: `/admin/combos`

**Features**:
- View all combo packages (3 pre-configured)
- Create new combos (view-only in demo)
- Select multiple products with quantities
- Auto-calculate original price
- Set combo price with automatic savings calculation
- Combos appear on `/combos` page

**Current Combos**:
1. **Health Essentials Combo** - ₹650 (Save ₹80)
2. **Traditional Oil Trio** - ₹950 (Save ₹120)
3. **Breakfast Bundle** - ₹480 (Save ₹100)

### 5. ORDERS MANAGEMENT

**Location**: `/admin/orders`

**Features**:
- View all customer orders (2 demo orders)
- Update order status
- View order details
- See customer shipping address
- Track payment status

**Order Status Flow**:
1. **Pending**: Order just placed
2. **Confirmed**: Order confirmed by seller
3. **Packed**: Items packed and ready
4. **Shipped**: Out for delivery
5. **Delivered**: Successfully delivered
6. **Cancelled**: Order cancelled

**Demo Orders**:
- Order #ORD1705234567890 - ₹480 (Pending)
- Order #ORD1705134567891 - ₹950 (Delivered)

### 6. CUSTOMERS MANAGEMENT

**Location**: `/admin/customers`

**Features**:
- View all customers (read-only)
- Customer statistics (total orders, total spent)
- View individual customer details
- See customer order history
- Track customer join date
- Calculate average order value

**Demo Customers**:
1. **Demo Customer** (customer@example.com)
   - Total Orders: 2
   - Total Spent: ₹1,430

2. **Admin User** (admin@mansarafoods.com)
   - Admin account

### 7. BANNERS MANAGEMENT

**Location**: `/admin/banners`

**Features** (view-only in demo):
- Add/edit/delete banners
- Upload banner images
- Assign banners to pages (Home, Offers, Combos, New Arrivals)
- Set display order
- Enable/disable visibility

### 8. SETTINGS

**Location**: `/admin/settings`

**Features** (view-only in demo):
- Website name: MANSARA FOODS
- Contact email: mansarafoods@gmail.com
- Contact phone: +91 88388 87064
- Address: Kalavai, Ranipet, Tamil Nadu
- Social media links
- Brand colors display

## Customer Features

### Account Page

**Location**: `/account`

**Features**:
- View profile (name, email, phone)
- Edit profile (name and phone)
- View order history
- **Track Order** button for each order
- Logout option

### Order Tracking

**Location**: `/track-order/:orderNumber`

**Features**:
- Complete order summary
- Order number, date, amount, payment method
- Delivery address
- **Visual tracking timeline** showing:
  - Order Placed
  - Order Confirmed
  - Packed
  - Out for Delivery
  - Delivered
- Current status highlighted
- Completed steps in green
- Support contact options

**How to Track**:
1. Login as customer
2. Go to Account page
3. Click "Track Order" button on any order
4. View tracking timeline

## Product Visibility Logic

### How Products Appear on Different Pages

- **`/products`**: All active products (is_active = true)
- **`/offers`**: Products with is_offer = true (4 products)
- **`/combos`**: Combo packages only (3 combos)
- **`/new-arrivals`**: Products with is_new_arrival = true (2 products)
- **Homepage**: Products with is_featured = true (6 products)

## Data Storage

All data is stored in **browser localStorage**:

### Storage Keys

- `mansara_user`: User session (login state)
- `mansara_cart_{userId}`: Shopping cart per user
- `mansara_orders_{userId}`: Orders per user
- Profile updates saved to user session

### Data Persistence

- Data persists across page refreshes
- Data is cleared when browser storage is cleared
- Each user has separate cart and orders

## Mock Data Overview

### Products (10 items)
Located in: `src/data/mockData.ts`

1-6: Porridge Mixes
7-10: Oils & Ghee

All products include:
- Multiple images from Pexels
- Pricing (regular + offer)
- Stock quantities
- Full descriptions
- Ingredients
- Usage instructions
- Storage instructions

### Combos (3 items)
Pre-configured product bundles with:
- Multiple products and quantities
- Original price calculation
- Discounted combo price
- Savings display

### Users (2 demo accounts)
- Customer account
- Admin account

### Orders (2 demo orders)
- One pending order
- One delivered order
- Full order details with addresses

## Testing the System

### Customer Flow

1. **Login** as customer (customer@example.com / customer123)
2. **Browse** products on homepage or `/products`
3. **Add to cart** (requires login)
4. **View cart** at `/cart`
5. **Checkout** with delivery address
6. **View orders** at `/account`
7. **Track order** using Track Order button

### Admin Flow

1. **Login** as admin (admin@mansarafoods.com / admin123) using Admin tab
2. **View dashboard** statistics
3. **Browse products** at `/admin/products`
4. **Manage offers** at `/admin/offers`
5. **View combos** at `/admin/combos`
6. **Check orders** at `/admin/orders`
7. **Update order status** from pending to delivered
8. **View customers** at `/admin/customers`

## Important Notes

### Demo Mode Limitations

This is a **demo version** with hardcoded data:

- No real database connection
- No backend API calls
- Edit/delete operations are **view-only**
- Products can't be added/modified (shows alert)
- Settings can't be changed (shows alert)
- Data resets when browser storage is cleared

### What Works Fully

- User authentication (login/logout)
- Shopping cart functionality
- Checkout process
- Order creation
- Order history viewing
- Order tracking
- Profile editing
- Admin order status updates (local only)
- Offers toggling (local only)

### What Is View-Only

- Product creation/editing
- Product deletion
- Combo creation/editing
- Banner management
- Settings configuration
- Customer data editing

## Security

- Secure authentication with localStorage
- Role-based access (customer vs admin)
- Admin routes protected
- Separate login tabs for clarity

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## Support

For questions or issues:
- **Email**: mansarafoods@gmail.com
- **Phone**: +91 88388 87064

## Next Steps for Production

To convert this to a real production system:

1. Set up a backend (Node.js/Express or Supabase)
2. Replace mock data with database calls
3. Implement real authentication with JWT
4. Add payment gateway integration
5. Set up email notifications
6. Implement file upload for images
7. Add inventory management
8. Set up order management workflow
9. Deploy to production hosting
10. Set up domain and SSL

## Brand Colors

- **Primary (Golden Yellow)**: #FDB913
- **Accent (Deep Pink)**: #E91E63
- **Trust (Royal Blue)**: #1F2A7C
- **Background (Soft Cream)**: #FFFDF7
- **Section Background (Light Yellow)**: #FFF2CC

## Files Reference

### Key Files

- `src/data/mockData.ts`: All hardcoded data
- `src/contexts/AuthContext.tsx`: Authentication logic
- `src/hooks/useCart.ts`: Shopping cart management
- `src/pages/admin/*.tsx`: All admin pages
- `src/pages/Account.tsx`: Customer account page
- `src/pages/TrackOrder.tsx`: Order tracking page
- `DEMO_CREDENTIALS.md`: Login credentials
- `CHANGES_SUMMARY.md`: Technical changes log

## Troubleshooting

### Login Issues

- Make sure you're using the correct tab (Admin vs Customer)
- Check credentials are typed correctly
- Clear browser cache if issues persist

### Data Not Showing

- Check if you're logged in
- Refresh the page
- Clear localStorage and login again

### Order Tracking Not Working

- Make sure order was placed while logged in
- Check order number is correct
- Ensure you're logged in as the same user who placed the order

## Conclusion

The MANSARA FOODS Admin Panel is a fully functional demo e-commerce system. While it uses hardcoded data, all features work as they would in a production environment, making it perfect for demonstrations, testing, and understanding the workflow before implementing a real backend.
