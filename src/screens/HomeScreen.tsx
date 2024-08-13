import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';

/**
 * Generates an array of categories based on the data provided.
 *
 * @param {any[]} data - The data to generate categories from.
 * @return {string[]} An array of categories, with 'All' at the beginning.
 */

const getCategoriesFromData = (data: any) => {
  let temp: any = {};

  data.map((item: any) => {
    temp[item.name] = temp[item.name] ? temp[item.name] + 1 : 1;
  });

  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

/**
 * Filters a list of coffee items based on a given category.
 *
 * @param {string} category - The category to filter by.
 * @param {Array<any>} data - The list of coffee items to filter.
 * @return {Array<any>} - The filtered list of coffee items.
 */
const getCoffeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    return data.filter((item: any) => item.name === category);
  }
};

const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState(undefined);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* Header */}
        <HeaderBar />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
});

export default HomeScreen;
