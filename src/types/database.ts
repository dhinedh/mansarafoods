export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  sub_category?: string;
  short_description?: string;
  full_description?: string;
  ingredients?: string;
  how_to_use?: string;
  storage_instructions?: string;
  price: number;
  offer_price?: number;
  weight?: string;
  stock_quantity: number;
  images: string[];
  main_image_index: number;
  is_offer: boolean;
  is_new_arrival: boolean;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Combo {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  combo_price: number;
  original_price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ComboItem {
  id: string;
  combo_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  product?: Product;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id?: string;
  combo_id?: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
  combo?: Combo;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  total_amount: number;
  payment_status: string;
  payment_method?: string;
  order_status: string;
  shipping_address: ShippingAddress;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  combo_id?: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
  created_at: string;
}

export interface ShippingAddress {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Banner {
  id: string;
  title?: string;
  image_url: string;
  page: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentPage {
  id: string;
  page_key: string;
  title: string;
  content: string;
  updated_at: string;
}
