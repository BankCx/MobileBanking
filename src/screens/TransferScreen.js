import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import api from '../services/api';

const TransferScreen = () => {
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');

  // Intentionally vulnerable - no input validation, no authentication check
  const handleTransfer = async () => {
    try {
      // Intentionally vulnerable - leaking sensitive info in alert
      const response = await api.transferFunds(toAccount, amount);
      Alert.alert('Transfer Success', JSON.stringify(response));
    } catch (err) {
      // Intentionally vulnerable - exposing error details
      Alert.alert('Transfer Failed', err.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Transfer Funds</Text>
      <TextInput
        placeholder="To Account"
        value={toAccount}
        onChangeText={setToAccount}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
      />
      <Button title="Transfer" onPress={handleTransfer} />
    </View>
  );
};

export default TransferScreen; 