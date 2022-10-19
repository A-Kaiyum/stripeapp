import {useStripe} from '@stripe/stripe-react-native';
import {useEffect, useState} from 'react';
import React from 'react';
import {Alert, Button, View} from 'react-native';
import axios from 'axios';

export default function CheckoutScreen() {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      // Authorization: `Bearer ${userToken}`,
      enctype: 'multipart/form-data',
    },
  };
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    let result = await axios
      .post(
        `http://192.168.0.102/stripe-backend/public/api/make-payment-mobile`,
        axiosConfig,
      )
      .then(res => {
        return res.data;
      });
    return result;
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentSheetParams();
    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      merchantDisplayName: 'TFP',
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View>
      <Button
        variant="primary"
        disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </View>
  );
}
