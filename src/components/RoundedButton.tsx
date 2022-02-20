import React from 'react'

type RoundedButtonType = {
  children: any;
}

export default function RoundedButton({children}: RoundedButtonType) {
  return (
    <button type="button" className="rounded-btn btn btn-primary">{children}</button>
  )
}
