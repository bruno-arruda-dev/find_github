import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './BestProjects.module.css';
import { ImGithub  } from "react-icons/im";

type Project = {
  id: number;
  name: string;
  description: string;
  html_url: string;
};

const BestProjects: React.FC = () => {
  const { login } = useParams<{ login: string | undefined }>();
  const [bestProjects, setBestProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchBestProjects = async () => {
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
    };

    void fetchBestProjects();
  }, [login]);

  return (
    <div className={classes.project}>
      <h2>Projetos de {login}</h2>
      {bestProjects.map((project) => (
        <div className={classes.projectData}  key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <a href={project.html_url} target='_blank'>{<ImGithub />}</a>
        </div>
      ))}
    </div>
  );
};

export default BestProjects;