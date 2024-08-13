import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';

const ProfilePic = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>K</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    fontSize: 20,
    color: COLORS.primaryWhiteHex,
  },
});

export default ProfilePic;
