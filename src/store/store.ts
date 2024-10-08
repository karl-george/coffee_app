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
                item.prices?.map((price: any) => {
                  if (price.size == cartItem.prices[0].size) {
                    size = true;
                    price.quantity++;
                  }
                });
                if (!size) {
                  item.prices.push(cartItem.prices[0]);
                }
                item.prices.sort((a: any, b: any) => {
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
                  coffee.favorite = !coffee.favorite;
                  if (coffee.favorite) {
                    state.FavoritesList.unshift(coffee.id);
                  } else {
                    state.FavoritesList.splice(
                      state.FavoritesList.indexOf(id),
                      1,
                    );
                  }
                }
              });
            } else if (type == 'Bean') {
              state.BeanList.map((bean: any) => {
                if (bean.id == id) {
                  bean.favorite = !bean.favorite;
                  if (bean.favorite) {
                    state.FavoritesList.unshift(bean.id);
                  } else {
                    state.FavoritesList.splice(
                      state.FavoritesList.indexOf(id),
                      1,
                    );
                  }
                }
              });
            }
          }),
        ),
      incrementCartItemQuantity: (id: string, size: string) => {
        set(
          produce(state => {
            state.CartList.map((item: any) => {
              if (item.id == id) {
                item.prices.map((price: any) => {
                  if (price.size == size) {
                    price.quantity++;
                  }
                });
              }
            });
          }),
        );
      },
      decrementCartItemQuantity: (id: string, size: string) => {
        set(
          produce(state => {
            state.CartList.map((item: any) => {
              if (item.id == id) {
                item.prices.map((price: any) => {
                  if (price.size == size) {
                    if (item.prices.length > 1) {
                      if (price.quantity > 1) {
                        price.quantity--;
                      } else {
                        item.prices.splice(item.prices.indexOf(price), 1);
                      }
                    } else {
                      if (price.quantity > 1) {
                        price.quantity--;
                      } else {
                        item.splice(item.prices.indexOf(item), 1);
                      }
                    }
                  }
                });
              }
            });
          }),
        );
      },
      addToOrderHistoryList: () => {
        set(
          produce(state => {
            let temp = state.CartList.reduce((acc: number, curr: any) => {
              return acc + parseFloat(curr.ItemPrice);
            }, 0);

            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.CartList = [];
          }),
        );
      },
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
