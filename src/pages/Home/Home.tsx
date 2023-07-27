import { UserProps } from '../../types/user';
import { useState } from 'react';
import classes from './Home.module.scss';
import Search from '../../components/Search/Search';
import User from '../../components/User/User';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import FavoriteUsers from '../../components/FavoritesUsers/FavoriteUsers';

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadUser = async (userName: string) => {
    setIsLoading(true);
    setError(false);
    setUser(null);
    const res = await fetch(`https://api.github.com/users/${userName}`)

    const data = await res.json();

    if (res.status === 404) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const { avatar_url, login, location, followers, following, name } = data;

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
      name,
    };

    setUser(userData);
    setIsLoading(false);
    console.log(data);
  }

  return (
    <div className={classes.home}>
      <h1>Finder GitHub</h1>
      <Search loadUser={loadUser} />
      {isLoading && <Loader />}
      {user && <User {...user} />}
      {error && <Error />}
      <FavoriteUsers loadUser={loadUser} />
    </div>
  );
}

export default Home;