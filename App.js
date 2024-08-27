// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SimpleCalculator from './src/components/simplecalculator';
import HistoryScreen from './src/components/history';
import ScientificCalculator from './src/components/scientific';
import ExchangeRate from './src/components/exchangerate';
import { enableScreens } from 'react-native-screens';
import Calories from './src/components/test';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SimpleCalculator" screenOptions={{ headerShown: false,cardStyle: { backgroundColor: '#1A1A1A' } }}>
        <Stack.Screen name="SimpleCalculator" component={SimpleCalculator} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
        <Stack.Screen name="ScientificCalculator" component={ScientificCalculator} />
        <Stack.Screen name="ExchangeRate" component={ExchangeRate} />


      </Stack.Navigator>
    </NavigationContainer>
    // <Calories/>
    // <ScientificCalculator/>
  );
};

export default App;
