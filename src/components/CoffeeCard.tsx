import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import BGIcon from './BGIcon';

interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  roasted: string;
  image?: string;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
}

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const CoffeeCard = ({
  id,
  index,
  type,
  roasted,
  image,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}: CoffeeCardProps) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.linearGradient}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground src={image} style={styles.cardImg} resizeMode="cover">
        <View style={styles.cardRatingContainer}>
          <Text style={styles.ratingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardSubtitle}>{special_ingredient}</Text>
      <View style={styles.footerRow}>
        <Text style={styles.currency}>
          $ <Text style={{color: COLORS.primaryWhiteHex}}>{price.price}</Text>
        </Text>
        <TouchableOpacity onPress={buttonPressHandler}>
          <BGIcon
            name="add"
            color={COLORS.primaryWhiteHex}
            BGColor={COLORS.primaryOrangeHex}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardImg: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  cardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  ratingText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  cardTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
    fontWeight: 'semibold',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.space_15,
  },
  currency: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
    fontWeight: 'semibold',
  },
});

export default CoffeeCard;
