import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

interface PriceProps {
  price: string;
  currency: string;
}

interface PaymentFooterProps {
  price: PriceProps;
  buttonPressHandler: () => void;
  buttonTitle: string;
}

const PaymentFooter = ({
  price,
  buttonPressHandler,
  buttonTitle,
}: PaymentFooterProps) => {
  return (
    <View style={styles.footer}>
      <View style={styles.priceContainer}>
        <Text style={styles.title}>Price</Text>
        <Text style={styles.priceCurrency}>
          {price.currency} <Text style={styles.priceText}>{price.price}</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFooter;

const styles = StyleSheet.create({
  footer: {},
  priceContainer: {},
  title: {},
  priceCurrency: {},
  priceText: {},
  payButton: {},
  buttonText: {},
});
