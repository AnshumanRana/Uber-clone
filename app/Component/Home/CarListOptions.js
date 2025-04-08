
import { carListData } from '@/utils/carListData';
import CarListItems from './carListItmes';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function CarListOptions({distance}) {
    const [activeIndex, setActiveIndex] = useState(null); 
    const [selectedCar, setSelectedCar] = useState([]); 
    const Router=useRouter();

    return (
        <div className='mt-5 overflow-auto h-[250px]'>
            <h2 className='text-[22px] font-bold'>
                Recommended
            </h2>
            {carListData.map((item, index) => (
                <div
                    key={index} 
                    className={`cursor-pointer p-2 rounded-2xl ${activeIndex === index ? 'border-[1px] ' : ''}`} 
                    onClick={() => {setActiveIndex(index)
                        setSelectedCar((item))

                    }}
                    
                >
                    <CarListItems car={item} distance={distance} />
                </div>
            ))}
          { selectedCar?.name? <div className='flex justify-between fixed bg-white
            bottom-5 ng-white p-3 shadow-xl rounded-lg w-full md:w-[30%]
            border-[1px] items-center'>
                <h2>
                    Make Payment For
                </h2>
                <button className='bg-black text-white rounded-lg
                p-3 text-center'
                onClick={()=>{Router.push('/payment?amount='+selectedCar.amount*distance.toFixed(2))}}>Request {selectedCar.name}</button>
            </div>:null}
        </div>
    );
}

export default CarListOptions;
