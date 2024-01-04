import React from 'react'

const CardType1 = ({children,onClick}) => {
  return (
    <div className='h-full w-full border-[1px] border-gray-300  rounded-xl shadow-lg hover:shadow-xl hover:border-tailorBlue-500 bg-gray-50  '>
{children}
    </div>
  )
}

export default CardType1