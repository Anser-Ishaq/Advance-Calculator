import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const Calories = () => {
  const [eatenCalories, setEatenCalories] = useState(1291);
  const [remainingCalories, setRemainingCalories] = useState(826);
  const [burnedCalories, setBurnedCalories] = useState(244);
  const [carbs, setCarbs] = useState({ current: 206, total: 258 });
  const [protein, setProtein] = useState({ current: 35, total: 103 });
  const [fat, setFat] = useState({ current: 32, total: 68 });

  const MealCard = ({ meal, calories }) => (
    <View style={styles.mealCard}>
      <View style={styles.mealInfo}>
        <Text style={styles.mealTitle}>{meal}</Text>
        <Text style={styles.mealCalories}>{calories} Cal</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Today</Text>
      
      <View style={styles.caloriesContainer}>
        <View style={styles.caloriesSection}>
          <Text style={styles.caloriesNumber}>{eatenCalories}</Text>
          <Text style={styles.caloriesLabel}>Eaten</Text>
        </View>
        <View style={styles.caloriesSection}>
          <Text style={styles.caloriesNumber}>{remainingCalories}</Text>
          <Text style={styles.caloriesLabel}>Remaining</Text>
        </View>
        <View style={styles.caloriesSection}>
          <Text style={styles.caloriesNumber}>{burnedCalories}</Text>
          <Text style={styles.caloriesLabel}>Burned</Text>
        </View>
      </View>

      <View style={styles.macroContainer}>
        <View style={styles.macroBar}>
          <Text style={styles.macroLabel}>Carbs</Text>
          <Text style={styles.macroInfo}>{carbs.current} / {carbs.total} g</Text>
        </View>
        <View style={styles.macroBar}>
          <Text style={styles.macroLabel}>Protein</Text>
          <Text style={styles.macroInfo}>{protein.current} / {protein.total} g</Text>
        </View>
        <View style={styles.macroBar}>
          <Text style={styles.macroLabel}>Fat</Text>
          <Text style={styles.macroInfo}>{fat.current} / {fat.total} g</Text>
        </View>
      </View>

      <MealCard meal="Breakfast" calories="56 / 635" />
      <MealCard meal="Lunch" calories="856 / 847" />
      <MealCard meal="Dinner" calories="379 / 529" />
      <MealCard meal="Snacks" calories="0 / 106" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  caloriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  caloriesSection: {
    alignItems: 'center',
  },
  caloriesNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caloriesLabel: {
    fontSize: 16,
    color: '#888',
  },
  macroContainer: {
    width: '100%',
    marginVertical: 20,
  },
  macroBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  macroLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  macroInfo: {
    fontSize: 16,
  },
  mealCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  mealInfo: {
    flexDirection: 'column',
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealCalories: {
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    padding: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Calories;
