const S = {
    // Page wrapper
    page: {
      minHeight: "100vh",
      background: "linear-gradient(175deg, #daeefb 0%, #eaf5fd 28%, #f2f9fe 55%, #e8f4fc 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      fontFamily: "'Inter', sans-serif",
      WebkitFontSmoothing: "antialiased",
      overflowX: "hidden",
    },
  
    // Mobile shell — matches screenshot width
    shell: {
      width: "100%",
      maxWidth: 412,
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      padding: "0 24px 64px",
    },
  
    // Background radial glow (top oval from screenshot)
    glow: {
      position: "absolute",
      top: -60,
      left: "50%",
      transform: "translateX(-50%)",
      width: 340,
      height: 260,
      borderRadius: "50%",
      background:
        "radial-gradient(ellipse at center, rgba(180,220,245,0.70) 0%, rgba(200,232,250,0.40) 50%, transparent 75%)",
      pointerEvents: "none",
      zIndex: 0,
    },
  
    // Status bar
    statusBar: {
      height: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 4px",
      position: "relative",
      zIndex: 1,
      paddingTop: "50px",
    },
    statusTime: {
      fontSize: 24,
      fontWeight: 600,
      color: "#0A2463",
      letterSpacing: -0.3,
    },
    statusIcons: { display: "flex", alignItems: "center", gap: 6 },
  
    // Content
    content: {
      position: "relative",
      zIndex: 1,
      paddingTop: 100
    },
  
    // Headline
    headline: {
      fontSize: 34,
      fontWeight: 800,
      color: "#0A2463",
      lineHeight: 1.16,
      letterSpacing: -0.8,
      margin: "30px 0 10px",
      
    },
  
    // Subheadline
    subheadline: {
      fontSize: 16,
      fontWeight: 400,
      color: "#4a5568",
      lineHeight: 1.6,
      letterSpacing: -0.1,
      margin: "0 0 12px",
    },
  
    // Feature list
    featureList: {
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap:8,
      margin: "0 0 28px",
      padding: 0,
      fontSize: 14
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 14
    },
    featureIconCircle: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "#007BFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    featureLabel: {
      fontSize: 14,
      fontWeight: 500,
      color: "#2d3748",
      letterSpacing: -0.1,
    },
  
    // CTA button (base)
    ctaBtn: {
      width: "100%",
      padding: "13px 20px",
      background: "#007BFF",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: 0,
      border: "none",
      borderRadius: 14,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginBottom: 15,
      boxShadow: "0 6px 24px rgba(26,115,232,0.38)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease",
    },

     ctanBtn:{
      width: "50%",
      padding: "10px 16px",
      background: "#007BFF",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: -0.2,
      border: "none",
      borderRadius: 14,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      boxShadow: "0 6px 24px rgba(26,115,232,0.38)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease",

     },

    ctaBtnHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 32px rgba(26,115,232,0.48)",
      filter: "brightness(1.06)",
    },
  
    // Social proof row
    socialProof: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom:"150px",
    },
    avatars: {
      display: "flex",
      alignItems: "center",
    },
    proofText: { marginLeft: 4 },
    stars: {
      color: "#f59e0b",
      fontSize: 15,
      letterSpacing: 1.5,
      lineHeight: 1,
      marginBottom: 3,
    },
    proofLabel: {
      fontSize: 13,
      fontWeight: 500,
      color: "#718096",
      letterSpacing: -0.1,
    },

    footer:{
       borderTop:"1px solid  #fff",
       padding:"13.2px 15px",
       display:"flex",
       flexDirection:"column",
       alignItems:"center",
       justifyContent:"center",
       fontSize:12
      
    },

    paragraphTop:{
      color:"#6A7282",
      
    },

    paragraphBottom:{
      color:"#99A1AF",
    }, 

  };

  export default S
  