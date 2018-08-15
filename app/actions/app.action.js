import {AsyncStorage} from "react-native";

const INIT_APP = 'app/INIT_APP'
const CHECK_FIRST_TIME = 'app/CHECK_FIRST_TIME'
const SKIP_TUTORIAL = 'app/SKIP_TUTORIAL'

const INITIAL_STATE = {
  initApp: false,
  lang: null,
  isFirstTime: null,
}

export default function appReducer(state = INITIAL_STATE, action){
  switch (action.type) {
    case INIT_APP:
      return {
        ...state,
        initApp: true,
      }
    case CHECK_FIRST_TIME:
      return {
        ...state,
        isFirstTime: action.payload,
      }
    case SKIP_TUTORIAL:
      return {
        ...state,
        isFirstTime: false,
      }
    default:
      return state
  }
}

export const initApp = () => ({
  type: INIT_APP,
})

const checkFirstTime = payload => ({
  type: CHECK_FIRST_TIME,
  payload,
})

const tutorial = () => ({
  type: SKIP_TUTORIAL,
})

export const firstTime = () => async (dispatch) => {
  AsyncStorage.getItem('FirstTime')
    .then(isFirstTime => {
      if (isFirstTime !== null) {
        dispatch(checkFirstTime(false))
      } else {
        dispatch(checkFirstTime(true))
      }
    })
}

export const skipTutorial = () => async (dispatch) => {
  AsyncStorage.setItem('FirstTime', 'false')
  dispatch(tutorial())
}