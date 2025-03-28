import React from 'react'

function InputItem({type}) {
  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4 '>
      <img src={type=='source'?'/location.png':'/destination.webp'} 
       height={15} width={15}  />
      <input type="text" placeholder={type=='source'?'Pickup Location':'DropOff Location'}
      className='bg-transparent w-full outline-none' />
    </div>
  )
}

export default InputItem
