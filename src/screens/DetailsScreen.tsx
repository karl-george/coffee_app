import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../store/store';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({navigation, route}: any) => {
  const itemOfIndex = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(itemOfIndex.prices[0]);

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);

  const backHandler = () => {
    navigation.goBack();
  };

  const toggleFavorite = (type: string, id: string) => {
    addToFavoriteList(type, id);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <ImageBackgroundInfo
          enableBackHandler={true}
          imageLink="https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          type={route.params.type}
          id={itemOfIndex.id}
          favorite={itemOfIndex.favorite}
          name={itemOfIndex.name}
          special_ingredient={itemOfIndex.special_ingredient}
          ingredients={itemOfIndex.ingredients}
          average_rating={itemOfIndex.average_rating}
          ratings_count={itemOfIndex.ratings_count}
          roasted={itemOfIndex.roasted}
          backHandler={backHandler}
          toggleFavorite={toggleFavorite}
        />

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Description</Text>
          {fullDesc ? (
            <TouchableOpacity onPress={() => setFullDesc(prev => !prev)}>
              <Text style={styles.descText}>{itemOfIndex.description}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setFullDesc(prev => !prev)}>
              <Text numberOfLines={3} style={styles.descText}>
                {itemOfIndex.description}
              </Text>
            </TouchableOpacity>
          )}

          <Text style={styles.footerTitle}>Size</Text>
          <View style={styles.sizeContainer}>
            {itemOfIndex.prices.map((item: any) => (
              <TouchableOpacity
                onPress={() => setPrice(item)}
                key={item.size}
                style={[
                  styles.sizeBox,
                  {
                    borderColor:
                      item.size == price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}>
                <Text
                  style={[
                    styles.sizeText,
                    {
                      fontSize:
                        itemOfIndex.type == 'bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        item.size == price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex,
                    },
                  ]}>
                  {item.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonPressHandler={() => {}}
          buttonTitle="Add to Cart"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  footer: {
    padding: SPACING.space_30,
  },
  footerTitle: {
    fontWeight: 'semibold',
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  descText: {
    letterSpacing: 0.5,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  sizeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  sizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  sizeText: {},
});

export default DetailsScreen;
