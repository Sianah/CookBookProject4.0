import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import HomeScreen from './HomeScreen';
import AddRecipeScreen from './AddRecipeScreen';
import CalendarScreen from './CalendarScreen';
import RecipeDetailScreen from './RecipeDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Home',
          headerRight: () => (
            <Button 
              title="Add New Recipe" 
              onPress={() => navigation.navigate('AddRecipe')} 
            />
          ),
          headerLeft: () => (
            <Button 
              title="View Calendar" 
              onPress={() => navigation.navigate('Calendar')} 
            />
          )
        })}
      />
      <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Recipe Details' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

