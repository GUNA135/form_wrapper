import React, { useEffect } from 'react'

const Radio = (props) => {
  const { options = [], name, defaultValue, onChange, onBlur, ...rest } = props

  const handleChange = (value) => {
    const e = {
      target: {
        name: name,
        value: value
      }
    }
    if (onChange) {
      onChange(e)
    }
  }

  useEffect(() => {
    if (onBlur) {
      onBlur()
    }
  }, [defaultValue])

  return (
    <div className='flex items-center flex-row gap-8 text-[16px] font-medium text-textPrimary'>
      {options?.map((option, index) => {
        return (
          <div key={index} onClick={() => handleChange(option?.value)} className='flex items-center gap-2 border-[2px] border-borderColor h-[50px] px-6 rounded-sm cursor-pointer'>
            <input key={defaultValue} defaultChecked={defaultValue == option?.value ? true : false} className='cursor-pointer' type='radio' id={option?.value + index} name={name} {...rest} />
            <label className='cursor-pointer' htmlFor={option?.value + index}>{option?.label}</label>
          </div>
        )
      })}
    </div>
  )
}

export default Radio