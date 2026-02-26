// src/App.jsx
// ─────────────────────────────────────────────
// Root component — assembles all landing page
// sections in order.
// ─────────────────────────────────────────────

import Navbar      from './components/sections/Navbar'
import Hero        from './components/sections/Hero'
import Features    from './components/sections/Features'
import CallToAction from './components/sections/CallToAction'
import Footer      from './components/sections/Footer'
import './App.css'

function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}

export default Landing
