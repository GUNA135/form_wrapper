import React, { useState } from 'react'
import FormWrapper from './components/wrapper/FormWrapper'
import { metaData } from '../mock/Data'

const App = () => {
  const [toastify, setToastify] = useState(false)

  const saveData = (e) => {
    localStorage?.setItem('formData', JSON.stringify(e))
    setToastify(true)

    setTimeout(() => {
      setToastify(false)
    }, 2000);
  }

  return (
    <div className='w-full h-auto relative'>
      {toastify && <p className='w-fit h-fit absolute right-0 mr-3 px-6 py-4 top-2 bg-green-200 rounded-sm text-[16px] text-green-700'>Form Submitted Successfully</p>}
      <FormWrapper onChange={(e) => console.log(e)} data={metaData} submit={(e) => saveData(e)} />
    </div>
  )
}

export default App