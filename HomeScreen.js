import React from 'react';
import { ScrollView, Text, View, Button, StyleSheet } from 'react-native';
import { useRecipes } from './RecipeContext';

function HomeScreen({ navigation }) {
  const { recipes, deleteRecipe } = useRecipes();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Recipe List</Text>
      {recipes.map((recipe, index) => (
        <View key={index} style={styles.recipeCard}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Button title="Delete" onPress={() => deleteRecipe(index)} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#eaeaea',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  recipeName: {
    fontSize: 18,
  },
});

export default HomeScreen;
