import React from 'react'

const Label = (props) => {
    const{children,className}=props

  return (
    <label className={className} {...props}>{children}</label>
  )
}

export default Label