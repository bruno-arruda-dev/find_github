import { createContext, useState } from "react";

interface IFavoriteContextValue {
  favoritesUsers: string[];
  checkFavoriteUser: (value: string) => void;
}

export const FavoriteUserContext = createContext<IFavoriteContextValue>({
  favoritesUsers: [],
  checkFavoriteUser: () => {
    // Função vazia
  },
});

export const FavoriteUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const key = "finder_github_users_favorites";
  const initialFavoritesStr = localStorage.getItem(key);
  const initialFavorites: string[] = initialFavoritesStr
    ? JSON.parse(initialFavoritesStr)
    : [];

  const [favoritesUsers, setFavorites] = useState<string[]>(initialFavorites);

  const checkFavoriteUser = (value: string) => {
    // Verifica se o usuário já está nos favoritos
    const isUserFavorite = favoritesUsers.includes(value);

    if (!isUserFavorite) {
      // Adiciona o usuário aos favoritos
      const newFavorites = [...favoritesUsers, value];
      setFavorites(newFavorites);
      localStorage.setItem(key, JSON.stringify(newFavorites));
      console.log(`Usuário adicionado aos favoritos: ${value}`);
    } else {
      // Remove o usuário dos favoritos
      const updatedFavorites = favoritesUsers.filter((user) => user !== value);
      setFavorites(updatedFavorites);
      localStorage.setItem(key, JSON.stringify(updatedFavorites));
      console.log(`Usuário removido dos favoritos: ${value}`);
    }
  };

  return (
    <FavoriteUserContext.Provider value={{ favoritesUsers, checkFavoriteUser }}>
      {children}
    </FavoriteUserContext.Provider>
  );
};