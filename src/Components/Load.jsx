import React from 'react'
import { Spinner } from "@/Components/ui/spinner"

const Load = () => {
  return (
    <>
    <div className='w-full h-screen flex justify-center items-center bg-black'>
      <Spinner className="size-8 text-white" />
    </div>
    </>
  )
}

export default Load


