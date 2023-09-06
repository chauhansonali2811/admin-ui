import React, { useState } from 'react'

export default function EditUserData({ user, onSave }) {

    const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(editedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={editedUser.name}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Email:
      <input
      type="email"
      name="email"
      value={editedUser.email}
      onChange={handleInputChange}
    />
  </label>
  <label>
      Role:
      <input
      type="text"
      name="role"
      value={editedUser.role}
      onChange={handleInputChange}
    />
  </label>
  <button type="submit">Save</button>
</form>
)
}
