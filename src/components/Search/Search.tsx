import { useState, KeyboardEvent } from 'react';

import { BsSearch } from 'react-icons/bs';
import classes from './Search.module.scss';

type SearchProps = {
  loadUser: (userName: string) => Promise<void>;
};

const Search = ({ loadUser }: SearchProps) => {
  const [userName, setUserName] = useState('');

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await loadUser(userName);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={classes.search}>
      <h2>Busque por um usuário</h2>
      <p>Procure os repositórios</p>
      <div className={classes.search_container}>
        <input
          type="text"
          placeholder="Digite o nome do usuário"
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
