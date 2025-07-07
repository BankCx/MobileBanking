import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAccountInfo } from '../services/api';

const AccountSummary = ({ navigation }) => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccountInfo();
  }, []);

  const loadAccountInfo = async () => {
    try {
      const data = await getAccountInfo();
      setAccountInfo(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load account information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading account information...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Summary</Text>
      
      {accountInfo && (
        <View style={styles.accountInfo}>
          <Text style={styles.label}>Account Number:</Text>
          <Text style={styles.value}>{accountInfo.accountNumber}</Text>
          
          <Text style={styles.label}>Balance:</Text>
          <Text style={styles.value}>${accountInfo.balance.toFixed(2)}</Text>
          
          <Text style={styles.label}>Account Type:</Text>
          <Text style={styles.value}>{accountInfo.accountType}</Text>
        </View>
      )}
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Transfer')}
      >
        <Text style={styles.buttonText}>Transfer Money</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  accountInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountSummary; 