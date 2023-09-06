import { TextField } from '@mui/material'
import React from 'react'


export default function SearchBar({handleSearch, searchTerm}) {

  
  return (
    <div>
        <TextField 
        className='searchBar'
        fullWidth
         name="search" 
         id="search" 
         value={searchTerm}
         onChange={handleSearch}
         placeholder='Search by name, email or role'/>
    </div>
  )
}
