import React from 'react'
import InputItem from './InputItem'

function SearchSection() {
  return (
    <div className=' p-2 md:pd-6  border-2 rounded-xl'>
     <p className='text-[20px] font-bold'> Get A Ride</p>
     <InputItem type='source'/>
     <InputItem type='destination'/>
     <button className='p-3 mt-5 bg-black w-full rounded-lg text-white'>Search</button>
    </div>
  )
}

export default SearchSection
