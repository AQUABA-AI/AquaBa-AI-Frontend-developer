// src/components/buttons/OutlineButton.jsx
import './OutlineButton.css'

/**
 * OutlineButton — transparent border button.
 * Props: text, onClick, className, icon, dark (bool)
 */
function OutlineButton({ text = 'Learn More', onClick, className = '', icon, dark = false }) {
  return (
    <button
      className={`btn-outline ${dark ? 'btn-outline--dark' : ''} ${className}`}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  )
}

export default OutlineButton
