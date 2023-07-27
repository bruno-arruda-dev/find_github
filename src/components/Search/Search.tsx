import { useState, KeyboardEvent, useEffect } from 'react';
import { SearchProps } from '../../types/loadUser';
import { BsSearch } from 'react-icons/bs';
import classes from './Search.module.scss';

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
      <p>Digite o usuário</p>
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
