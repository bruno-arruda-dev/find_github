import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './BestProjects.module.scss';
import { ImGithub  } from "react-icons/im";
import { FaReadme } from 'react-icons/fa';
import Loader from '../../components/Loader/Loader';

type Project = {
  id: number;
  name: string;
  description: string;
  html_url: string;
};

const BestProjects: React.FC = () => {
  const { login } = useParams<{ login: string | undefined }>();
  const [bestProjects, setBestProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBestProjects = async () => {
      setIsLoading(true);
      try {
        if (login) {
          const response = await fetch(`https://api.github.com/users/${login}/repos`);
          const data: Project[] = await response.json();
          console.log(data);
          setBestProjects(data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    void fetchBestProjects();
  }, [login]);

  return (
    <div className={classes.project}>
      <h2>{bestProjects.length} projetos de {login}</h2>
      {isLoading && <Loader />}
      {bestProjects.map((project) => (
        <div className={classes.projectData}  key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className='links'>
            <a href={project.html_url} target='_blank'>{<ImGithub />}</a>
            <a href={`${project.html_url}/blob/main/README.md`} target='_blank'>{<FaReadme />}</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestProjects;