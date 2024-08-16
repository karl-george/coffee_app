import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';

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
      <TouchableOpacity
        style={styles.payButton}
        onPress={() => buttonPressHandler()}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFooter;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.space_20,
    padding: SPACING.space_20,
  },
  priceContainer: {
    alignItems: 'center',
    width: 100,
  },
  title: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  priceCurrency: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryOrangeHex,
  },
  priceText: {
    color: COLORS.primaryWhiteHex,
  },
  payButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 1.8,
    borderRadius: BORDERRADIUS.radius_20,
  },
  buttonText: {
    fontWeight: 'semibold',
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});
