import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const ScientificCalculator = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState('rad');

  const PI = 3.141592653589793;

  const handlePress = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    try {
        // Sanitize input: Remove unwanted Unicode characters and trim spaces
        let sanitizedInput = input
            .replace(/[\u00A0-\u9999<>\&]/g, '')  // Remove any non-standard Unicode characters
            .replace(/\s+/g, ''); // Remove whitespace

        // Replace power operator (^) with exponentiation (**)
        sanitizedInput = sanitizedInput.replace(/\^/g, '**');

        // Handle trigonometric functions and conversions
        sanitizedInput = sanitizedInput.replace(/(sin|cos|tan|asin|acos|atan|log|sqrt)\(([^)]+)\)/g, (match, func, args) => {
            // Handle trigonometric functions in degrees and convert to radians
            if (func === 'sin' || func === 'cos' || func === 'tan') {
                return `Math.${func}(${args} * Math.PI / 180)`;
            } 
            // Handle inverse trigonometric functions in radians and convert result to degrees
            else if (func === 'asin' || func === 'acos' || func === 'atan') {
                return `Math.${func}(${args}) * 180 / Math.PI`;
            } 
            // Handle logarithm
            else if (func === 'log') {
                return `Math.log10(${args})`;
            } 
            // Handle square root
            else if (func === 'sqrt') {
                return `Math.sqrt(${args})`;
            }
            // Fallback to generic math functions
            return `Math.${func}(${args})`;
        });

        // Check the sanitized input before evaluating
        console.log('Sanitized Input:', sanitizedInput);

        // Evaluate sanitized input
        const calculation = eval(sanitizedInput);

        // Update result and history
        setResult(calculation.toString());
        setHistory([...history, { expression: input, result: calculation.toString() }]);
    } catch (e) {
        setResult('Error');
        console.error('Calculation Error:', e); // Log the error for debugging
    }
};






  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handlePercentage = () => {
    try {
      setInput((prevInput) => (parseFloat(prevInput) / 100).toString());
    } catch (e) {
      setResult('Error');
    }
  };

  const handleDot = () => {
    const operators = ['+', '-', '*', '/'];
    let lastSegment = input;
    
    for (let i = input.length - 1; i >= 0; i--) {
      if (operators.includes(input[i])) {
        lastSegment = input.slice(i + 1);
        break;
      }
    }
    
    if (!lastSegment.includes('.')) {
      setInput((prevInput) => prevInput + '.');
    }
  };

  const handleScientificFunction = (name) => {
    if (input === '') return;
    setInput((prevInput) => `${name}(${prevInput})`);
};



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.navigate('SimpleCalculator')}>
          <View style={styles.cal}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#CDCDCD' }}>Calculator</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.cal}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#F63356' }}>Scientific Calculator</Text>
            <View style={{ backgroundColor: '#F63356', width: 126, height: 3 }}></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('ExchangeRate')}>
          <View style={styles.cal}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#CDCDCD' }}>Exchange Rate</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.cal}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#CDCDCD' }}>Unit Converter</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={{ height: 273, width: '100%', top: 100, position: 'absolute' }}>
        <View style={styles.display}>
          <Text style={styles.displayText}>{input}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 345, position: 'absolute', bottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#747474', alignSelf: 'center', left: 20 }}>Ans=</Text>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: 21, left: 32 }}>
          <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate('HistoryScreen', { history })}>
            <Text style={styles.historyButtonText}>⏱</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ bottom: 0, marginTop: 30, position: 'absolute', height: 459, width: '100%' }}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => handleScientificFunction('sin')}>
            <Text style={styles.buttonText2}>sin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleScientificFunction('cos')}>
            <Text style={styles.buttonText2}>cos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleScientificFunction('tan')}>
            <Text style={styles.buttonText2}>tan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleScientificFunction('asin')}>
            <Text style={styles.buttonText2}>sin⁻¹</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => handleScientificFunction('acos')}>
            <Text style={styles.buttonText2}>cos⁻¹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleScientificFunction('atan')}>
            <Text style={styles.buttonText2}>tan⁻¹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleScientificFunction('log')}>
            <Text style={styles.buttonText2}>log</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleScientificFunction('sqrt')}>
            <Text style={styles.buttonText}>√</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('Math.PI')}>
            <Text style={styles.buttonText}>π</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('^')}>
            <Text style={styles.buttonText}>^</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('(')}>
            <Text style={styles.buttonText}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress(')')}>
            <Text style={styles.buttonText}>)</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Text style={styles.buttonText1}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePercentage}>
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleBackspace}>
            <Text style={styles.buttonText1}>⌫</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('/')}>
            <Text style={styles.buttonText1}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('*')}>
            <Text style={styles.buttonText1}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('-')}>
            <Text style={styles.buttonText1}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('+')}>
            <Text style={styles.buttonText1}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('00')}>
            <Text style={styles.buttonText}>00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDot}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCalculate}>
            <Text style={styles.buttonText1}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  scroll: {
    top: 50,
    height: 30,
  },
  cal: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    left: 16,
  },
  display: {
    width: 345,
    height: 173,
    backgroundColor: '#333333',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  displayText: {
    fontSize: 36,
    fontWeight: '400',
    color: '#747474',
    alignSelf: 'flex-end',
  },
  resultText: {
    fontSize: 30,
    fontWeight: '400',
    color: '#FFFFFF',
    right: 20,
  },
  historyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F63356',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#31363F",
    shadowOffset: {
        width: 0,
        height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 5,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#747474',
  },
  buttonText2: {
    fontSize: 15,
    fontWeight: '400',
    color: '#747474',
  },
  buttonText1: {
    fontSize: 24,
    fontWeight: '400',
    color: '#F63356',
  },
  scrollContent: {
    top: 0,
    position: 'absolute',
    paddingHorizontal: 10,
  },
});

export default ScientificCalculator;
