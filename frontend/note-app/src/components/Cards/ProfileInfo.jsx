import React from 'react'
import { getInitials } from '../../utils/helper'
const ProfileInfo = ({onLogout}) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-center justify-center w-12 h-12 rounded-full text-slate-950 front-medium bg-slate-100'>
        {getInitials("Nathan Frutos")}</div>

      <div>
        <p className='text-sm font-medium'>Nat Frutos</p>
        <button className='text-sm underline text-salte-700' onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>

  )
}

export default ProfileInfo