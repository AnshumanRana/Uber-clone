import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
    const headerMenu=[
        {
            id:1,
            name:"taxi",
            icon:"/TaxiImage.webp"
        },
        {
            id:2,
            name:"Package",
            icon:"/Box.jpg"
        }
    ]
  return (
    <div className='p-4 pb-1 pl-10 border-b-[4px]
    border-gray-200 flex items-center justify-between'>
        <div className=' flex gap-24 items-center'>
            <img src="UberLogo.png"  height={80} width={80} />
            <div className=' flex gap-6 items-center'>
                    {headerMenu.map((item) => (
                        <div className='flex' key={item.id}>
                            <img src={item.icon}  height={25} width={25} alt={item.name} />
                            <h2 className='text-[14px] font-medium '>{item.name}</h2>
                        </div>
                    ))}
                </div>
        </div>
        <UserButton/>
      
    </div>
  )
}

export default Header
