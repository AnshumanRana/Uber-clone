import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
    const HeaderMenu = [
        {
            id: 1,
            name: "Ride",
            icon: "/TaxiImage.webp"
        },
        {
            id: 2,
            name: "Package",
            icon: "/Box.jpg"
        }
    ]
    return (
        <div>
            <div className=' pb-0 pl-5 pt-0  border-b-[3px]
        border-gray-200 flex items-center  justify-between'>
                <div className='flex gap-24 items-center '>
                    <img src="UberLogo.png" height={100} width={100}
                        alt="Logo" />
                    <div className='flex gap-6 items-center'>
                        {HeaderMenu.map((item) => (
                            <div className='flex gap-2 items-center'>
                                <img src={item.icon} height={30} width={30} alt="" />
                                <h2 className='text-[20px] font-medium'>{item.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <UserButton className=''/>

            </div>

        </div>
    )
}

export default Header
