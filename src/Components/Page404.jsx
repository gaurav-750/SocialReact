import { autocompleteClasses } from '@mui/material';
import React from 'react';
import styles from '../styles/image404.module.css';

const Page404 = () => {
  return (
    <div className={styles.image404}>
      <img src={process.env.PUBLIC_URL + 'Images/404Images.png'} />
    </div>
  );
};
export default Page404;
