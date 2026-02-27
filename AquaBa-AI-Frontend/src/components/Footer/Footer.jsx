// src/components/sections/Footer.jsx
import './Footer.css'

const LINKS = {
  Product:  ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company:  ['About Us', 'Careers', 'Press', 'Contact'],
  Support:  ['Documentation', 'Help Centre', 'Privacy', 'Terms'],
}

const SOCIALS = [
  { icon: '𝕏', href: '#' },
  { icon: 'in', href: '#' },
  { icon: '📘', href: '#' },
  { icon: '📷', href: '#' },
]

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">

        {/* Top grid */}
        <div className="footer__top">

          {/* Brand column */}
          <div>
            <div className="footer__brand-logo">
              <div className="footer__logo-mark">💧</div>
              <span className="footer__logo-text">AquaBa</span>
            </div>
            <p className="footer__brand-desc">
              Smart inventory management for seafood businesses — reduce
              waste, forecast demand, and grow with confidence.
            </p>
            <div className="footer__socials">
              {SOCIALS.map(s => (
                <a key={s.icon} href={s.href} className="footer__social">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([col, links]) => (
            <div key={col}>
              <p className="footer__col-title">{col}</p>
              <ul className="footer__links">
                {links.map(l => (
                  <li key={l}>
                    <a href="#" className="footer__link">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} AquaBa Technologies Ltd. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy Policy</a>
            <a href="#" className="footer__bottom-link">Terms of Service</a>
            <a href="#" className="footer__bottom-link">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
