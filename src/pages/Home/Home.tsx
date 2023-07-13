import { UserProps } from '../../types/user';
import Search from '../../components/Search/Search';
import { useState } from 'react';
import User from '../../components/User/User';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';

const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);

    const loadUser = async(userName: string) => {
      setError(false);
      setUser(null);
        const res = await fetch(`https://api.github.com/users/${userName}`)

        const data = await res.json();

        if (res.status === 404) {
          setError(true);
          return;
        }

        const {avatar_url, login, location, followers, following} = data;

        const userData: UserProps = {
            avatar_url,
            login,
            location,
            followers,
            following,
        };

        setUser(userData);
    }

  return (
    <div className='home'>
            <h1>Buscar GitHub</h1>
      <Search loadUser={loadUser} />
      {user && <User {...user} />}
      {error && <Error />}
    </div>
  );
}

export default Home;