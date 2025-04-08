import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
    <div>
        <img src="uberbanner.jpg" 
        width={700} height={700} 
        className='object-contain h-full w-screen' />
        <div className='absolute top-30 right-10'>
        <SignIn />
        </div>
       
        </div></>
  )
}