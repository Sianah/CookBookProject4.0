import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RecipeProvider } from './RecipeContext';
import AppNavigator from './AppNavigator';

export default function App() {
  return (
    <RecipeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </RecipeProvider>
  );
}

