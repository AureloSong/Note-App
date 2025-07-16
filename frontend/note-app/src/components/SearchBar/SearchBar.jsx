import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

const SearchBar = ({value, onChange, handleSearch, onClearSearch}) => {


  return (
    <div className='flex items-center px-4 rounded-md w-80 bg-slate-100'>
        <input
        type="text"
        placeholder="Search notes..."
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange}
        />

        {value && (
            <IoMdClose className='mr-3 text-lg cursor-pointer hover:text-black text-slate-400' onClick={onClearSearch} />
        )}
        <FaMagnifyingGlass className='text-lg cursor-pointer hover:text-black text-slate-400' onClick={handleSearch} />
    </div>
  )
}

export default SearchBar