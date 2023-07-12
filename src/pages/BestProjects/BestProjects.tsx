import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Project = {
  id: number;
  name: string;
  description: string;
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
    <div>
      <h2>Melhores Projetos de {login}</h2>
      {bestProjects.map((project) => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          {/* Outras informações do projeto */}
        </div>
      ))}
    </div>
  );
};

export default BestProjects;