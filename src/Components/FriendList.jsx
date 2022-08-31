import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';

const FriendList = () => {
  const auth = useAuth();

  const { friendships: friends = [] } = auth.user;
  console.log('friends', friends);

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {friends && friends.length === 0 && (
        <div className={styles.noFriends}>No friends found!</div>
      )}

      {friends &&
        friends.map((friend) => {
          console.log('friend in map', friend);
          return (
            <div key={`friend-${friend._id}`}>
              <Link
                className={styles.friendsItem}
                to={`/user/${friend.to_user._id}`}
              >
                <div className={styles.friendsImg}>
                  <img
                    src={process.env.PUBLIC_URL + '../' + 'Images/man.png'}
                    alt=""
                  />
                </div>
                <div className={styles.friendsName}>{friend.to_user.email}</div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default FriendList;
