import React, { useEffect, useState } from 'react';
import classes from './UserCard.module.scss';
import { SearchProps } from '../../../types/loadUser';

interface UserData {
    login: string;
    name: string;
    avatar_url: string;
    location: string;
}

interface UserCardProps {
    user: string;
    loadUser: (userName: string) => Promise<void>;
}

const UserCard: React.FC<UserCardProps> = ({ user, loadUser }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${user}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data: UserData = await response.json();
                setUserData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data');
                setLoading(false);
            }
        };

        void fetchUserData();
    }, [user]);

    const handleSelectUser = () => {
        if (userData) {
            void loadUser(userData.login);
        }
    };

    return (
        <div className={classes.userCard}>
            {loading ? (<p>Loading...</p>) : error ? (<p>{error}</p>
            ) : (
                userData && (
                    <div className={classes.card} onClick={handleSelectUser}>
                        <img src={userData.avatar_url} />
                        <div>
                            <p>{userData.login}</p>
                            <p>{userData.location}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default UserCard;
