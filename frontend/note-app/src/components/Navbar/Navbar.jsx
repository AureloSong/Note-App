import React from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const nagivate = useNavigate();
  const handleLogout = () => {
    nagivate('/login');
  }
  const handleSearch  = () => {
    
  }
  const onClearSearch = () => {
    setSearchQuery('');
  }
  
  return (
    <div className="flex items-center justify-between px-6 py-2 bg-white drop-shadow">
      <h2 className="py-2 text-xl font-medium text-black">Notes</h2>

      <SearchBar value={searchQuery}
        onChange={({ target }) => {
        setSearchQuery(target.value)
      }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}  
      />
      <ProfileInfo  onLogout={handleLogout}/>
    </div>
  )
}

export default Navbar