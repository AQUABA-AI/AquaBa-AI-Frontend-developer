// src/components/sections/Features.jsx
import './Features.css'

const FEATURES = [
  {
    icon: '⏱',
    iconBg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    title: 'Expiry Tracking & Alerts',
    desc:  'Automated alerts before any batch reaches its expiry date. Never lose stock to spoilage again with real-time monitoring.',
    tag:   'Real-time',
  },
  {
    icon: '📈',
    iconBg: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    title: 'AI Demand Forecasting',
    desc:  'Machine-learning models trained on seasonal patterns and market data predict exactly how much stock you need each week.',
    tag:   'AI-Powered',
  },
  {
    icon: '🛒',
    iconBg: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    title: 'Smart Reorder Suggestions',
    desc:  'Automatic purchase recommendations sent directly to your suppliers — so shelves stay full without manual counting.',
    tag:   'Automation',
  },
  {
    icon: '🗺',
    iconBg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    title: 'Storage Location Tracking',
    desc:  'Track temperature, location, and capacity across every cold room and freezer from a single unified dashboard.',
    tag:   'Multi-location',
  },
]

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">

        {/* Section header */}
        <p className="features__eyebrow">What we offer</p>
        <h2 className="features__title">
          Everything your seafood<br />business needs
        </h2>
        <p className="features__subtitle">
          Purpose-built tools for aquaculture and seafood distributors —
          so you can focus on growing, not guessing.
        </p>

        {/* Feature cards grid */}
        <div className="features__grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card">
              <div
                className="feature-card__icon"
                style={{ background: f.iconBg }}
              >
                {f.icon}
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
              <span className="feature-card__tag">{f.tag}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Features
