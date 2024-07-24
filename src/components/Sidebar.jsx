"use client"
import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import "@/css/sidebar.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation'
function Sidebar() {
    
    const pathname = usePathname()
    console.log(pathname)
  
  return (
    <div className="my-5 w-[10%] drawer">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      {/* Page content here */}
      <label htmlFor="my-drawer" className="ml-5 btn btn-neutral drawer-button"><RxHamburgerMenu  className='text-white text-2xl'/></label>
    </div>
    <div className="drawer-side">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <h1 className='my-5 text-center text-2xl font-bold'>MyStudyMate</h1>
        {/* Sidebar content here */}

        <li><Link href={"/dashboard"}><span className={`flex justify-center items-center ${pathname=='/dashboard'?"text-primary":""}`}><FaHome className={`text-2xl mx-5 `}/><span className={``}>Dashboard</span></span></Link></li>


        <li><Link href={"/calendar"}><span  className={`flex justify-center items-center ${pathname=='/calendar'?"text-primary":""}`}><FaCalendarAlt className='text-2xl mx-5'/><span>Calendar</span></span></Link></li>


        <li><Link href={"/analytics"}><span className={`flex justify-center items-center ${pathname=='/analytics'?"text-primary":""}`}><SiSimpleanalytics className='text-2xl mx-5'/><span>Analytics</span></span></Link></li>

        
        <li><Link href={"/settings"}><span className={`flex justify-center items-center ${pathname=='/settings'?"text-primary":""}`}><IoMdSettings className='text-2xl mx-5'/><span>Settings</span></span></Link></li>
      </ul>
    </div>
  </div>
  )
}

export default  Sidebar