export function About() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF7' }}>
      <div
        className="py-16 px-4 text-white"
        style={{
          background: 'linear-gradient(135deg, #1F2A7C 0%, #E91E63 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">About MANSARA</h1>
          <p className="text-2xl">Nourish from Within – The Power of MANSARA</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <section>
          <p className="text-lg text-gray-700 leading-relaxed">
            MANSARA was founded in December 2020 with a deep personal purpose — to make pure,
            nourishing food a part of everyday life, especially for those seeking better balance,
            wellness, and long-term health. The brand was born from lived experience, care, and
            conviction — not just an idea.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
            Our Story
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            MANSARA began its journey with a focus on pure, traditionally prepared cooking
            essentials — Groundnut oil, Sesame oil, Coconut oil, and Ghee — made with an
            uncompromising commitment to quality, purity, and honesty.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            As trust grew, so did our offerings. We expanded into nutritious porridge mixes such as
            Urad Porridge Mix and Kavuni Porridge Mix, and later introduced authentic millet idly
            podi — combining traditional recipes with modern-day convenience.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Each product is designed to be easy to cook, clean in ingredients, and gentle in
            processing, making healthy eating practical for today's lifestyle.
          </p>
        </section>

        <section className="p-8 rounded-2xl" style={{ backgroundColor: '#FFF2CC' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
            Founder's Note
          </h2>
          <p className="text-lg font-semibold mb-4" style={{ color: '#E91E63' }}>
            Founder – Deepika Harikrishnan
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            MANSARA was founded by Deepika Harikrishnan, driven by her personal journey and lived
            experience with hormonal health challenges.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Through this journey, she realized the powerful role that clean, balanced, and
            traditional foods play in supporting overall well-being. Her aim was never to create
            "special diet food," but to make everyday food better, purer, and more nourishing — so
            families can support their health naturally through what they eat daily.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            MANSARA reflects this belief — that food should support the body, not burden it, and
            that long-term wellness begins with mindful, honest nourishment.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
            What MANSARA Stands For
          </h2>
          <div className="space-y-3 text-lg text-gray-700">
            <p>
              <strong style={{ color: '#1F2A7C' }}>M</strong> – Modern, Cloud-Enabled Quality
            </p>
            <p>
              <strong style={{ color: '#1F2A7C' }}>A</strong> – Authentic, Heart-Centered Nutrition
            </p>
            <p>
              <strong style={{ color: '#1F2A7C' }}>N</strong> – Naturally Clean Ingredients
            </p>
            <p>
              <strong style={{ color: '#1F2A7C' }}>S</strong> – Smart, Sustainable Systems
            </p>
            <p>
              <strong style={{ color: '#1F2A7C' }}>A</strong> – Advanced, Light Processing
            </p>
            <p>
              <strong style={{ color: '#1F2A7C' }}>R</strong> – Reliable & Responsible
            </p>
            <p>
              <strong style={{ color: '#1F2A7C' }}>A</strong> – Always Pure
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
            Our Vision
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To become a trusted wellness food brand that supports healthier lifestyles by offering
            pure, nourishing food rooted in tradition and enhanced by modern practices.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
            Our Mission
          </h2>
          <ul className="space-y-2 text-lg text-gray-700">
            <li>• To provide clean, wholesome foods inspired by traditional wisdom</li>
            <li>• To support everyday wellness through simple, nourishing ingredients</li>
            <li>• To create easy-to-cook products suited for modern living</li>
            <li>• To maintain purity, transparency, and responsibility across all processes</li>
          </ul>
        </section>

        <section className="text-center p-8 rounded-2xl" style={{ backgroundColor: '#FFE4F0' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
            Our Promise
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At MANSARA, we believe true nourishment starts from within. Every product we create is a
            step toward better balance, mindful eating, and long-term well-being.
          </p>
        </section>
      </div>
    </div>
  );
}
