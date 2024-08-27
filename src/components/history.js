import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const HistoryScreen = ({ route }) => {
  const { history } = route.params|| {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.historyItem}>{item.expression} = {item.result}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top:30,
    alignSelf:'center',
    color:'#F63356'
  },
  historyItem: {
    // top:60,
    fontSize: 18,
    paddingVertical: 10,
    color:'#747474',
  },
});

export default HistoryScreen;
