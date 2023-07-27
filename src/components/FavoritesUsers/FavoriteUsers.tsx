import { useContext } from 'react';
import {SearchProps} from '../../types/loadUser';
import { FavoriteUserContext } from '../../context/FavoriteUserContext';
import classes from './FavoriteUsers.module.scss';
import UserCard from './UserCard/UserCard';

const FavoriteUsers = ({ loadUser }: SearchProps) => {
  const { favoritesUsers } = useContext(FavoriteUserContext);

  return (
    <div className={classes.favoriteUsers}>
      <h4>Usuários Favoritos</h4>
      <div className={classes.usersContainer}>
        {favoritesUsers.map((user, key) => (
          <UserCard loadUser={loadUser} user={user} />
        ))}
      </div>
    </div>
  );
};

export default FavoriteUsers;