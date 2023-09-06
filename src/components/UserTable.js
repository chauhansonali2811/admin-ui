import React, { useState, useEffect } from 'react';
import axios from "axios";
import SearchBar from './SearchBar';
import Pagination from "./Pagination"
import "./UserTable.css"
import EditUserData from "./EditUserData"


const pageSize = 10; 

const UserTable = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);

 

  const totalPages = Math.ceil(users.length / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  

  const getUsersData =async ()=>{
    let res = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
  console.log(res.data);
  setUsers(res.data);
  } 

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const visibleData = users.slice(startIndex, endIndex);

  useEffect(() => {
    getUsersData();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelectedUsers(users.slice(startIndex, endIndex).map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleCheckboxClick = (event, userId) => {
    if (event.target.checked) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) => prevSelected.filter((id) => id !== userId));
    }
  };

  const isSelected = (userId) => selectedUsers.indexOf(userId) !== -1;

  const deleteUser=(id)=>{
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  }

  const handleDeleteSelectedUsers = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => !isSelected(user.id)));
  };

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const filteredData = users.filter(user =>
      user.name.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(newSearchTerm.toLowerCase())
    );

    setUsers(filteredData);
  };

  const handleEdit = (userId) => {
    setEditingUserId(userId);
  };

  const handleSave = (editedUser) => {
    
    const updatedUsers = users.map(user => {
      if (user.id === editedUser.id) {
        return { ...user, name: editedUser.name, email: editedUser.email, role: editedUser.role}; // Create a new object with updated name
      }
      return user;
    });

console.log(editedUser);
    setUsers(updatedUsers);
    setEditingUserId(null);
  };

  return (
    <>
    <SearchBar 
    searchTerm={searchTerm}
    handleSearch={handleSearch}/>
      
      <table>
        <thead>
          <tr>
            <th padding="checkbox">
              <input
              type="checkbox"
                indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                checked={selectedUsers.length === users.slice(startIndex, endIndex).length}
                onChange={handleSelectAllClick}
                inputProps={{ 'aria-label': 'select all users' }}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((user) => (
            <tr key={user.id}>
              <td padding="checkbox">
                <input
              type="checkbox"
                  checked={isSelected(user.id)}
                  onChange={(event) => handleCheckboxClick(event, user.id)}
                  inputProps={{ 'aria-label': `select user ${user.id}` }}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
              {editingUserId === user.id ? (
                  <EditUserData user={user} onSave={handleSave} />
                ) : (
                  <button onClick={() => handleEdit(user.id)}>Edit</button>
                )}
                 
                <button onClick={()=>deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
    <Pagination 
    handleDeleteSelectedUsers={handleDeleteSelectedUsers} 
    handlePageChange={handlePageChange}
    currentPage={currentPage}
    totalPages={totalPages}/>
    </>
  );
};

export default UserTable;
