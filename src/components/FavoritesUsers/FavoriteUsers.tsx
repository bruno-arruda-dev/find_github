import React, { useContext } from 'react';
import { FavoriteUserContext } from '../../context/FavoriteUserContext';
import classes from './FavoriteUsers.module.scss';
import UserCard from './UserCard/UserCard';

const FavoriteUsers = () => {
  const { favoritesUsers } = useContext(FavoriteUserContext);

  return (
    <div className={classes.favoriteUsers}>
      {favoritesUsers.map((user) => (
        <UserCard user={user} />
      ))}
    </div>
  );
};

export default FavoriteUsers;