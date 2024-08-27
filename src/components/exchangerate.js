import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';

const ExchangeRate = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [exchangeRate, setExchangeRate] = useState(null);

    const inputRef = useRef(null);

    useEffect(() => {
        fetchCurrencies();
    }, []);

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            fetchExchangeRate(fromCurrency, toCurrency);
        }
    }, [fromCurrency, toCurrency]);

    const fetchCurrencies = async () => {
        try {
            const response = await axios.get('https://open.er-api.com/v6/latest/USD');
            const currencyData = Object.keys(response.data.rates).map((key) => ({
                label: key,
                value: key,
            }));
            setCurrencies(currencyData);
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    };
        const addToHistory = (amount, convertedAmount) => {
        setHistory((prevHistory) => [
            ...prevHistory,
            `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
        ]);
    };

    const fetchExchangeRate = async (from, to) => {
        try {
            const response = await axios.get(`https://open.er-api.com/v6/latest/${from}`);
            setExchangeRate(response.data.rates[to]);
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    const handleAmountChange = (text) => {
        setAmount(text);
        if (exchangeRate) {
            const converted = parseFloat(text) * exchangeRate;
            setConvertedAmount(converted.toFixed(2));
        }
    };

    const handlePress = (value) => {
        setAmount((prevAmount) => {
            const newAmount = prevAmount + value;
            handleAmountChange(newAmount);
            return newAmount;
        });
    };



    const handleClear = () => {
        setAmount('');
        setConvertedAmount('');
    };

    const handleBackspace = () => {
        setAmount((prevAmount) => {
            const newAmount = prevAmount.slice(0, -1);
            handleAmountChange(newAmount);
            return newAmount;
        });
    };


    const handleDot = () => {
        if (!amount.includes('.')) {
            handlePress('.');
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity onPress={() => navigation.navigate('SimpleCalculator')}>
                    <View style={styles.cal}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#CDCDCD' }} >Calculator</Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ScientificCalculator')}>
                    <View style={styles.cal}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#CDCDCD' }} >Scientific Calculator</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.cal}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#F63356' }} >Exchange Rate</Text>
                        <View style={{ backgroundColor: '#F63356', width: 95, height: 3, }}></View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.cal}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#CDCDCD' }} >UnitConverter</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <View style={{ top: 110, alignSelf: 'center', position: 'absolute', width: '80%', }}>

                <View style={styles.pickerContainer}>
                    <View style={styles.pickerWrapper}>
                        <RNPickerSelect
                            placeholder={{ label: 'From Currency...', value: null }}
                            items={currencies}
                            onValueChange={(value) => setFromCurrency(value)}
                            style={pickerSelectStyles}
                            value={fromCurrency}

                        />
                    </View>
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        placeholder="Enter amount"
                        placeholderTextColor={'#747474'}
                        onChangeText={handleAmountChange}
                        value={amount}
                        editable={false} />
                </View>
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerWrapper}>
                        <RNPickerSelect
                            placeholder={{ label: 'To Currency...', value: null }}
                            items={currencies}
                            onValueChange={(value) => setToCurrency(value)}
                            style={pickerSelectStyles}
                            value={toCurrency}
                        />
                    </View>
                    <TextInput  readOnly placeholder='Converted Amount' placeholderTextColor={'#747474'} style={styles.convertedAmount}>
                        {convertedAmount ? `${convertedAmount} ${toCurrency}` :'' }
                    </TextInput>
                </View>
                <Text style={{fontSize:14,fontWeight:'400',color:'#363636'}}>
                *Exchange rates are as per the 
                moneyexchange.com
                </Text>
            </View>
            <View style={{ bottom: 0, position: 'absolute',paddingTop:50, height: 420, width: '100%',
   
        }}>

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
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HistoryScreen', { history })}>
                        <Text style={styles.buttonText1}>⏱</Text>
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
                    <TouchableOpacity style={styles.button} onPress={handleClear}>
                        <Text style={styles.buttonText1}>C</Text>
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
                    <TouchableOpacity style={styles.button} onPress={handleBackspace}>
                        <Text style={styles.buttonText1}>⌫</Text>
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
    // input: {
    //     height: 40,
    //     width: 170,
    //     backgroundColor: 'white',
    //     // right:0,
    //     top: 14,
    // },

    buttonRow: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginVertical: 5,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',

        marginHorizontal: 20,
        // borderWidth:1,
        // borderColor:'blue',
        marginVertical: 10,
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
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#F63356',
        alignItems: 'center',
        justifyContent: 'center',
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
    cal: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 20,
    },
    scroll: {
        top: 50,
        left: 26,
    },
    scrollContent: {
        top: 0,
        position: 'absolute',
        paddingHorizontal: 10, // Adds padding to the touchable area
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        height: 66,
        width: 325,
        borderRadius:10,
        justifyContent: 'space-between',
        backgroundColor: '#333'
    },
    pickerWrapper: {
        // flex: 1,
        width: '40%',
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        // backgroundColor: '#fff',
        // borderColor: '#ddd',
        // borderWidth: 1,
        borderRadius: 5,
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        paddingHorizontal: 10,
    },
    convertedAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
        flex: 1,
    },
    iconContainer: {
        position: 'absolute',
        top: 15, // Adjust vertical position
        right: 12, // Adjust horizontal position
    },


});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 50,
        // backgroundColor: '#fff',
        // borderColor: '#ddd',
        // borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: 'white',
        paddingRight: 30,
    },
    inputAndroid: {
        height: 50,
        // backgroundColor: '#fff',
        // borderColor: '#ddd',
        // borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: 'white',
        paddingRight: 30,
    },

});
export default ExchangeRate;
