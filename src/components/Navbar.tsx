"use client";

import { NAV_LINKS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import { useRouter } from 'next/navigation'
import axios from 'axios';

const Navbar = () => {
  const [username,setUsername]= useState("Login")
  const [disabled,setDisabled]= useState(true)
  const router = useRouter()
  const onLogin = ()=>{
    if(username=="Login"){
      router.push("/login")
    }else{
      router.push("/profile")
    }
  }
  const handleMenu=()=>{
    setDisabled(!disabled)
  }
  const getUserDetails=async()=>{
    const res=await axios.get('api/users/me')
    setUsername(res.data.data)
  }
  useEffect(()=>{
    getUserDetails()
  },[])
  return (
    <nav className='flexBetween max-container padding-container relative z-30 py-5'>
      <Link href="/">
        <Image src="/CampNew (1).png" alt='logo' width={100} height={29}/>
      </Link>

      <ul className='hidden h-full gap-12 lg:flex'>
        {NAV_LINKS.map((link)=>(
          <Link href={link.href} key={link.key}
          className='regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold'
          >
            {link.label}
          </Link>
        ))}
      </ul>

      <div className='lg:flexCenter hidden'>
        <Button type="button" title={username} icon="/user.svg" variant="btn_dark_green" click={onLogin}/>
      </div>

      {disabled? 
        ""
      : 
        <div className='flex-col absolute rounded-[20px] top-8 right-14 bg-slate-600 lg:hidden'>
          <Button type="button" title={username} icon="/user.svg" variant="border-0 bg-slate-600 px-10 pt-6 pb-3 text-white md:px-16" click={onLogin}/>
          <hr className='border-white mx-1'/>
          <div>
            {NAV_LINKS.map((link)=>(
              <div>
                <Link href={link.href} key={link.key}
                className='regular-16 text-white flexCenter cursor-pointer py-2 px-6 transition-all hover:font-bold md:px-16'
                >
                  {link.label}
                </Link>
                <hr className='border-white mx-1'/>
              </div>
            ))}
          </div>
        </div>
      }
      

      <Image 
        src="/menu.svg"    
        alt="menu"
        width={32} 
        height={32}
        className="inline-block cursor-pointer lg:hidden"
        onClick={handleMenu}
      />
    </nav>
  )
}

export default Navbar
