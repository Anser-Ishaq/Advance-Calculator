import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const SimpleCalculator = ({navigation}) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handlePress = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    try {
      const calculation = eval(input);
      setResult(calculation.toString());
      setHistory([...history, { expression: input, result: calculation.toString() }]);
    } catch (e) {
      setResult('Error');
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
  
    // Find the last segment after the last operator
    for (let i = input.length - 1; i >= 0; i--) {
      if (operators.includes(input[i])) {
        lastSegment = input.slice(i + 1);
        break;
      }
    }
  
    // Add dot if the last segment doesn't contain a dot
    if (!lastSegment.includes('.')) {
      setInput((prevInput) => prevInput + '.');
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity>
        <View style={styles.cal}>
          <Text style={{fontSize:14,fontWeight:'500',color:'#F63356'}} >Calculator</Text>
          <View style={{backgroundColor:'#F63356',width:66,height:3,}}></View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('ScientificCalculator')}>
        <View style={styles.cal}>
          <Text style={{fontSize:14,fontWeight:'500',color:'#CDCDCD'}} >Scientific Calculator</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('ExchangeRate')}>
        <View style={styles.cal}>
          <Text style={{fontSize:14,fontWeight:'500',color:'#CDCDCD'}} >Exchange Rate</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.cal}>
          <Text style={{fontSize:14,fontWeight:'500',color:'#CDCDCD'}} >UnitConverter</Text>
        </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={{height:273,width:'100%',top:100,position:'absolute'}}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{input}</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:345,position:'absolute',bottom:10,}}>
          <Text style={{fontSize:16, fontWeight:'400',color:'#747474',alignSelf:'center',left:20,}}>Ans=</Text>
        <Text style={styles.resultText}>{result}</Text>
        </View>
      </View>
      <View style={{position:'absolute',bottom:21,left:32,}}>
      <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate('HistoryScreen', { history })}>
        <Text style={styles.historyButtonText}>⏱</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{bottom:0,marginTop:30,position:'absolute', height:459,width:'100%',}}>
      <View style={styles.buttonRow}>
      <View style={styles.shadowWrapper}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlePercentage}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBackspace}>
          <Text style={styles.buttonText}>⌫</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    // justifyContent: 'center',
    // alignItems: 'center',
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
    fontSize: 40,
    color: '#747474',
  },
  resultText: {
    fontSize: 30,
    color: '#ffff',
  
    // position:'absolute',
    // bottom:10,
    justifyContent:'flex-end',
    right:20,
    
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    
    marginHorizontal:20,
    // borderWidth:1,
    // borderColor:'blue',
    marginVertical:10,
    // shadowColor: '#EEEDEB',
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
    color: '#747474',
    fontSize: 30,
  },
  buttonText1: {
    color: '#F63356',
    fontSize: 30,
  },
  historyButton: {
    // width: '100%',
    width:42,
    height:42,  
    borderRadius: 21,
    backgroundColor: '#F63356',
    alignItems: 'center',
    justifyContent:'center',
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 10,
  },
  historyButtonText: {
    color: '#ffff',
    fontSize: 25,
  },
  cal:{
    flexDirection:'column',
    alignItems:'center',
    marginRight:20,
  },
  scroll:{
    top:50,
    left:26,
  },
  scrollContent: {
    top:0,
    position:'absolute',
    paddingHorizontal: 10, // Adds padding to the touchable area
  },
});

export default SimpleCalculator;
