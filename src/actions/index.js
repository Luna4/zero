import * as types from '../constants/UserActionTypes'

export const recieveUsers = users => ({
  type: types.RECIEVE_USERS,
  users
})

export const setUserFilter = filter => ({
  type: types.SET_USER_FILTER,
  filter
})

export const toggleLoading = isLoading => ({
  type: types.TOGGLE_LOADING,
  isLoading
})
