import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { supabase } from '../../lib/supabase';

export function Settings() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    website_name: 'MANSARA FOODS',
    logo_url: '',
    contact_email: 'mansarafoods@gmail.com',
    contact_phone: '+91 88388 87064',
    address: 'No. 15, Government Hospital Opposite, Timiri Road, Kalavai, Ranipet, Tamil Nadu – 632506, India',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from('content_pages')
      .select('*')
      .eq('page_key', 'site_settings')
      .maybeSingle();

    if (data && data.content) {
      try {
        const settings = JSON.parse(data.content);
        setFormData({ ...formData, ...settings });
      } catch (e) {
        console.error('Error parsing settings:', e);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: existing } = await supabase
        .from('content_pages')
        .select('*')
        .eq('page_key', 'site_settings')
        .maybeSingle();

      const settingsData = {
        page_key: 'site_settings',
        title: 'Site Settings',
        content: JSON.stringify(formData),
        updated_at: new Date().toISOString(),
      };

      if (existing) {
        await supabase
          .from('content_pages')
          .update(settingsData)
          .eq('page_key', 'site_settings');
      } else {
        await supabase.from('content_pages').insert(settingsData);
      }

      alert('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#1F2A7C' }}>
          Settings
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
              General Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Website Name
                </label>
                <input
                  type="text"
                  value={formData.website_name}
                  onChange={(e) => setFormData({ ...formData, website_name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Logo URL
                </label>
                <input
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.contact_phone}
                  onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
              Social Media Links
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={formData.facebook_url}
                  onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={formData.instagram_url}
                  onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Twitter URL
                </label>
                <input
                  type="url"
                  value={formData.twitter_url}
                  onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                  placeholder="https://twitter.com/..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
              Brand Colors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#FDB913' }}>
                <p className="font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  Primary (Golden Yellow)
                </p>
                <p className="text-sm font-mono">#FDB913</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#E91E63' }}>
                <p className="font-semibold text-white mb-2">Accent (Deep Pink)</p>
                <p className="text-sm font-mono text-white">#E91E63</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#1F2A7C' }}>
                <p className="font-semibold text-white mb-2">Trust (Royal Blue)</p>
                <p className="text-sm font-mono text-white">#1F2A7C</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-md disabled:opacity-50"
            style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
          >
            <Save className="w-5 h-5" />
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
