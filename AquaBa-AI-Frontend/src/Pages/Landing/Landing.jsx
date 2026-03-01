import { useState } from "react";
import {useNavigate} from "react-router-dom"
import S from "./../Landing/LandingPage"
import AvatarIcons from '../../assets/Avatar-image.png'




// ─── Avatar colours (4 realistic skin-tone gradients) ─────────────────────────
const AVATAR_COLORS = [
  "linear-gradient(135deg, #c9956a 20%, #a0714f 100%)",
  "linear-gradient(135deg, #e8b89a 20%, #c9896a 100%)",
  "linear-gradient(135deg, #7a9fd4 20%, #4a78b8 100%)",
  "linear-gradient(135deg, #b8a08a 20%, #9a7a64 100%)",
];

// ─── SVG icon components ───────────────────────────────────────────────────────

// Clock icon → Expiry tracking
function ClockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// Trending-up icon → AI demand forecasting
function TrendIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

// Shopping-cart icon → Smart reorder suggestions
function CartIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9"  cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}



const handleClick=()=> window.location.href='/Login'

// ─── StatusBar ────────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div style={S.statusBar}>
      <span style={S.statusTime}>AquaBa</span>
      <button style={{...S.ctanBtn}} onClick={handleClick} >Get Started Free</button>

    </div>
  );
}

// ─── FeatureItem ──────────────────────────────────────────────────────────────
function FeatureItem({ icon, label }) {
  return (
    <li style={S.featureItem}>
      <span style={S.featureIconCircle}>{icon}</span>
      <span style={S.featureLabel}>{label}</span>
    </li>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ bg, zIndex }) {
  return (
    <div style={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: bg,
      border: "2.5px solid #e8f3fb",
      marginRight: -10,
      position: "relative",
      zIndex,
      boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
      overflow: "hidden",
    }}>
      {/* Head */}

       <img src={AvatarIcons} alt="" />
      <div style={{
        position: "absolute", top: 7, left: "50%",
        transform: "translateX(-50%)",
        width: 12, height: 12, borderRadius: "50%",
        background: "rgba(255,255,255,0.28)",
      }} />
      {/* Shoulders */}
      <div style={{
        position: "absolute", bottom: 3, left: "50%",
        transform: "translateX(-50%)",
        width: 18, height: 18,
        borderRadius: "50% 50% 0 0",
        background: "rgba(255,255,255,0.22)",
      }} />
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
function Landing() {
  const [btnHovered, setBtnHovered] = useState(false);

  const features = [
    { icon: <ClockIcon />, label: "Expiry tracking & alerts" },
    { icon: <TrendIcon />, label: "AI demand forecasting"    },
    { icon: <CartIcon />,  label: "Smart reorder suggestions" },
  ];

  const navigate = useNavigate()

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #e8f3fb; }
      `}</style>

      <div style={S.page}>
        <div style={S.shell}>
           
          {/* Background glow blob */}
          <div style={S.glow} />

          {/* iOS-style status bar */}
          <StatusBar />

          {/* Main content */}
          <div style={S.content}>

            {/* ── HEADLINE ── */}
            <h1 style={S.headline}>
              Smart Inventory<br />for Seafood
            </h1>

            {/* ── SUBHEADLINE ── */}
            <p style={S.subheadline}>
              Prevent spoilage, forecast demand, and{"\n"}
              optimize stock with AI-powered insights.
            </p>

            {/* ── FEATURE LIST ── */}
            <ul style={S.featureList}>
              {features.map((f) => (
                <FeatureItem key={f.label} icon={f.icon} label={f.label} />
              ))}
            </ul>

            {/* ── CTA BUTTON ── */}
            <button
              style={{
                ...S.ctaBtn,
                ...(btnHovered ? S.ctaBtnHover : {}),
              }}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              onClick={() => navigate("/Login")}
            >
              Get Started Free
              <span style={{ fontSize: 18, fontWeight: 400, marginLeft: 2 }}>→</span>
            </button>

            {/* ── SOCIAL PROOF ── */}
            <div style={S.socialProof}>
              {/* Overlapping avatars */}
              <div style={S.avatars}>
                {AVATAR_COLORS.map((bg, i) => (
                  <Avatar
                    key={i}
                    bg={bg}
                    zIndex={AVATAR_COLORS.length - i}
                  />
                ))}
              </div>

              {/* Stars + label */}
              <div style={S.proofText}>
                <div style={S.stars}>★★★★★</div>
                <div style={S.proofLabel}>Trusted by 500+ businesses</div>
              </div>
            </div>

          </div>{/* /content */}
        </div>{/* /shell */}

        
      </div>{/* /page */}

      <footer style={{...S.footer}}>
         <div>
            <p style={{...S.paragraphTop}}>No credit card required • 14-day free trial • Cancel anytime</p>
            <p style={{...S.paragraphBottom}}>Trusted By: Pacific Seafood Ocean Fresh Coastal Catch</p>
        </div>
      </footer>
    </>
  );
}

export default Landing;