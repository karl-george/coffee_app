import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';

interface Props {
  enableBackHandler: boolean;
  imageLink: string;
  type: string;
  id: string;
  favorite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  backHandler?: () => void;
  toggleFavorite: (type: string, id: string) => void;
}

const ImageBackgroundInfo = ({
  enableBackHandler,
  imageLink,
  type,
  id,
  favorite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  backHandler,
  toggleFavorite,
}: Props) => {
  return (
    <View>
      <ImageBackground src={imageLink} style={styles.image} resizeMode="cover">
        {enableBackHandler ? (
          <View style={styles.headerBarWithBack}>
            <TouchableOpacity onPress={backHandler}>
              <Text style={{color: COLORS.primaryLightGreyHex, fontSize: 20}}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavorite(type, id)}>
              <Text
                style={{
                  color: favorite
                    ? COLORS.primaryRedHex
                    : COLORS.primaryLightGreyHex,
                  fontSize: 20,
                }}>
                Like
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => toggleFavorite(type, id)}>
              <Text
                style={{
                  color: favorite
                    ? COLORS.primaryRedHex
                    : COLORS.primaryLightGreyHex,
                  fontSize: 20,
                }}>
                Like
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.footerContainer}>
          <View style={styles.footerInner}>
            <View style={styles.containerRow}>
              <View>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>{special_ingredient}</Text>
              </View>
              <View style={styles.itemProps}>
                <View style={styles.propertyFirst}>
                  <Text style={{color: COLORS.primaryOrangeHex}}>{type}</Text>
                </View>
              </View>
            </View>

            <View style={styles.containerRow}>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{average_rating}</Text>
                <Text style={styles.ratingCount}>({ratings_count})</Text>
              </View>
              <View style={styles.roastedContainer}>
                <Text style={styles.roastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBarWithBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBar: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  footerContainer: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_30,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
  },
  footerInner: {
    justifyContent: 'space-between',
    gap: SPACING.space_15,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'semibold',
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  subtitle: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  itemProps: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_20,
  },
  propertyFirst: {
    height: 55,
    width: 55,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: 'semibold',
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  ratingCount: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  roastedContainer: {
    height: 55,
    width: 55 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  roastedText: {
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
});

export default ImageBackgroundInfo;
