import React from 'react';
import { ScrollView, Text, View, Button, StyleSheet } from 'react-native';
import { useRecipes } from './RecipeContext';  // Ensure path is correct

function HomeScreen({ navigation }) {
  const { recipes, deleteRecipe } = useRecipes();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Recipe List</Text>
      {recipes.map((recipe, index) => (
        <View key={index} style={styles.recipeCard}>
          <View style={styles.recipeContent}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <Text style={styles.recipeDetail}>{recipe.details}</Text>
            {recipe.ingredients.map((ingredient, idx) => (
              <View key={idx} style={styles.ingredientRow}>
                <Text>{ingredient.name}: {ingredient.measurement} {ingredient.unit}</Text>
              </View>
            ))}
          </View>
          <Button title="Delete" color="red" onPress={() => deleteRecipe(index)} style={styles.deleteButton} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  recipeContent: {
    flex: 1,
  },
  recipeName: {
    fontSize: 18,
    marginBottom: 5,
  },
  recipeDetail: {
    fontSize: 14,
    marginBottom: 10,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default HomeScreen;

