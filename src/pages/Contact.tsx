import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="py-16 px-4" style={{ backgroundColor: '#1F2A7C' }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We'd Love to Hear from You</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#FFF2CC' }}
            >
              <Mail className="w-8 h-8" style={{ color: '#1F2A7C' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#1F2A7C' }}>
              Email Us
            </h3>
            <a
              href="mailto:mansarafoods@gmail.com"
              className="text-gray-700 hover:text-[#E91E63] transition-colors"
            >
              mansarafoods@gmail.com
            </a>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#FFE4F0' }}
            >
              <Phone className="w-8 h-8" style={{ color: '#E91E63' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#1F2A7C' }}>
              Call / WhatsApp
            </h3>
            <a
              href="tel:+918838887064"
              className="text-gray-700 hover:text-[#E91E63] transition-colors"
            >
              +91 88388 87064
            </a>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#FFF2CC' }}
            >
              <MapPin className="w-8 h-8" style={{ color: '#1F2A7C' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#1F2A7C' }}>
              Visit Us
            </h3>
            <p className="text-gray-700 text-sm">
              No. 15, Government Hospital Opposite,
              <br />
              Timiri Road, Kalavai, Ranipet,
              <br />
              Tamil Nadu – 632506, India
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#1F2A7C' }}>
            Get in Touch For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#FFF2CC' }}>
              <h3 className="font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                Product Information
              </h3>
              <p className="text-gray-700 text-sm">
                Learn more about our products and their benefits
              </p>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#FFE4F0' }}>
              <h3 className="font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                Orders & Availability
              </h3>
              <p className="text-gray-700 text-sm">Questions about your orders or stock</p>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#FFE4F0' }}>
              <h3 className="font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                Feedback & Suggestions
              </h3>
              <p className="text-gray-700 text-sm">We value your feedback and ideas</p>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#FFF2CC' }}>
              <h3 className="font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                Collaborations & Partnerships
              </h3>
              <p className="text-gray-700 text-sm">Explore business opportunities with us</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center p-8 rounded-xl" style={{ backgroundColor: '#FFF2CC' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
            Our Commitment
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Every message matters to us. We respond with the same care, honesty, and responsibility
            that define MANSARA.
          </p>
        </div>
      </div>
    </div>
  );
}
