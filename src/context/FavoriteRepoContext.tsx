import { createContext, useState } from "react";

interface IFavoriteContextValue {
    favorites: string[];
    checkFavoriteRepo: (value: string) => void;
  }
  
  export const FavoriteRepoContext = createContext<IFavoriteContextValue>({
    favorites: [],
    checkFavoriteRepo: () => {
      // Função vazia
    },
  });

  export const FavoriteRepoProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element => {
    const key = "finder_github_repos_favorites";
    const initialFavoritesStr = localStorage.getItem(key);
    const initialFavorites: string[] = initialFavoritesStr
      ? JSON.parse(initialFavoritesStr)
      : [];
  
    const [favorites, setFavorites] = useState<string[]>(initialFavorites);
  
    const checkFavoriteRepo = (value: string) => {
      // Verifica se o usuário já está nos favoritos
      const isRepoFavorite = favorites.includes(value);
  
      if (!isRepoFavorite) {
        // Adiciona o usuário aos favoritos
        const newFavorites = [...favorites, value];
        setFavorites(newFavorites);
        localStorage.setItem(key, JSON.stringify(newFavorites));
        console.log(`Repositório adicionado aos favoritos: ${value}`);
      } else {
        // Remove o usuário dos favoritos
        const updatedFavorites = favorites.filter((user) => user !== value);
        setFavorites(updatedFavorites);
        localStorage.setItem(key, JSON.stringify(updatedFavorites));
        console.log(`Repositório removido dos favoritos: ${value}`);
      }
    };
  
    return (
      <FavoriteRepoContext.Provider value={{ favorites, checkFavoriteRepo }}>
        {children}
      </FavoriteRepoContext.Provider>
    );
  };