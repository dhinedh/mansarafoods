/*
  # MANSARA FOODS E-Commerce Database Schema

  ## Overview
  Complete database structure for MANSARA FOODS e-commerce platform including:
  - Product catalog with categories and flags
  - Combo products system
  - Shopping cart functionality
  - Order management
  - User authentication
  - Content management system
  - Banner management

  ## New Tables

  ### 1. `profiles`
  Customer and admin profiles linked to auth.users
  - `id` (uuid, references auth.users)
  - `email` (text)
  - `full_name` (text)
  - `phone` (text)
  - `is_admin` (boolean) - Admin flag
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `addresses`
  Customer delivery addresses
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `full_name` (text)
  - `phone` (text)
  - `address_line1` (text)
  - `address_line2` (text)
  - `city` (text)
  - `state` (text)
  - `pincode` (text)
  - `is_default` (boolean)
  - `created_at` (timestamptz)

  ### 3. `products`
  Main product catalog
  - `id` (uuid, primary key)
  - `name` (text)
  - `slug` (text, unique)
  - `category` (text) - 'Porridge Mixes' or 'Oil & Ghee'
  - `sub_category` (text, optional)
  - `short_description` (text)
  - `full_description` (text)
  - `ingredients` (text)
  - `how_to_use` (text)
  - `storage_instructions` (text)
  - `price` (decimal)
  - `offer_price` (decimal, optional)
  - `weight` (text)
  - `stock_quantity` (integer)
  - `images` (jsonb) - Array of image URLs
  - `main_image_index` (integer) - Index of main image
  - `is_offer` (boolean) - Show on Offers page
  - `is_new_arrival` (boolean) - Show on New Arrivals page
  - `is_featured` (boolean) - Show on home page
  - `is_active` (boolean) - Product visibility
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `combos`
  Combo product packages
  - `id` (uuid, primary key)
  - `name` (text)
  - `slug` (text, unique)
  - `description` (text)
  - `image_url` (text)
  - `combo_price` (decimal)
  - `original_price` (decimal) - Sum of individual products
  - `is_active` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `combo_items`
  Products included in combos
  - `id` (uuid, primary key)
  - `combo_id` (uuid, references combos)
  - `product_id` (uuid, references products)
  - `quantity` (integer)
  - `created_at` (timestamptz)

  ### 6. `cart`
  Shopping cart items
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `product_id` (uuid, references products, optional)
  - `combo_id` (uuid, references combos, optional)
  - `quantity` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. `orders`
  Customer orders
  - `id` (uuid, primary key)
  - `order_number` (text, unique)
  - `user_id` (uuid, references profiles)
  - `total_amount` (decimal)
  - `payment_status` (text) - 'pending', 'paid', 'failed'
  - `payment_method` (text)
  - `order_status` (text) - 'pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'
  - `shipping_address` (jsonb)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 8. `order_items`
  Items in each order
  - `id` (uuid, primary key)
  - `order_id` (uuid, references orders)
  - `product_id` (uuid, references products, optional)
  - `combo_id` (uuid, references combos, optional)
  - `product_name` (text)
  - `quantity` (integer)
  - `unit_price` (decimal)
  - `total_price` (decimal)
  - `created_at` (timestamptz)

  ### 9. `banners`
  Homepage and promotional banners
  - `id` (uuid, primary key)
  - `title` (text)
  - `image_url` (text)
  - `page` (text) - 'home', 'offers', etc.
  - `display_order` (integer)
  - `is_active` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 10. `content_pages`
  CMS content for static pages
  - `id` (uuid, primary key)
  - `page_key` (text, unique) - 'about', 'why_mansara', 'contact', etc.
  - `title` (text)
  - `content` (text)
  - `updated_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Users can only view/edit their own data
  - Admin users have full access
  - Public can view active products, combos, and content
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  full_name text NOT NULL,
  phone text NOT NULL,
  address_line1 text NOT NULL,
  address_line2 text,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own addresses"
  ON addresses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses"
  ON addresses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
  ON addresses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
  ON addresses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  sub_category text,
  short_description text,
  full_description text,
  ingredients text,
  how_to_use text,
  storage_instructions text,
  price decimal(10,2) NOT NULL,
  offer_price decimal(10,2),
  weight text,
  stock_quantity integer DEFAULT 0,
  images jsonb DEFAULT '[]'::jsonb,
  main_image_index integer DEFAULT 0,
  is_offer boolean DEFAULT false,
  is_new_arrival boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admin can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admin can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admin can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Create combos table
CREATE TABLE IF NOT EXISTS combos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  combo_price decimal(10,2) NOT NULL,
  original_price decimal(10,2) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE combos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Combos are viewable by everyone"
  ON combos FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admin can insert combos"
  ON combos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admin can update combos"
  ON combos FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admin can delete combos"
  ON combos FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Create combo_items table
CREATE TABLE IF NOT EXISTS combo_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  combo_id uuid REFERENCES combos(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE combo_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Combo items are viewable by everyone"
  ON combo_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage combo items"
  ON combo_items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Create cart table
CREATE TABLE IF NOT EXISTS cart (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  combo_id uuid REFERENCES combos(id) ON DELETE CASCADE,
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT cart_item_check CHECK (
    (product_id IS NOT NULL AND combo_id IS NULL) OR
    (product_id IS NULL AND combo_id IS NOT NULL)
  )
);

ALTER TABLE cart ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart"
  ON cart FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into own cart"
  ON cart FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart"
  ON cart FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from own cart"
  ON cart FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  total_amount decimal(10,2) NOT NULL,
  payment_status text DEFAULT 'pending',
  payment_method text,
  order_status text DEFAULT 'pending',
  shipping_address jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  combo_id uuid REFERENCES combos(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  quantity integer NOT NULL,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can view all order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

CREATE POLICY "Users can create order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Create banners table
CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  image_url text NOT NULL,
  page text DEFAULT 'home',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Banners are viewable by everyone"
  ON banners FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admin can manage banners"
  ON banners FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Create content_pages table
CREATE TABLE IF NOT EXISTS content_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE content_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Content pages are viewable by everyone"
  ON content_pages FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage content pages"
  ON content_pages FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_offer ON products(is_offer) WHERE is_offer = true;
CREATE INDEX IF NOT EXISTS idx_products_is_new_arrival ON products(is_new_arrival) WHERE is_new_arrival = true;
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_combos_slug ON combos(slug);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id);