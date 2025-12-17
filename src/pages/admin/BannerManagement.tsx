import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Banner } from '../../types/database';

export function BannerManagement() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    page: 'home',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('banners')
      .select('*')
      .order('page')
      .order('display_order');

    if (data) setBanners(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const bannerData = {
        title: formData.title || null,
        image_url: formData.image_url,
        page: formData.page,
        display_order: formData.display_order,
        is_active: formData.is_active,
        updated_at: new Date().toISOString(),
      };

      if (editingBanner) {
        await supabase.from('banners').update(bannerData).eq('id', editingBanner.id);
      } else {
        await supabase.from('banners').insert({
          ...bannerData,
          created_at: new Date().toISOString(),
        });
      }

      setShowForm(false);
      setEditingBanner(null);
      resetForm();
      fetchBanners();
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Failed to save banner');
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title || '',
      image_url: banner.image_url,
      page: banner.page,
      display_order: banner.display_order,
      is_active: banner.is_active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    await supabase.from('banners').delete().eq('id', id);
    fetchBanners();
  };

  const updateDisplayOrder = async (bannerId: string, newOrder: number) => {
    await supabase
      .from('banners')
      .update({ display_order: newOrder, updated_at: new Date().toISOString() })
      .eq('id', bannerId);

    fetchBanners();
  };

  const toggleStatus = async (banner: Banner) => {
    await supabase
      .from('banners')
      .update({ is_active: !banner.is_active, updated_at: new Date().toISOString() })
      .eq('id', banner.id);

    fetchBanners();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image_url: '',
      page: 'home',
      display_order: 0,
      is_active: true,
    });
  };

  const groupedBanners = banners.reduce((acc, banner) => {
    if (!acc[banner.page]) {
      acc[banner.page] = [];
    }
    acc[banner.page].push(banner);
    return acc;
  }, {} as Record<string, Banner[]>);

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#1F2A7C' }}>
            Banner Management
          </h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingBanner(null);
              resetForm();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:shadow-md"
            style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
          >
            <Plus className="w-5 h-5" />
            Add Banner
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
              {editingBanner ? 'Edit Banner' : 'Add New Banner'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Title (Optional)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Banner title or description"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://images.pexels.com/..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
                {formData.image_url && (
                  <div className="mt-3">
                    <img
                      src={formData.image_url}
                      alt="Banner preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Page *
                  </label>
                  <select
                    value={formData.page}
                    onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  >
                    <option value="home">Home</option>
                    <option value="offers">Offers</option>
                    <option value="combos">Combos</option>
                    <option value="new-arrivals">New Arrivals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                </div>
              </div>

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
                  {editingBanner ? 'Update Banner' : 'Add Banner'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingBanner(null);
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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading banners...</p>
          </div>
        ) : Object.keys(groupedBanners).length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <p className="text-gray-600">No banners created yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedBanners).map(([page, pageBanners]) => (
              <div key={page} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b" style={{ backgroundColor: '#FFF2CC' }}>
                  <h2 className="text-xl font-bold" style={{ color: '#1F2A7C' }}>
                    {page.charAt(0).toUpperCase() + page.slice(1)} Page Banners ({pageBanners.length})
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  {pageBanners.map((banner, index) => (
                    <div
                      key={banner.id}
                      className="flex gap-4 p-4 border-2 border-gray-200 rounded-lg"
                    >
                      <img
                        src={banner.image_url}
                        alt={banner.title || 'Banner'}
                        className="w-32 h-24 object-cover rounded"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold mb-1" style={{ color: '#1F2A7C' }}>
                          {banner.title || 'Untitled Banner'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">Order: {banner.display_order}</p>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${
                            banner.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {banner.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => updateDisplayOrder(banner.id, banner.display_order - 1)}
                          disabled={index === 0}
                          className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-30"
                        >
                          <ArrowUp className="w-5 h-5" style={{ color: '#1F2A7C' }} />
                        </button>
                        <button
                          onClick={() => updateDisplayOrder(banner.id, banner.display_order + 1)}
                          disabled={index === pageBanners.length - 1}
                          className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-30"
                        >
                          <ArrowDown className="w-5 h-5" style={{ color: '#1F2A7C' }} />
                        </button>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => toggleStatus(banner)}
                          className={`px-3 py-1 text-sm rounded font-semibold ${
                            banner.is_active
                              ? 'bg-gray-100 text-gray-600'
                              : 'bg-green-100 text-green-600'
                          }`}
                        >
                          {banner.is_active ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => handleEdit(banner)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Edit className="w-5 h-5" style={{ color: '#1F2A7C' }} />
                        </button>
                        <button
                          onClick={() => handleDelete(banner.id)}
                          className="p-2 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
