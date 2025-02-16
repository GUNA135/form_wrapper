import React from 'react'

const Button = (props) => {
  const { children, className, varient, tabVarient } = props

  const tabButtonVarient = {
    primary: 'bg-primary text-white',
    secondary: 'bg-white text-inActiveTabButtonTextColor'
  }

  const buttonVarient = {
    primary: 'bg-primary text-white',
    secondary: 'bg-white text-textPrimary'
  }

  if (tabVarient) {
    return (
      <button className={`py-4 px-6 rounded-4xl text-[16px] font-semibold cursor-pointer shadow-md disabled:bg-disabledBg disabled:text-disabledText disabled:cursor-not-allowed ${tabButtonVarient?.[varient]} ${className}`} {...props}>{children}</button>
    )
  } else {
    return (
      <button className={`py-2.5 px-14 rounded-4xl text-[16px] font-semibold cursor-pointer shadow-sm shadow-gray-200 disabled:bg-disabledBg disabled:text-disabledText disabled:cursor-not-allowed ${buttonVarient?.[varient]} ${className}`} {...props}>{children}</button>
    )
  }

}

export default Button