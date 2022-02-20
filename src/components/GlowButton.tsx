import React from 'react'

type GlowButtonProps = {
  text: string;
  onClick: () => void;
}
export default function GlowButton({text, onClick}: GlowButtonProps) {
  return (
    <button onClick={onClick} type="button" className="glow-btn btn">{text}</button>
  )
}
