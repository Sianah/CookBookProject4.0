import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

function RecipeDetailScreen({ route }) {
    const { recipe } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>{recipe.name}</Text>
            <Text style={styles.details}>Description: {recipe.details}</Text>

            <Text style={styles.ingredientsLabel}>Ingredients:</Text>
            
            {recipe.ingredients.map((ingredient, idx) => (
                <View key={idx} style={styles.ingredientBox}>
                    <Text style={styles.ingredientText}>{ingredient.name}: {ingredient.measurement} {ingredient.unit}</Text>
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
