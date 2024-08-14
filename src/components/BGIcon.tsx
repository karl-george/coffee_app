import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, SPACING} from '../theme/theme';

interface BGIconProps {
  name?: string;
  color: string;
  size?: number;
  BGColor: string;
}

const BGIcon = ({name, color, size, BGColor}: BGIconProps) => {
  return (
    <View style={[styles.iconBG, {backgroundColor: BGColor}]}>
      <View>
        <Text style={{fontSize: 20, color}}>+</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconBG: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_8,
  },
});

export default BGIcon;
