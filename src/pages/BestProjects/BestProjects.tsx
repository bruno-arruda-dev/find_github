import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import classes from './BestProjects.module.scss';
import { ImGithub } from 'react-icons/im';
import { FaReadme } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import Loader from '../../components/Loader/Loader';
import { FavoriteRepoContext } from '../../context/FavoriteRepoContext';

type Project = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  created_at: string;
  owner: {
    login: string;
  };
};

const BestProjects: React.FC = () => {
  const { login } = useParams<{ login: string }>();
  const [bestProjects, setBestProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { checkFavoriteRepo, favorites } = useContext(FavoriteRepoContext);

  useEffect(() => {
    const fetchBestProjects = async () => {
      setIsLoading(true);
      try {
        if (login) {
          const response = await fetch(`https://api.github.com/users/${login}/repos`);
          const data: Project[] = await response.json();

          data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); // Ordena por data de criação

          setBestProjects(data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    void fetchBestProjects();
  }, [login]);

  const handleFavoriteRepo = (repo: string) => {
    checkFavoriteRepo(repo);
  }

  return (
    <div className={classes.project}>
      <h2>{bestProjects.length} projetos de {login}</h2>
      {isLoading && <Loader />}
      {bestProjects.map((project) => (
        <div className={classes.projectData} key={project.id}>
          <AiFillStar
            className={`${classes.star} ${favorites.includes(`https://api.github.com/repos/${project.owner.login}/${project.name}`) ? classes.favorite : classes.unfavorite}`}
            onClick={() => handleFavoriteRepo(`https://api.github.com/repos/${project.owner.login}/${project.name}`)}
          />
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className='links'>
            <a href={project.html_url} target='_blank' rel='noopener noreferrer'>
              {<ImGithub />}
            </a>
            <a href={`${project.html_url}/blob/main/README.md`} target='_blank' rel='noopener noreferrer'>
              {<FaReadme />}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestProjects;
