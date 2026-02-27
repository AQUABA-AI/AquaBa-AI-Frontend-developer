// src/components/sections/Hero.jsx
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton'
import './Hero.css'

const FEATURES = [
  { icon: '⏱', text: 'Expiry tracking & real-time alerts' },
  { icon: '📈', text: 'AI-powered demand forecasting' },
  { icon: '🛒', text: 'Smart reorder suggestions' },
]

const ALERTS = [
  { type: 'warn', text: '5 batches approaching expiry' },
  { type: 'info', text: 'Demand forecast: +18% this week' },
  { type: 'ok',   text: 'All cold storage optimal ✓' },
]

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero__inner">

          {/* ── LEFT: Content ── */}
          <div className="hero__content">
            {/* Eyebrow badge */}
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              Now with AI-powered forecasting
            </div>

            {/* Headline */}
            <h1 className="hero__headline">
              Smart Inventory<br />
              for <span className="hero__headline-accent">Seafood</span>
            </h1>

            {/* Subheadline */}
            <p className="hero__subheadline">
              Prevent spoilage, forecast demand, and optimise stock with
              AI-powered insights built for modern seafood businesses.
            </p>

            {/* Feature bullets */}
            <ul className="hero__features">
              {FEATURES.map(f => (
                <li key={f.text} className="hero__feature-item">
                  <span className="hero__feature-icon">{f.icon}</span>
                  {f.text}
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="hero__cta-row">
              <PrimaryButton text="Get Started Free →" onClick={() => {}} />
              <SecondaryButton text="Watch Demo" icon="▶" onClick={() => {}} />
            </div>

            {/* Social proof */}
            <div className="hero__social-proof">
              <div className="hero__avatars">
                {['JA', 'MO', 'TK', 'EB'].map((init, i) => (
                  <div key={i} className="hero__avatar">{init}</div>
                ))}
              </div>
              <div className="hero__proof-text">
                <div className="hero__stars">★★★★★</div>
                <div className="hero__proof-label">Trusted by 500+ businesses</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Dashboard preview ── */}
          <div className="hero__visual">
            <div className="hero__dashboard">
              {/* Dashboard header bar */}
              <div className="hero__dash-header">
                <span className="hero__dash-title">AquaBa Dashboard</span>
                <div className="hero__dash-dots">
                  <span/><span/><span/>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="hero__dash-body">
                {/* Stats row */}
                <div className="hero__dash-stat-row">
                  <div className="hero__dash-stat">
                    <div className="hero__dash-stat-val">12.4t</div>
                    <div className="hero__dash-stat-lbl">Total Stock</div>
                  </div>
                  <div className="hero__dash-stat">
                    <div className="hero__dash-stat-val">18</div>
                    <div className="hero__dash-stat-lbl">Batches</div>
                  </div>
                  <div className="hero__dash-stat">
                    <div className="hero__dash-stat-val">7.2%</div>
                    <div className="hero__dash-stat-lbl">Waste Risk</div>
                  </div>
                </div>

                {/* Alert rows */}
                <div className="hero__dash-alerts">
                  {ALERTS.map(a => (
                    <div key={a.text} className={`hero__dash-alert hero__dash-alert--${a.type}`}>
                      <span className="hero__dash-alert-dot" />
                      {a.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
