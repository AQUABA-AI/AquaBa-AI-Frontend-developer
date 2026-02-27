// src/components/sections/CallToAction.jsx
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import OutlineButton from '../../components/OutlineButton/OutlineButton'
import './CallToAction.css'

function CallToAction() {
  return (
    <section className="cta" id="about">
      <div className="container">
        <div className="cta__card">
          <span className="cta__eyebrow">Start today</span>

          <h2 className="cta__title">
            Ready to eliminate<br />seafood waste?
          </h2>

          <p className="cta__subtitle">
            Join 500+ seafood businesses that cut spoilage by up to 40% in
            their first three months using AquaBa.
          </p>

          <div className="cta__actions">
            <PrimaryButton text="Get Started Free →" onClick={() => {}} />
            <OutlineButton text="Schedule a Demo" onClick={() => {}} />
          </div>

          <p className="cta__note">No credit card required · Free 14-day trial · Cancel anytime</p>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
