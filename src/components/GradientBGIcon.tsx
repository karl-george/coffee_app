import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface GradientBGIconProps {
  name: string;
  color: string;
  size: number;
}

const GradientBGIcon = ({name, color, size}: GradientBGIconProps) => {
  return (
    <View>
      <Text>GradientBGIcon</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default GradientBGIcon;
