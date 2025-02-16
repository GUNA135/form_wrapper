import React, { useEffect } from 'react'

const Upload = (props) => {
    const { className, defaultValue, formData, onBlur, onChange, setFormData, ...rest } = props

    const isFile = defaultValue && defaultValue?.length > 0

    const remove = () => {
        setFormData({ ...formData, [props?.name]: '' })
    }

    const handleChange = (e) => {
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
        <div className='border-[2px] border-borderColor h-[50px] w-fill rounded-sm px-2 focus-within:border-primary' tabIndex="0">
            {!isFile && <input type='file' className={`h-full w-full py-3 cursor-pointer border-0 outline-0 ${className}`} onChange={handleChange} {...rest} />}

            {isFile && <div className='h-full w-full flex items-center gap-4'>
                <p className='p-0 h-full w-full flex items-center text-[16px] font-medium text-textPrimary'>{defaultValue?.[0]?.name}</p>
                <button onClick={remove} className='py-0 px-2 cursor-pointer rounded-sm bg-gray-200 text-sm text-red-500'>X</button>
            </div>}
        </div>
    )
}

export default React.memo(Upload)