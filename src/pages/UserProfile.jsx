import React, { useEffect } from 'react';
import styles from '../styles/settings.module.css';
import { Redirect, useLocation, useParams, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/index';
import { useState } from 'react';
import { fetchUserProfile } from '../api';
import { useToasts } from 'react-toast-notifications';
import Loader from '../Components/Loader';

const UserProfile = () => {
  //   const location = useLocation();
  //   const { user } = location.state;
  //   console.log('location', location);

  const { addToast } = useToasts();
  const history = useHistory();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const { userId } = useParams();
  console.log('userid from useparams', userId);

  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      console.log('response after fetching user in userProfile:', response);

      if (response.success) {
        setUser(response.data.user);
        setLoading(false);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });

        return history.push('/');
      }
    };

    getUser();
  }, [userId]);

  //!User must be logged in to see this Profile Page
  if (!auth.user) {
    return <Redirect to="/login" />;
  }

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    console.log('Auth:', auth);
    const friends = auth.user.friendships;

    const friendIds = friends.map((friend) => {
      return friend.to_user._id;
    });

    console.log('friendIds', friendIds);

    const index = friendIds.indexOf(userId);

    console.log('index:', index);
    if (index != -1) {
      return true; //* User is a friend
    }

    return false;
  };

  const showFriendsBtn = checkIfUserIsAFriend();

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src={process.env.PUBLIC_URL + '../' + 'Images/man.png'} alt="" />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {console.log('showFriendsBtn', showFriendsBtn)}

        {showFriendsBtn !== -1 ? (
          <button className={`button ${styles.saveBtn}`}>Add Friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
