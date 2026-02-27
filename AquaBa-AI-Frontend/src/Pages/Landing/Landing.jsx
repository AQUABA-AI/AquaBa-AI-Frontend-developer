



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

// ─── FeatureItem ─────────────────
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
  return (
    <>
      
    </>
  )
}

export default Landing
