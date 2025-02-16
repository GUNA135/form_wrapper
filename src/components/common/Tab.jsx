import React, { useEffect } from 'react'
import Button from './Button'

const Tab = (props) => {
    const { position = "left", options = [], setSelectedTab, selectedTab, formData, setFormData, name, turnOffFunc } = props

    const alignPosition = {
        left: 'justify-left',
        center: 'justify-center'
    }

    const selectTab = (index) => {
        setSelectedTab(index)
    }

    useEffect(() => {
        if (formData && name) {
            setFormData({ ...formData, [name]: selectedTab })
        }
    }, [selectedTab])

    return (
        <div className='w-full h-fit'>
            <div className={`flex items-center gap-3 ${alignPosition?.[position]}`}>
                {options && options?.length > 0 && options?.map((value, index) => {
                    return <Button onClick={() => turnOffFunc ? '' : selectTab(index)} varient={index == selectedTab ? 'primary' : 'secondary'} key={index} tabVarient={true}>{value?.label}</Button>
                })}
            </div>
        </div>
    )
}

export default Tab