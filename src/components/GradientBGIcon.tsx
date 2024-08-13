import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SPACING} from '../theme/theme';

interface GradientBGIconProps {
  name: string;
  color: string;
  size: number;
}

const GradientBGIcon = ({name, color, size}: GradientBGIconProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.linearGradientBG}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
        <View style={styles.icon}>
          <Text
            style={{
              color: 'white',
            }}>
            T
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.secondaryGreyHex,
    borderRadius: SPACING.space_12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden',
  },
  linearGradientBG: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: COLORS.primaryGreyHex,
  },
});

export default GradientBGIcon;
