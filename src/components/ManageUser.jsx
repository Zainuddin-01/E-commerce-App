import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import '../App.css'

const ManageUser = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users from Firestore
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    const userData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUsers(userData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete a user
  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, 'users', id));
    fetchUsers(); // refresh after delete
  };

  return (
    <div className="manage-users">
  <h2 className="title">Manage Users</h2>
  <table className="user-table">
    <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Phone</th>
        <th>City</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.city}</td>
          <td>
            <button onClick={() => handleDelete(user.id)} className="delete-btn">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
};

export default ManageUser;
