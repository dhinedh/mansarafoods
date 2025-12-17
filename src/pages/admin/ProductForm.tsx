import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { supabase } from '../../lib/supabase';

export function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Porridge Mixes',
    sub_category: '',
    short_description: '',
    full_description: '',
    ingredients: '',
    how_to_use: '',
    storage_instructions: '',
    price: '',
    offer_price: '',
    weight: '',
    stock_quantity: '',
    images: [''],
    main_image_index: 0,
    is_offer: false,
    is_new_arrival: false,
    is_featured: false,
    is_active: true,
  });

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const { data } = await supabase.from('products').select('*').eq('id', id).maybeSingle();

    if (data) {
      setFormData({
        name: data.name,
        slug: data.slug,
        category: data.category,
        sub_category: data.sub_category || '',
        short_description: data.short_description || '',
        full_description: data.full_description || '',
        ingredients: data.ingredients || '',
        how_to_use: data.how_to_use || '',
        storage_instructions: data.storage_instructions || '',
        price: data.price.toString(),
        offer_price: data.offer_price?.toString() || '',
        weight: data.weight || '',
        stock_quantity: data.stock_quantity.toString(),
        images: data.images,
        main_image_index: data.main_image_index,
        is_offer: data.is_offer,
        is_new_arrival: data.is_new_arrival,
        is_featured: data.is_featured,
        is_active: data.is_active,
      });
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: isEdit ? formData.slug : generateSlug(name),
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages,
      main_image_index: formData.main_image_index >= index ? Math.max(0, formData.main_image_index - 1) : formData.main_image_index,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validImages = formData.images.filter((img) => img.trim() !== '');

      if (validImages.length === 0) {
        alert('Please add at least one product image');
        setLoading(false);
        return;
      }

      const productData = {
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        sub_category: formData.sub_category || null,
        short_description: formData.short_description || null,
        full_description: formData.full_description || null,
        ingredients: formData.ingredients || null,
        how_to_use: formData.how_to_use || null,
        storage_instructions: formData.storage_instructions || null,
        price: parseFloat(formData.price),
        offer_price: formData.offer_price ? parseFloat(formData.offer_price) : null,
        weight: formData.weight || null,
        stock_quantity: parseInt(formData.stock_quantity),
        images: validImages,
        main_image_index: Math.min(formData.main_image_index, validImages.length - 1),
        is_offer: formData.is_offer,
        is_new_arrival: formData.is_new_arrival,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
        updated_at: new Date().toISOString(),
      };

      if (isEdit) {
        const { error } = await supabase.from('products').update(productData).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert({
          ...productData,
          created_at: new Date().toISOString(),
        });
        if (error) throw error;
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/admin/products')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" style={{ color: '#1F2A7C' }} />
          </button>
          <h1 className="text-3xl font-bold" style={{ color: '#1F2A7C' }}>
            {isEdit ? 'Edit Product' : 'Add Product'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                >
                  <option value="Porridge Mixes">Porridge Mixes</option>
                  <option value="Oil & Ghee">Oil & Ghee</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Sub-Category
                </label>
                <input
                  type="text"
                  value={formData.sub_category}
                  onChange={(e) => setFormData({ ...formData, sub_category: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Short Description
                </label>
                <textarea
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
              Product Images
            </h2>

            <div className="space-y-3">
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="https://images.pexels.com/..."
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="main_image"
                      checked={formData.main_image_index === index}
                      onChange={() => setFormData({ ...formData, main_image_index: index })}
                    />
                    <span className="text-sm">Main</span>
                  </label>
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="px-4 py-2 rounded-lg font-semibold"
                style={{ backgroundColor: '#FFF2CC', color: '#1F2A7C' }}
              >
                Add Image URL
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
              Pricing & Stock
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Offer Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.offer_price}
                  onChange={(e) => setFormData({ ...formData, offer_price: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Weight/Size
                </label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="e.g., 500g, 1L"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
              Product Content
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Full Description
                </label>
                <textarea
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Ingredients
                </label>
                <textarea
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  How to Use
                </label>
                <textarea
                  value={formData.how_to_use}
                  onChange={(e) => setFormData({ ...formData, how_to_use: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Storage Instructions
                </label>
                <textarea
                  value={formData.storage_instructions}
                  onChange={(e) => setFormData({ ...formData, storage_instructions: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
              Visibility Flags
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.is_offer}
                  onChange={(e) => setFormData({ ...formData, is_offer: e.target.checked })}
                  className="w-5 h-5"
                />
                <div>
                  <p className="font-semibold" style={{ color: '#1F2A7C' }}>
                    Is Offer
                  </p>
                  <p className="text-xs text-gray-600">Show on Offers page</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.is_new_arrival}
                  onChange={(e) => setFormData({ ...formData, is_new_arrival: e.target.checked })}
                  className="w-5 h-5"
                />
                <div>
                  <p className="font-semibold" style={{ color: '#1F2A7C' }}>
                    Is New Arrival
                  </p>
                  <p className="text-xs text-gray-600">Show on New Arrivals page</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-5 h-5"
                />
                <div>
                  <p className="font-semibold" style={{ color: '#1F2A7C' }}>
                    Is Featured
                  </p>
                  <p className="text-xs text-gray-600">Show on Home page</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5"
                />
                <div>
                  <p className="font-semibold" style={{ color: '#1F2A7C' }}>
                    Is Active
                  </p>
                  <p className="text-xs text-gray-600">Make product visible on site</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-md disabled:opacity-50"
              style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Save Product'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50"
              style={{ borderColor: '#1F2A7C', color: '#1F2A7C' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
