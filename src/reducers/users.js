import * as types from '../constants/UserActionTypes'

const initialState = {
  filter: {
    age: null,
    gender: null
  },
  isLoading: false,
  list: []
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case types.RECIEVE_USERS:
      return Object.assign({}, state, { list: action.users })
    case types.SET_USER_FILTER:
      return Object.assign({}, state, { filter: {...action.filter} })
    case types.TOGGLE_LOADING:
      return Object.assign({}, state, { isLoading: action.isLoading })
    default:
      return state
  }
}

export default users
