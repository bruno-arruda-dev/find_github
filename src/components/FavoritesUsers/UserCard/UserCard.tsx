import React, { useEffect, useState } from 'react';
import classes from './UserCard.module.scss';

interface UserData {
    login: string;
    name: string;
    avatar_url: string;
    location: string;
}

interface UserCardProps {
    user: string;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
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

    return (
        <div className={classes.userCard}>
            {loading ? (<p>Loading...</p>) : error ? (<p>{error}</p>
            ) : (
                userData && (
                    <div className={classes.card}>
                        <img src={userData.avatar_url} />
                        <div>
                            <p>{userData.login}</p>
                            <p>{userData.name}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default UserCard;
