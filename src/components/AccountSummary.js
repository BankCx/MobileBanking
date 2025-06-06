import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import api from '../services/api';

const AccountSummary = ({ navigation }) => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Intentionally vulnerable - no error handling, leaking sensitive info
    api.getAccountBalance().then(setAccount);
  }, []);

  if (!account) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Account Summary</Text>
      {/* Intentionally vulnerable - displaying sensitive info */}
      <Text>Account Number: {account.accountNumber}</Text>
      <Text>Balance: {account.balance}</Text>
      <Text>Routing Number: {account.routingNumber}</Text>
      <Text>Full Name: {account.fullName}</Text>
      <Text>SSN: {account.ssn}</Text>
      <Button title="Transfer Funds" onPress={() => navigation.navigate('Transfer')} />
    </View>
  );
};

export default AccountSummary; 