import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../firebase/firebaseConfig';
import '../../App.css'

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="user-profile">
      <h2 className="profile-title">User Profile</h2>
      {userData ? (
        <div className="profile-details">
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>City:</strong> {userData.city}</p>
          <p><strong>Country:</strong> {userData.country}</p>
        </div>
      ) : (
        <p className="loading-text">Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
