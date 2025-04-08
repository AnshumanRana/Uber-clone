import React from 'react'
import { FaUser } from "react-icons/fa";

function carListItmes({car,distance}) {
  return (
    <div >
      <div className='flex mt-5 p-2 items-center '>
        <img src={car.image}
        width={100}
        height={100} alt="" />
        <div>
            <h2 className='font-bold text-[14px] flex gap-2 items-center'>{car.name}</h2>
            <span className='flex '>
            <FaUser  />
            <p className='pl-3'>{car.seats}</p>
           
            </span>
           
            
            
            <p>{car.desc}</p>
            
        </div>
        <h2 className='font-bold text-[14px] '>Rs {car.amount*distance.toFixed(2)}</h2>
      </div>
    </div>
  )
}

export default carListItmes
