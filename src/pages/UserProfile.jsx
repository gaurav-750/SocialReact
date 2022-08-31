import React, { useEffect } from 'react';
import styles from '../styles/settings.module.css';
import { Redirect, useLocation, useParams, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/index';
import { useState } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
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

    const index = friendIds.indexOf(userId);
    if (index != -1) {
      return true; //* User is a friend
    }

    return false;
  };

  const showFriendsBtn = checkIfUserIsAFriend();

  const handleAddFriendClick = async () => {
    const res = await addFriend(userId);

    console.log('res in add friend in userprofile:', res);
    if (res.success) {
      const { friendship } = res.data;

      auth.updateUserFriend(true, friendship);

      addToast('Friend added successfully', {
        appearance: 'success',
      });
    } else {
      addToast(res.message, {
        appearance: 'error',
      });
    }
  };

  const handleRemoveFriendClick = async () => {
    const res = await removeFriend(userId);
    console.log('res in remove friend in userprofile:', res);

    if (res.success) {
      console.log('res.data in handleremovefriend', res.data);

      //* find the friend which is to be deleted:
      const friendToBeDeleted = auth.user.friendships.filter((friend) => {
        return friend.to_user._id === userId;
      });

      console.log('Friend to be deleted:', friendToBeDeleted);

      auth.updateUserFriend(false, friendToBeDeleted[0]);
      addToast('Friend Removed successfully', {
        appearance: 'success',
      });
    } else {
      addToast(res.message, {
        appearance: 'error',
      });
    }
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}></div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {!showFriendsBtn ? ( //* he is not a friend
          <button
            onClick={handleAddFriendClick}
            className={`button ${styles.saveBtn}`}
          >
            Add Friend
          </button>
        ) : (
          <button
            onClick={handleRemoveFriendClick}
            className={`button ${styles.saveBtn}`}
          >
            Remove Friend
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

/*

//*Deleting a Friend:
  1. Make an api call.
  2. Find the friend which is to be deleted
  3. Call updateUserFriend function and remove the friend to be deleted from the 
      friendships array.
  4. Update the Local State.

*/
