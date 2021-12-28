import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET,
} from '../constants/cartConstants.js'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existsItem = state.cartItems.find(
        (value) => value.product === item.product
      )

      if (existsItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((value) =>
            value.product === existsItem.product ? item : value
          ),
          // if its not the correct product, return original product
          // if it is, fins the new product to update and replace with new item
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          // if item doesn't exist already
          // returns original state and original cart items
          // adds in new item
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (val) => val.product !== action.payload
        ),
        // keeps items that doesn't match that id
        // if item with that id is found, create new array without item
      }

    case CART_SAVE_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }

    case CART_RESET:
      return {
        ...state,
        cartItems: [],
      }

    default:
      return state
  }
}
