import { useContext, useState, useEffect } from "react";
import { UserProps } from "../../types/user";
import { MdLocationPin } from "react-icons/md";
import {  AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import classes from "./User.module.scss";
import { FavoriteUserContext } from "../../context/FavoriteUserContext";

const User = ({ login, avatar_url, followers, following, location, name }: UserProps) => {
    const [favoriteUser, setFavoriteUser] = useState("unfavorite");
    const { checkFavoriteUser, favoritesUsers } = useContext(FavoriteUserContext);

    const handleFavoriteUser = () => {
        checkFavoriteUser(login);
    };

    useEffect(() => {
        // Verifica se o login está no array de favoritos
        const isFavorite = favoritesUsers.includes(login);

        // Atualiza o estado do favoriteUser de acordo com a verificação
        setFavoriteUser(isFavorite ? "favorite" : "unfavorite");
    }, [favoritesUsers, login]);

    return (
        <div className={classes.user}>
            <AiFillStar
                className={`${classes.star} ${classes[favoriteUser]}`}
                onClick={handleFavoriteUser}
            />
            <a className={classes.profile} href={`https://github.com/${login}`} target="_blank">
                <img src={avatar_url} alt={login} />
            </a>
            {
                name ? <h1>{name}</h1> : <h1>{login}</h1>
            }
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
            <Link className={classes.repos} to={`/${login}`} target="_blank">
                Ver projetos
            </Link>
        </div>
    );
};

export default User;
