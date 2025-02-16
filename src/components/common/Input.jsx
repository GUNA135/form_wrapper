import React from 'react'

const Input = (props) => {
  const { className, value, name } = props

  return (
    <input className={`outline-none border-[2px] border-borderColor focus:border-primary rounded-sm h-[50px] w-full px-2 placeholder:text-placeholderColor ${className}`} {...props} />
  )
}

export default Input