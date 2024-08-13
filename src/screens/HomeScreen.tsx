import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
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
  const [searchText, setSearchText] = useState('');
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

        <Text style={styles.title}>Find the best{'\n'}coffee for you</Text>

        {/* Search Bar */}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{color: COLORS.primaryWhiteHex, paddingLeft: 12}}>
              S
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Find your coffee..."
            placeholderTextColor={COLORS.primaryLightGreyHex}
            value={searchText}
            onChangeText={text => setSearchText(text)}
            style={styles.input}
          />
        </View>

        {/* Categories Scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}>
          {categories.map((category: string, index: number) => (
            <View key={index} style={styles.viewContainer}>
              <TouchableOpacity
                onPress={() => {
                  setCategoryIndex({index, category});
                  setSortedCoffee([...getCoffeeList(category, CoffeeList)]);
                }}
                style={styles.categoryItem}>
                <Text
                  style={[
                    styles.categoryText,
                    categoryIndex.index === index && {
                      color: COLORS.primaryOrangeHex,
                    },
                  ]}>
                  {category}
                </Text>
                {categoryIndex.index === index && (
                  <View style={styles.activeCategory}></View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
  title: {
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryWhiteHex,
    fontWeight: 'semibold',
    paddingLeft: SPACING.space_30,
  },
  inputContainer: {
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    height: SPACING.space_20 * 3,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    flex: 1,
  },
  categoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  viewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  categoryItem: {
    alignItems: 'center',
  },
});

export default HomeScreen;
