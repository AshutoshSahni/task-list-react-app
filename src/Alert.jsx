import React, { useEffect } from 'react'

const Alert = ({type, msg, removeAlert, list}) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000)

    return () => clearTimeout(timeout);
  }, [list])


  return (
    <p className='bg-red-200 text-center w-full py-2 text-red-800'>
      {msg}
    </p>
  )
}

export default Alert