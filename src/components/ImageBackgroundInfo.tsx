import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '../theme/theme';

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
  toggleFavorite: () => void;
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
            <TouchableOpacity>
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
            <TouchableOpacity>
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
});

export default ImageBackgroundInfo;
