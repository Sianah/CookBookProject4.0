import React, { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);

    const addRecipe = (recipe) => {
        setRecipes(prev => [...prev, recipe]);
    };

    const deleteRecipe = (index) => {
        const newRecipes = [...recipes];
        newRecipes.splice(index, 1);
        setRecipes(newRecipes);
    };

    return (
        <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipes = () => {
    const context = useContext(RecipeContext);
    if (context === undefined) {
        throw new Error('useRecipes must be used within a RecipeProvider');
    }
    return context;
};
