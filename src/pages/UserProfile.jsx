import React, { useState } from 'react';
import styles from '../styles/settings.module.css';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/index';

const UserProfile = () => {
  const user = {};

  const auth = useAuth();

  //!User must be logged in to see this Profile Page
  if (!auth.user) {
    return <Redirect to="/login" />;
  }
  {
    console.log(process.env.PUBLIC_URL);
  }

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
        <button className={`button ${styles.saveBtn}`}>Add Friend</button>

        <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
      </div>
    </div>
  );
};

export default UserProfile;
