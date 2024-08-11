import { useUserStore } from '../store/store'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
function DropdownProfile() {
  const router = useRouter();
    const {username} = useUserStore();

    const logout = () => {
        localStorage.removeItem('studymate_token');
        localStorage.removeItem('studymate_refresh_token');
        router.push("/login")
    }
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
             <img src={`https://ui-avatars.com/api/?name=${username}`} loading='lazy'/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link href={"/dashboard"} className="justify-between">
            Dashboard
          
          </Link>
        </li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  )
}

export default DropdownProfile