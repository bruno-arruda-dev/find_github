import { createContext, useState } from "react";

interface IFavoriteContextValue {
  favorites: string[];
  checkFavoriteUser: (value: string) => void;
}

export const FavoriteUserContext = createContext<IFavoriteContextValue>({
  favorites: [],
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

  const [favorites, setFavorites] = useState<string[]>(initialFavorites);

  const checkFavoriteUser = (value: string) => {
    // Verifica se o usuário já está nos favoritos
    const isUserFavorite = favorites.includes(value);

    if (!isUserFavorite) {
      // Adiciona o usuário aos favoritos
      const newFavorites = [...favorites, value];
      setFavorites(newFavorites);
      localStorage.setItem(key, JSON.stringify(newFavorites));
      console.log(`Usuário adicionado aos favoritos: ${value}`);
    } else {
      // Remove o usuário dos favoritos
      const updatedFavorites = favorites.filter((user) => user !== value);
      setFavorites(updatedFavorites);
      localStorage.setItem(key, JSON.stringify(updatedFavorites));
      console.log(`Usuário removido dos favoritos: ${value}`);
    }
  };

  return (
    <FavoriteUserContext.Provider value={{ favorites, checkFavoriteUser }}>
      {children}
    </FavoriteUserContext.Provider>
  );
};