import React, { useEffect, useState, useContext } from 'react';
import classes from './RepoCard.module.scss';
import { repoProps } from '../../../types/repo';
import { FaLink, FaReadme } from 'react-icons/fa';
import { ImGithub } from 'react-icons/im';
import { AiFillStar } from 'react-icons/ai';
import { FavoriteRepoContext } from '../../../context/FavoriteRepoContext';

interface RepoData {
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    owner: {
        login: string;
    };
}

const RepoCard: React.FC<repoProps> = ({ repo }) => {
    const [repoData, setRepoData] = useState<RepoData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { checkFavoriteRepo } = useContext(FavoriteRepoContext);

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                const response = await fetch(repo);
                if (!response.ok) {
                    throw new Error('Failed to fetch repository data');
                }
                const data: RepoData = await response.json();
                setRepoData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching repository data:', error);
                setError('Failed to fetch repository data');
                setLoading(false);
            }
        };

        void fetchRepoData();
    }, [repo]);

    return (
        <div className={classes.repoCard}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                repoData && (
                    <div className={classes.repoContainer}>
                        <h2>{repoData.name}</h2>
                        {repoData.description && (
                            <div className={classes.description}>
                                {repoData.description}
                            </div>
                        )}
                        <h3>{repoData.owner.login}</h3>
                        <div className={classes.actions}>
                            <ImGithub />
                            <FaReadme />
                            {repoData.homepage ?
                                <a href={repoData.homepage} target='_blank' rel='noreferer noopener'>
                                    <FaLink />
                                </a>
                                :
                                <FaLink className={classes.disableLink} />
                            }
                            <AiFillStar className={classes.star} onClick={() => checkFavoriteRepo(repo)} />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default RepoCard;
