// src/components/buttons/PrimaryButton.jsx
import './PrimaryButton.css'

/**
 * PrimaryButton — bold gradient CTA button.
 * Props:
 *   text      {string}   Button label
 *   onClick   {function} Click handler
 *   className {string}   Extra CSS classes
 *   icon      {node}     Optional icon after text
 *   fullWidth {boolean}  Stretch to 100% width
 */
function PrimaryButton({ text = 'Get Started', onClick, className = '', icon, fullWidth }) {
  return (
    <button
      className={`btn-primary ${fullWidth ? 'btn-full' : ''} ${className}`}
      onClick={onClick}
      style={fullWidth ? { width: '100%' } : {}}
    >
      {text}
      {icon && <span className="btn-icon">{icon}</span>}
    </button>
  )
}

export default PrimaryButton
