import {useState} from 'react';
import { UserProps } from "../../types/user";
import {MdLocationPin} from 'react-icons/md';
import {AiFillStar} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import classes from './User.module.scss';

const User = ({ login, avatar_url, followers, following, location }: UserProps) => {
    const [favoriteUser, setFavoriteUser] = useState('unfavorite');

    const handleFavoriteUser = () => {
        favoriteUser === 'favorite' ? setFavoriteUser('unfavorite') : setFavoriteUser('favorite');
        console.log(favoriteUser);
    }

    return (
        <div className={classes.user}>
            <AiFillStar className={`${classes.star} ${classes[favoriteUser]}`} onClick={handleFavoriteUser} />
            <a className={classes.profile} href={`https://github.com/${login}`} target='_blank'>
                <img src={avatar_url} alt={login} />
            </a>
            <h1>{login}</h1>
            {location && (
                <p className={classes.location}>
                <MdLocationPin />
                <span>{location}</span>
            </p>
            )}
            <div className={classes.stats}>
                <div>
                    <p>Seguidores:</p>
                    <p className={classes.number}>{followers}</p>
                </div>
                <div>
                    <p>Seguindo:</p>
                    <p className={classes.number}>{following}</p>
                </div>
            </div>
            <Link className={classes.repos} to={`/${login}`} target="_blank">Ver projetos</Link>
        </div>
    );
}

export default User;
