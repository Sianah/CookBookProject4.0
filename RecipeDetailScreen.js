import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native';

function RecipeDetailScreen({ route }) {
    const { recipe } = route.params;

    return (
        <ImageBackground source={require('./cooking.jpg')} style={styles.backgroundImage}>
        <ScrollView style={styles.container}>
        <View style={styles.contentContainer}> 
            <Text style={styles.header}>{recipe.name}</Text>
            

            <Text style={styles.ingredientsLabel}>Ingredients:</Text>
            
            {recipe.ingredients.map((ingredient, idx) => (
                <View key={idx} style={styles.ingredientBox}>
                    <Text style={styles.ingredientText}>{ingredient.name}: {ingredient.measurement} {ingredient.unit}</Text>
                </View>
           
           ))}
           <Text style={styles.details}>Description: </Text>
           <Text style={styles.details}>{recipe.details}</Text>

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
        maxHeight: '100%',  // This will limit the container height to 85% of the screen height. Adjust as needed.
        backgroundColor: '#eaeaea',
        borderRadius: 10, //rounds out border
      },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    details: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ingredientsLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ingredientBox: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    ingredientText: {
        fontSize: 16,
    },
});

export default RecipeDetailScreen;
