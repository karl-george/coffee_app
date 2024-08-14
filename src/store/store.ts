import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            let found = false;
            state.CartList.map((item: any) => {
              if (item.id == cartItem.id) {
                found = true;
                let size = false;
                state.CartList.prices.map((price: any) => {
                  if (price.size == cartItem.prices[0].size) {
                    size = true;
                    price.quantity++;
                  }
                });
                if (!size) {
                  item.prices.push(cartItem.prices[0]);
                }
                item.price.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
              }
            });
            if (!found) {
              state.CartList.push(cartItem);
            }
          }),
        ),
      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalPrice = 0;

            state.CartList.map((item: any) => {
              let tempPrice = 0;

              item.prices.map((price: any) => {
                tempPrice += parseFloat(price.price) * price.quantity;
              });
              item.ItemPrice = tempPrice.toFixed(2).toString();
              totalPrice += tempPrice;
            });
            state.CartPrice = totalPrice.toFixed(2).toString();
          }),
        ),
      addToFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type == 'Coffee') {
              state.CoffeeList.map((coffee: any) => {
                if (coffee.id == id) {
                  coffee.favourite = !coffee.favourite;
                  state.FavoritesList.unshift(coffee.id);
                }
              });
            } else if (type == 'Bean') {
              state.BeanList.map((bean: any) => {
                if (bean.id == id) {
                  bean.favourite = !bean.favourite;
                  state.FavoritesList.unshift(bean.id);
                }
              });
            }
          }),
        ),
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
