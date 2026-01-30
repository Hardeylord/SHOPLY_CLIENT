import React, { useEffect, useState } from 'react'

export const ProgressBar = ({value}) => {
  const[percent, setPercent]=useState(value)

  useEffect(()=>{
    setPercent(Math.min(100, Math.max(value, 0)))
  }, [value])
  return (
    <div className='h-5 w-36 bg-amber-100 relative rounded-full overflow-hidden border-2 border-black'>
      <span className='absolute flex justify-center -mt-1 w-full items-center'>{percent.toFixed()}%</span>
      <div style={{
        width:`${percent}%`
      }} className='h-full bg-green-600'/>
    </div>
  )
}
