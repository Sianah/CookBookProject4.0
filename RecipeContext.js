import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  const deleteRecipe = (index) => {
    const newRecipes = [...recipes];
    newRecipes.splice(index, 1);
    setRecipes(newRecipes);
    saveRecipesToStorage(newRecipes);
  };

  const addRecipe = (recipe) => {
    const newRecipes = [...recipes, recipe];
    setRecipes(newRecipes);
    saveRecipesToStorage(newRecipes);
  };

  const saveRecipesToStorage = async (recipes) => {
    try {
      await AsyncStorage.setItem('@recipes', JSON.stringify(recipes));
    } catch (error) {
      console.error("Couldn't save recipes.", error);
    }
  };

  const loadRecipesFromStorage = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem('@recipes');
      if (storedRecipes !== null) {
        setRecipes(JSON.parse(storedRecipes));
      }
    } catch (error) {
      console.error("Couldn't load recipes.", error);
    }
  };

  useEffect(() => {
    loadRecipesFromStorage();
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };

