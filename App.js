import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import CheckoutScreen from './src/components/CheckoutScreen';

const App = () => {
  return (
    <StripeProvider
      publishableKey="pk_test_51LtSJLGiXzKYuOYkQjOQcod5ZhxNxnsyIezQUgDHHC5BPSr1JVrOeCrBUwdG1owKJEzFjh9V9CsXtRB9RTzEtaU200Kr8oNp8P"
      urlScheme="your-url-scheme"
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}">
      <CheckoutScreen />
    </StripeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
