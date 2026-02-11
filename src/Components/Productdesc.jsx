import { CalendarDays, CirclePercent, Package, TruckElectric } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Productdesc = () => {

  const {name}=useParams();
  const [fullProduct, setfullProduct]=useState({
    name:"",
    desc:"",
    price:"",
    rating:"",
    image:[
      
    ]
  })

  useEffect(()=>{
    const productDesc=async()=>{
      try {
        const response=await fetch(`http://localhost:8080/product/${name}`)
        const data=await response.json();
        setfullProduct(data)

      } catch (error) {
        
      }
    }

    productDesc()
  }, [name])

  return (
    <>
    {/* <button className='bg-green-900' onClick={()=>console.log(fullProduct.image[0])}>click</button> */}
    <div className='w-full flex p-4 gap-4'>
      {/* image */}
      <div className='w-1/2 relative h-[90vh]'>
      <div style={{
         backgroundImage: fullProduct.image.length == 0 ? `red` : `url(${fullProduct.image[0].secure_url})`
      }} className='bg-cover p-4 rounded-2xl gap-4 flex items-end justify-between h-full bg-center'>
        {fullProduct.image.map((miniImage, index)=>(
          <div key={index} style={{
            backgroundImage:`url(${miniImage.secure_url})`
          }} className='w-1/3 h-48 rounded-[12px] bg-cover bg-center'></div>
        ))}
      </div>
      </div>

      {/* description */}
      <div className='w-1/2 flex flex-col justify-evenly'>
      <div>
        <button className='px-4 border border-[#dcdcdc] rounded-full py-1.5'>Man Fashion</button>
        <p className='font-oswald text-2xl'>{fullProduct.name}</p>
        <p className='font-oswald text-xl'>${fullProduct.price}</p>
      </div>
      <div>
        <section className='px-4 py-2 rounded-2xl border border-[#dcdcdc]'>
          <p className='font-oswald text-2xl'>Description</p>
          <p className='font-montserrat'>{fullProduct.desc}</p>
        </section>
      </div>
      <div>
      <section className='px-4 space-y-6 py-2 rounded-2xl border border-[#dcdcdc]'>
          <p className='font-oswald text-2xl'>Shipping</p>
          <div className='w-full space-y-4 flex'>
            {/* discount */}
            <div className='w-1/2 space-y-4'>

            <div className='w-1/2 flex space-x-2'>
            <div className='bg-[#dcdcdc] flex items-center rounded-full p-2'>
            <CirclePercent size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className='text-xs'>Discount</p>
              <p className='font-oswald text-[15px]'>Disc 50%</p>
            </div>
            </div>

            {/* discount */}
            <div className='w-1/2 flex space-x-2'>
            <div className='bg-[#dcdcdc] flex items-center rounded-full p-2'>
            <Package size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className='text-xs'>Package</p>
              <p className='font-oswald text-[15px]'>Regular Package</p>
            </div>
            </div>

            </div>

            <div className='w-1/2 space-y-4'>

            {/* discount */}
            <div className='w-1/2 flex space-x-2'>
            <div className='bg-[#dcdcdc] flex items-center rounded-full p-2'>
            <CalendarDays size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className='text-xs'>Delivery Time</p>
              <p className='font-oswald text-[15px]'>3-4 Working Days</p>
            </div>
            </div>

            {/* discount */}
            <div className='w-1/2 flex space-x-2'>
            <div className='bg-[#dcdcdc] flex items-center rounded-full p-2'>
            <TruckElectric size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className='text-xs'>Estimation Arrive</p>
              <p className='font-oswald text-[15px]'>5 Days</p>
            </div>
            </div>

            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
    </>
  )
}

export default Productdesc