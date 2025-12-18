import { Product, Combo, Order, Profile } from '../types/database';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'URAD Porridge Mix – Classic',
    slug: 'urad-porridge-mix-classic',
    category: 'Porridge Mixes',
    sub_category: 'Urad Based',
    short_description: 'Traditional urad porridge mix for daily nutrition',
    full_description: 'Our classic URAD Porridge Mix is made from premium quality black gram, carefully processed to retain maximum nutrition. Perfect for a healthy breakfast or evening snack.',
    ingredients: 'Black Gram (Urad Dal), Natural Salt',
    how_to_use: 'Mix 2-3 tablespoons with water or milk. Cook for 5-7 minutes. Add jaggery or salt as per taste.',
    storage_instructions: 'Store in a cool, dry place. Keep away from moisture.',
    price: 180,
    offer_price: 150,
    weight: '500g',
    stock_quantity: 50,
    images: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg'
    ],
    main_image_index: 0,
    is_offer: true,
    is_new_arrival: false,
    is_featured: true,
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'URAD Porridge Mix – Salt & Pepper',
    slug: 'urad-porridge-mix-salt-pepper',
    category: 'Porridge Mixes',
    sub_category: 'Urad Based',
    short_description: 'Savory urad porridge with a peppery kick',
    full_description: 'A flavorful twist on our classic recipe, seasoned with black pepper and natural salt for those who prefer savory breakfast options.',
    ingredients: 'Black Gram (Urad Dal), Black Pepper, Natural Salt',
    how_to_use: 'Mix with hot water, cook for 5-7 minutes, and enjoy the savory goodness.',
    storage_instructions: 'Store in an airtight container in a cool, dry place.',
    price: 200,
    offer_price: 170,
    weight: '500g',
    stock_quantity: 45,
    images: [
      'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
      'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg'
    ],
    main_image_index: 0,
    is_offer: true,
    is_new_arrival: false,
    is_featured: true,
    is_active: true,
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    name: 'URAD Porridge Mix – Millet Magic',
    slug: 'urad-porridge-mix-millet-magic',
    category: 'Porridge Mixes',
    sub_category: 'Millet Blend',
    short_description: 'Nutritious blend of urad and millets',
    full_description: 'A powerful combination of black gram and ancient millets, packed with fiber, protein, and essential nutrients.',
    ingredients: 'Black Gram, Foxtail Millet, Little Millet, Natural Salt',
    how_to_use: 'Cook with water or milk for 7-10 minutes. Sweeten with jaggery or keep it savory.',
    storage_instructions: 'Keep in an airtight container away from sunlight.',
    price: 220,
    offer_price: null,
    weight: '500g',
    stock_quantity: 40,
    images: [
      'https://images.pexels.com/photos/1120575/pexels-photo-1120575.jpeg',
      'https://images.pexels.com/photos/1537169/pexels-photo-1537169.jpeg'
    ],
    main_image_index: 0,
    is_offer: false,
    is_new_arrival: true,
    is_featured: true,
    is_active: true,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z'
  },
  {
    id: '4',
    name: 'URAD Porridge Mix – Premium',
    slug: 'urad-porridge-mix-premium',
    category: 'Porridge Mixes',
    sub_category: 'Urad Based',
    short_description: 'Premium quality urad porridge with dry fruits',
    full_description: 'Our premium variant includes the finest black gram with added almond and cashew powder for extra richness and nutrition.',
    ingredients: 'Black Gram, Almond Powder, Cashew Powder, Natural Salt',
    how_to_use: 'Mix with warm milk, cook for 5 minutes, add honey or jaggery to taste.',
    storage_instructions: 'Refrigerate after opening for best freshness.',
    price: 280,
    offer_price: 250,
    weight: '500g',
    stock_quantity: 30,
    images: [
      'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
      'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg'
    ],
    main_image_index: 0,
    is_offer: true,
    is_new_arrival: false,
    is_featured: true,
    is_active: true,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  },
  {
    id: '5',
    name: 'Porridge Mix – Black Rice Delight',
    slug: 'porridge-mix-black-rice-delight',
    category: 'Porridge Mixes',
    sub_category: 'Rice Based',
    short_description: 'Antioxidant-rich black rice porridge',
    full_description: 'Made from heritage black rice (Kavuni), rich in antioxidants and minerals. A traditional South Indian superfood.',
    ingredients: 'Black Rice (Kavuni), Natural Salt',
    how_to_use: 'Cook with water or coconut milk for 10-12 minutes. Sweeten with palm jaggery for authentic taste.',
    storage_instructions: 'Store in a cool, dry place.',
    price: 250,
    offer_price: null,
    weight: '500g',
    stock_quantity: 35,
    images: [
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
      'https://images.pexels.com/photos/1618900/pexels-photo-1618900.jpeg'
    ],
    main_image_index: 0,
    is_offer: false,
    is_new_arrival: true,
    is_featured: true,
    is_active: true,
    created_at: '2024-02-05T10:00:00Z',
    updated_at: '2024-02-05T10:00:00Z'
  },
  {
    id: '6',
    name: 'Idly Powder Mix – Millet Fusion',
    slug: 'idly-powder-mix-millet-fusion',
    category: 'Porridge Mixes',
    sub_category: 'Millet Blend',
    short_description: 'Nutritious millet-based idly powder',
    full_description: 'A unique blend of millets and traditional spices, perfect accompaniment for idly, dosa, or rice.',
    ingredients: 'Foxtail Millet, Little Millet, Red Chili, Sesame Seeds, Salt, Asafoetida',
    how_to_use: 'Mix with ghee or sesame oil. Serve with hot idly or dosa.',
    storage_instructions: 'Store in an airtight container. Use within 2 months for best flavor.',
    price: 150,
    offer_price: 130,
    weight: '200g',
    stock_quantity: 60,
    images: [
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg',
      'https://images.pexels.com/photos/2365945/pexels-photo-2365945.jpeg'
    ],
    main_image_index: 0,
    is_offer: true,
    is_new_arrival: false,
    is_featured: false,
    is_active: true,
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-01-25T10:00:00Z'
  },
  {
    id: '7',
    name: 'Groundnut Oil - Classic',
    slug: 'groundnut-oil-classic',
    category: 'Oil & Ghee',
    sub_category: 'Cooking Oil',
    short_description: 'Pure cold-pressed groundnut oil',
    full_description: 'Traditionally extracted groundnut oil using wooden press method. Rich in healthy fats and vitamin E.',
    ingredients: 'Pure Groundnuts',
    how_to_use: 'Ideal for all types of cooking, especially South Indian dishes. Great for deep frying and tempering.',
    storage_instructions: 'Store in a cool place away from direct sunlight. Keeps for 6 months.',
    price: 350,
    offer_price: null,
    weight: '1L',
    stock_quantity: 25,
    images: [
      'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg',
      'https://images.pexels.com/photos/1022385/pexels-photo-1022385.jpeg'
    ],
    main_image_index: 0,
    is_offer: false,
    is_new_arrival: false,
    is_featured: true,
    is_active: true,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: '8',
    name: 'Sesame Oil - Classic',
    slug: 'sesame-oil-classic',
    category: 'Oil & Ghee',
    sub_category: 'Cooking Oil',
    short_description: 'Pure cold-pressed sesame oil',
    full_description: 'Traditional gingelly oil extracted using wooden press. Known for its distinct aroma and health benefits.',
    ingredients: 'Pure Sesame Seeds',
    how_to_use: 'Perfect for South Indian cooking, pickling, and Ayurvedic massage.',
    storage_instructions: 'Store in a cool, dry place. Natural sediment is normal.',
    price: 400,
    offer_price: 360,
    weight: '1L',
    stock_quantity: 20,
    images: [
      'https://images.pexels.com/photos/4198933/pexels-photo-4198933.jpeg',
      'https://images.pexels.com/photos/4203100/pexels-photo-4203100.jpeg'
    ],
    main_image_index: 0,
    is_offer: true,
    is_new_arrival: false,
    is_featured: false,
    is_active: true,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: '9',
    name: 'Coconut Oil - Classic',
    slug: 'coconut-oil-classic',
    category: 'Oil & Ghee',
    sub_category: 'Cooking Oil',
    short_description: 'Pure cold-pressed coconut oil',
    full_description: 'Made from fresh coconuts using traditional methods. Contains natural MCT and lauric acid.',
    ingredients: 'Pure Coconut',
    how_to_use: 'Excellent for cooking, baking, and hair care. Solidifies below 24°C (normal).',
    storage_instructions: 'No refrigeration needed. Keeps for 12 months.',
    price: 320,
    offer_price: null,
    weight: '500ml',
    stock_quantity: 30,
    images: [
      'https://images.pexels.com/photos/2338592/pexels-photo-2338592.jpeg',
      'https://images.pexels.com/photos/4206862/pexels-photo-4206862.jpeg'
    ],
    main_image_index: 0,
    is_offer: false,
    is_new_arrival: false,
    is_featured: false,
    is_active: true,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: '10',
    name: 'Ghee - Classic',
    slug: 'ghee-classic',
    category: 'Oil & Ghee',
    sub_category: 'Ghee',
    short_description: 'Pure cow ghee made traditionally',
    full_description: 'Traditional bilona ghee made from A2 cow milk. Rich in vitamins A, D, E, and K.',
    ingredients: 'Pure Cow Milk',
    how_to_use: 'Use for cooking, tempering, or add to hot rice. Enhances taste and nutrition.',
    storage_instructions: 'No refrigeration needed. Use a clean, dry spoon. Keeps for 6 months.',
    price: 600,
    offer_price: 550,
    weight: '500ml',
    stock_quantity: 15,
    images: [
      'https://images.pexels.com/photos/8963122/pexels-photo-8963122.jpeg',
      'https://images.pexels.com/photos/7363671/pexels-photo-7363671.jpeg'
    ],
    main_image_index: 0,
    is_offer: true,
    is_new_arrival: false,
    is_featured: false,
    is_active: true,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  }
];

export const mockCombos: Combo[] = [
  {
    id: 'c1',
    name: 'Health Essentials Combo',
    slug: 'health-essentials-combo',
    description: 'Complete nutrition pack with porridge mix and pure oils',
    image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    combo_price: 650,
    original_price: 730,
    is_active: true,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  },
  {
    id: 'c2',
    name: 'Traditional Oil Trio',
    slug: 'traditional-oil-trio',
    description: 'Three essential cooking oils for authentic South Indian cooking',
    image_url: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg',
    combo_price: 950,
    original_price: 1070,
    is_active: true,
    created_at: '2024-01-22T10:00:00Z',
    updated_at: '2024-01-22T10:00:00Z'
  },
  {
    id: 'c3',
    name: 'Breakfast Bundle',
    slug: 'breakfast-bundle',
    description: 'Everything you need for a healthy breakfast routine',
    image_url: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
    combo_price: 480,
    original_price: 580,
    is_active: true,
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-01-25T10:00:00Z'
  }
];

export const mockComboItems = [
  { combo_id: 'c1', product_id: '1', quantity: 1 },
  { combo_id: 'c1', product_id: '7', quantity: 1 },
  { combo_id: 'c2', product_id: '7', quantity: 1 },
  { combo_id: 'c2', product_id: '8', quantity: 1 },
  { combo_id: 'c2', product_id: '9', quantity: 1 },
  { combo_id: 'c3', product_id: '1', quantity: 1 },
  { combo_id: 'c3', product_id: '2', quantity: 1 },
  { combo_id: 'c3', product_id: '6', quantity: 1 }
];

export const mockAdminUser: Profile = {
  id: 'admin-1',
  email: 'admin@mansarafoods.com',
  full_name: 'Admin User',
  phone: '+91 88388 87064',
  is_admin: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
};

export const mockCustomerUser: Profile = {
  id: 'customer-1',
  email: 'customer@example.com',
  full_name: 'Demo Customer',
  phone: '+91 9876543210',
  is_admin: false,
  created_at: '2024-01-15T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z'
};

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    order_number: 'ORD1705234567890',
    user_id: 'customer-1',
    total_amount: 480,
    payment_status: 'pending',
    payment_method: 'cod',
    order_status: 'pending',
    shipping_address: {
      full_name: 'Demo Customer',
      phone: '+91 9876543210',
      address_line1: '123 MG Road',
      address_line2: 'Near City Mall',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001'
    },
    created_at: '2024-01-14T10:30:00Z',
    updated_at: '2024-01-14T10:30:00Z'
  },
  {
    id: 'order-2',
    order_number: 'ORD1705134567891',
    user_id: 'customer-1',
    total_amount: 950,
    payment_status: 'pending',
    payment_method: 'cod',
    order_status: 'delivered',
    shipping_address: {
      full_name: 'Demo Customer',
      phone: '+91 9876543210',
      address_line1: '123 MG Road',
      address_line2: 'Near City Mall',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001'
    },
    created_at: '2024-01-10T14:20:00Z',
    updated_at: '2024-01-12T16:45:00Z'
  }
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find(p => p.slug === slug);
}

export function getComboById(id: string): Combo | undefined {
  return mockCombos.find(c => c.id === id);
}

export function getComboProducts(comboId: string): Array<{ product: Product; quantity: number }> {
  const items = mockComboItems.filter(item => item.combo_id === comboId);
  return items.map(item => ({
    product: mockProducts.find(p => p.id === item.product_id)!,
    quantity: item.quantity
  })).filter(item => item.product);
}
