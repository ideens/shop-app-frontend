import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
} from '../constants/productConstants'

// Notes
// Create a "reducer" function that determines what the new state
// should be when something happens in the app

// Reducers usually look at the type of action that happened
// to decide how to update the state

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    // Do something here based on the different types of actions
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    // set products to initial state

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    //return back a payload of data - what we get from the api call

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
    // If this reducer doesn't recognize the action type, or doesn't
    // care about this specific action, return the existing state unchanged
  }
}

export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true, ...state }

    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload }

    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }

    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }

    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }

    case PRODUCT_CREATE_RESET:
      return {}

    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }

    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case PRODUCT_UPDATE_RESET:
      return { product: {} }

    default:
      return state
  }
}

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }

    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }

    case PRODUCT_CREATE_REVIEW_RESET:
      return {}

    default:
      return state
  }
}