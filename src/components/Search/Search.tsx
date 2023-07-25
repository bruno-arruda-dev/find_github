import { useState, KeyboardEvent, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import classes from './Search.module.scss';

type SearchProps = {
  loadUser: (userName: string) => Promise<void>;
};

const Search = ({ loadUser }: SearchProps) => {
  const [userName, setUserName] = useState('bruno-arruda-dev');

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await loadUser(userName);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    void loadUser('bruno-arruda-dev');
  }, []);

  return (
    <div className={classes.search}>
      {/* <h2>Busque por um usuário</h2> */}
      <p>Procure os repositórios</p>
      <div className={classes.search_container}>
        <input
          type="text"
          placeholder="bruno-arruda-dev"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown as unknown as React.KeyboardEventHandler<HTMLInputElement>}
        />
        <button onClick={() => void loadUser(userName)}>
          <BsSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;
