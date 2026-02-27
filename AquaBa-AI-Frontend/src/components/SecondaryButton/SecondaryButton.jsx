// src/components/buttons/SecondaryButton.jsx
import './SecondaryButton.css'

/**
 * SecondaryButton — soft blue ghost-style button.
 * Props: text, onClick, className, icon
 */
function SecondaryButton({ text = 'Learn More', onClick, className = '', icon }) {
  return (
    <button className={`btn-secondary ${className}`} onClick={onClick}>
      {icon && <span>{icon}</span>}
      {text}
    </button>
  )
}

export default SecondaryButton
