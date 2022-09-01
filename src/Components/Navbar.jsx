import React, { useState } from 'react';
import styles from '../styles/navbar.module.css';
import SearchIcon from '@mui/icons-material/Search';

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { useEffect } from 'react';
import { searchUsers } from '../api';

const Navbar = () => {
  const auth = useAuth(); //AuthContext
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await searchUsers(searchText);
      console.log('Response after searching users:', res);

      if (res.success) {
        setResults(res.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]); //* whenever the searchtext variable changes, we'd call the useEffect!

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt="Logo"
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>

        <input
          placeholder="Search Users.."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src={process.env.PUBLIC_URL + '../' + 'Images/man.png'}
                      alt=""
                    />

                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src={process.env.PUBLIC_URL + 'Images/GauravSomani_circle.png'}
                alt="Profile"
                className={styles.userDp}
              />
              {/* <img src="" alt="" className={styles.userDp} /> */}
            </Link>
            <span> {auth.user.name} </span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log Out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login"> Log In </Link>
                </li>

                <li>
                  <Link to="/signup"> SignUp </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
