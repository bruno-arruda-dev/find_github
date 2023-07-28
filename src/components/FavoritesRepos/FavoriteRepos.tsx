import { useContext, useEffect } from 'react';
import { FavoriteRepoContext } from '../../context/FavoriteRepoContext';
import classes from './FavoriteRepos.module.scss';
import RepoCard from './RepoCard/RepoCard';

const FavoriteRepos = () => {
  const { favorites } = useContext(FavoriteRepoContext);


  useEffect(() => {
    // Observar quando o valor de "favorites" for alterado.
  }, [favorites]);

  return (
    <div className={classes.favoriteRepos}>
      <h4>Repositórios Favoritos</h4>
      <div className={classes.reposContainer}>
        {favorites.map((repo) => (
          <RepoCard repo={repo} key={repo} />
        ))}
      </div>
    </div>
  );
}

export default FavoriteRepos;