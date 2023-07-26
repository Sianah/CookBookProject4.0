import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Load recipes when the app starts
        const loadRecipes = async () => {
            try {
                const savedRecipes = await AsyncStorage.getItem('recipes');
                if (savedRecipes) {
                    setRecipes(JSON.parse(savedRecipes));
                }
            } catch (error) {
                console.error("Failed to load the recipes.", error);
            }
        };

        loadRecipes();
    }, []);

    useEffect(() => {
        // Save recipes whenever they change
        const saveRecipes = async () => {
            try {
                await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
            } catch (error) {
                console.error("Failed to save the recipes.", error);
            }
        };

        saveRecipes();
    }, [recipes]);

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





