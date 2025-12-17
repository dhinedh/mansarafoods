import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Combo, Product } from '../../types/database';

interface ComboWithItems extends Combo {
  items?: {
    id: string;
    product_id: string;
    quantity: number;
    product: Product;
  }[];
}

export function CombosManagement() {
  const [combos, setCombos] = useState<ComboWithItems[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCombo, setEditingCombo] = useState<ComboWithItems | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    combo_price: '',
    is_active: true,
    items: [] as { product_id: string; quantity: number }[],
  });

  useEffect(() => {
    fetchCombos();
    fetchProducts();
  }, []);

  const fetchCombos = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('combos')
      .select(
        `
        *,
        items:combo_items(
          *,
          product:products(*)
        )
      `
      )
      .order('created_at', { ascending: false });

    if (data) setCombos(data);
    setLoading(false);
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (data) setProducts(data);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const calculateOriginalPrice = () => {
    return formData.items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.product_id);
      return total + (product ? (product.offer_price || product.price) * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.items.length === 0) {
      alert('Please add at least one product to the combo');
      return;
    }

    const originalPrice = calculateOriginalPrice();
    const comboPrice = parseFloat(formData.combo_price);

    if (comboPrice >= originalPrice) {
      alert('Combo price should be less than the original price to show savings');
      return;
    }

    try {
      const comboData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        image_url: formData.image_url || null,
        combo_price: comboPrice,
        original_price: originalPrice,
        is_active: formData.is_active,
        updated_at: new Date().toISOString(),
      };

      if (editingCombo) {
        await supabase.from('combos').update(comboData).eq('id', editingCombo.id);

        await supabase.from('combo_items').delete().eq('combo_id', editingCombo.id);

        const items = formData.items.map((item) => ({
          combo_id: editingCombo.id,
          product_id: item.product_id,
          quantity: item.quantity,
        }));
        await supabase.from('combo_items').insert(items);
      } else {
        const { data: newCombo } = await supabase
          .from('combos')
          .insert({ ...comboData, created_at: new Date().toISOString() })
          .select()
          .single();

        if (newCombo) {
          const items = formData.items.map((item) => ({
            combo_id: newCombo.id,
            product_id: item.product_id,
            quantity: item.quantity,
          }));
          await supabase.from('combo_items').insert(items);
        }
      }

      setShowForm(false);
      setEditingCombo(null);
      resetForm();
      fetchCombos();
    } catch (error) {
      console.error('Error saving combo:', error);
      alert('Failed to save combo. Please try again.');
    }
  };

  const handleEdit = (combo: ComboWithItems) => {
    setEditingCombo(combo);
    setFormData({
      name: combo.name,
      slug: combo.slug,
      description: combo.description || '',
      image_url: combo.image_url || '',
      combo_price: combo.combo_price.toString(),
      is_active: combo.is_active,
      items:
        combo.items?.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })) || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this combo?')) return;

    await supabase.from('combo_items').delete().eq('combo_id', id);
    await supabase.from('combos').delete().eq('id', id);

    fetchCombos();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image_url: '',
      combo_price: '',
      is_active: true,
      items: [],
    });
  };

  const addProduct = () => {
    if (products.length === 0) return;
    setFormData({
      ...formData,
      items: [...formData.items, { product_id: products[0].id, quantity: 1 }],
    });
  };

  const removeProduct = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#1F2A7C' }}>
            Combos Management
          </h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingCombo(null);
              resetForm();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:shadow-md"
            style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
          >
            <Plus className="w-5 h-5" />
            Create Combo
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
              {editingCombo ? 'Edit Combo' : 'Create New Combo'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Combo Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                        slug: generateSlug(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Combo Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://images.pexels.com/..."
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold" style={{ color: '#1F2A7C' }}>
                    Products in Combo *
                  </label>
                  <button
                    type="button"
                    onClick={addProduct}
                    className="px-3 py-1 text-sm rounded-lg font-semibold"
                    style={{ backgroundColor: '#FFF2CC', color: '#1F2A7C' }}
                  >
                    Add Product
                  </button>
                </div>

                {formData.items.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg text-gray-600">
                    No products added. Click "Add Product" to start building your combo.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.items.map((item, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <select
                          value={item.product_id}
                          onChange={(e) => updateItem(index, 'product_id', e.target.value)}
                          className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                        >
                          {products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name} - ₹
                              {(product.offer_price || product.price).toFixed(2)}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                          className="w-24 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeProduct(index)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Original Price
                  </label>
                  <input
                    type="text"
                    value={`₹${calculateOriginalPrice().toFixed(2)}`}
                    disabled
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Combo Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.combo_price}
                    onChange={(e) => setFormData({ ...formData, combo_price: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                </div>
              </div>

              {formData.combo_price && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFF2CC' }}>
                  <p className="text-sm font-semibold" style={{ color: '#1F2A7C' }}>
                    Savings: ₹{(calculateOriginalPrice() - parseFloat(formData.combo_price)).toFixed(2)}
                    ({Math.round(((calculateOriginalPrice() - parseFloat(formData.combo_price)) / calculateOriginalPrice()) * 100)}% OFF)
                  </p>
                </div>
              )}

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="font-semibold" style={{ color: '#1F2A7C' }}>
                  Active (Visible on website)
                </span>
              </label>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg font-semibold transition-all hover:shadow-md"
                  style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
                >
                  {editingCombo ? 'Update Combo' : 'Create Combo'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingCombo(null);
                    resetForm();
                  }}
                  className="px-6 py-2 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: '#1F2A7C', color: '#1F2A7C' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading combos...</p>
            </div>
          ) : combos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No combos created yet</p>
            </div>
          ) : (
            <table className="w-full">
              <thead style={{ backgroundColor: '#FFF2CC' }}>
                <tr>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Combo
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Products
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Prices
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Status
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {combos.map((combo) => {
                  const savings = combo.original_price - combo.combo_price;
                  const savingsPercent = Math.round((savings / combo.original_price) * 100);

                  return (
                    <tr key={combo.id} className="border-b">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {combo.image_url && (
                            <img
                              src={combo.image_url}
                              alt={combo.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <span className="font-semibold">{combo.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {combo.items?.map((item, idx) => (
                            <div key={idx}>
                              {item.quantity}x {item.product.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold" style={{ color: '#1F2A7C' }}>
                            ₹{combo.combo_price.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500 line-through">
                            ₹{combo.original_price.toFixed(2)}
                          </p>
                          <p className="text-xs" style={{ color: '#E91E63' }}>
                            Save ₹{savings.toFixed(2)} ({savingsPercent}%)
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${
                            combo.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {combo.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(combo)}
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Edit className="w-5 h-5" style={{ color: '#1F2A7C' }} />
                          </button>
                          <button
                            onClick={() => handleDelete(combo.id)}
                            className="p-2 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
