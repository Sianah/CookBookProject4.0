// AddRecipeScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useRecipes } from './RecipeContext';  // Ensure the path is correct if you've moved files
import { ImageBackground } from 'react-native';


export default function AddRecipeScreen({ navigation }) {
  const { addRecipe } = useRecipes();

  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', measurement: '', unit: '' }]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', measurement: '', unit: '' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = () => {
    if (name && details && ingredients) {
      addRecipe({ name, details, ingredients });
      navigation.goBack();
    }
  };

  return (
    <ImageBackground source={require('./whisking.jpg')} style={styles.backgroundImage}>
    <ScrollView style={styles.container}>
    <View style={styles.contentContainer}> 
      <Text style={styles.label}>Recipe Name:</Text>
      <TextInput 
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Details:</Text>
      <TextInput 
        value={details}
        onChangeText={setDetails}
        style={styles.input}
        multiline
      />

      <Text style={styles.label}>Ingredients:</Text>
      {ingredients.map((ingredient, idx) => (
        <View key={idx} style={styles.ingredientContainer}>
          <TextInput 
            value={ingredient.name}
            onChangeText={(value) => handleIngredientChange(idx, 'name', value)}
            style={styles.ingredientInput}
            placeholder="Ingredient"
          />
          <TextInput 
            value={ingredient.measurement}
            onChangeText={(value) => handleIngredientChange(idx, 'measurement', value)}
            style={styles.ingredientInput}
            placeholder="Amount"
            keyboardType="numeric"
          />
          <TextInput 
            value={ingredient.unit}
            onChangeText={(value) => handleIngredientChange(idx, 'unit', value)}
            style={styles.ingredientInput}
            placeholder="Unit"
          />
        </View>
      ))}
      <Button title="Add another ingredient" onPress={handleAddIngredient} />

      <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {  // New style for the ImageBackground
    flex: 1,
    resizeMode: "cover",
  },
  scrollContainer: { 
    flex: 1,
  },
  contentContainer: {
    padding: 15,   // Reduced from 20
    margin: 20,   // Added margin to move the container inward from screen edges
    maxHeight: '95%',  // This will limit the container height to 85% of the screen height. Adjust as needed.
    backgroundColor: '#ffffff',
    borderRadius: 10, //rounds out border
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  ingredientInput: {
    width: '30%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
});

