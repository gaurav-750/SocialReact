import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { login as loginUser } from '../api';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await loginUser(email, password);

    if (res.success) {
      //setting the user:
      setUser(res.data.user);

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  };
  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    loading,
  };
};
