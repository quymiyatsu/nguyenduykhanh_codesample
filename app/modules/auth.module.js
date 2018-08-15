import firebase from "react-native-firebase"
import FBSDK from "react-native-fbsdk"


import { Record, Map } from "immutable"
import { handleActions, createAction } from "redux-actions"

import * as TokenStore from '../utils/tokenStore'
import Api from '../utils/api'
import { fetchSingleProfile } from './profile.module'

const CHECK_USER_LOGIN = 'auth/CHECK_USER_LOGIN'
const checkUserLogin = createAction(CHECK_USER_LOGIN)

const LOG_IN_USER_REQUEST = 'auth/LOG_IN_USER_REQUEST'
const LOG_OUT_USER_REQUEST = 'auth/LOG_OUT_USER_REQUEST'
const CREATE_USER_REQUEST = 'auth/CREATE_USER_REQUEST'
const logInUserRequest = createAction(LOG_IN_USER_REQUEST)
const logOutUserRequest = createAction(LOG_OUT_USER_REQUEST)
const createUserRequest = createAction(CREATE_USER_REQUEST)

const LOG_IN_USER_RESPONSE = 'auth/LOG_IN_USER_RESPONSE'
const LOG_OUT_USER_RESPONSE = 'auth/LOG_OUT_USER_RESPONSE'
const CREATE_USER_RESPONSE = 'auth/CREATE_USER_RESPONSE'
const SEND_EMAIL_VERIFY_RESPONSE = 'auth/SEND_EMAIL_VERIFY_RESPONSE'

const logInUserResponse = createAction(LOG_IN_USER_RESPONSE)
const logOutUserResponse = createAction(LOG_OUT_USER_RESPONSE)
const createUserResponse = createAction(CREATE_USER_RESPONSE)
const sendEmailVerifyResponse = createAction(SEND_EMAIL_VERIFY_RESPONSE)

const GET_USER_TOKEN = 'auth/GET_ID_TOKEN'
const getUserTokenResponse = createAction(GET_USER_TOKEN)

const RESET_PASSWORD_REQUEST = 'auth/RESET_PASSWORD_REQUEST'
const RESET_PASSWORD_RESPONSE = 'auth/RESET_PASSWORD_RESPONSE'
const resetPasswordRequest = createAction(RESET_PASSWORD_REQUEST)
const resetPasswordResponse = createAction(RESET_PASSWORD_RESPONSE)

const CHANGE_PASSWORD_REQUEST = 'auth/CHANGE_PASSWORD_REQUEST'
const CHANGE_PASSWORD_RESPONSE = 'auth/CHANGE_PASSWORD_RESPONSE'
const changePasswordRequest = createAction(CHANGE_PASSWORD_REQUEST)
const changePasswordResponse = createAction(CHANGE_PASSWORD_RESPONSE)

const GET_ACCESS_TOKEN_API_RESPONSE = 'auth/GET_ACCESS_TOKEN_API_RESPONSE'
const getAccessTokenApiResponse = createAction(GET_ACCESS_TOKEN_API_RESPONSE)


const GET_TYPE_OF_LOGIN = 'auth/GET_TYPE_OF_LOGIN'
const getTypeOfLogin = createAction(GET_TYPE_OF_LOGIN)

const { LoginManager, AccessToken } = FBSDK

const auth = firebase.auth()

const authenRecord = new Record({
  isUserLogin: false,
  isLogin: false,
  isLoginSuccess: false,
  isLogout: true,
  isCreateUser: false,
  isSendEmail: false,
  isResetPassword: false,
  isChangePassword: false,
  resetPasswordResponse: null,
  changePasswordResponse: null,
  userInfo: Map(),
  token: null,
  isError: false,
  accessTokenApi: Map(),
  typeOfLogin: null,
})

const initialState = authenRecord()


/**
|--------------------------------------------------
| getServerAccessToken
|--------------------------------------------------
*/

const getServerAccessToken = (token, dispatch) => {
  return Api.getServerAccessToken(token)
    .then(response => {
      dispatch(fetchSingleProfile(response.access_token))

      TokenStore.saveApiToken(response.access_token)
      dispatch(getAccessTokenApiResponse(response.access_token))
    })
    .catch(err => dispatch(getUserTokenResponse(err)))
}

/**
|--------------------------------------------------
| CHECK USER LOGIN
|--------------------------------------------------
*/

export const checkIfUserLogin = () => dispatch => {
  auth.onAuthStateChanged(async user => {
    if (user === null) {
      dispatch(checkUserLogin(false))
      return
    }
    dispatch(getTypeOfLogin(auth.currentUser.providerData))
    const accessTokenObj = await TokenStore.loadApiToken()
    if (accessTokenObj) {
      dispatch(getAccessTokenApiResponse(accessTokenObj))
    }

    dispatch(checkUserLogin(true))
  })
}


/**
|--------------------------------------------------
| LOG USER OUT
|--------------------------------------------------
*/
export const logout = () => dispatch => {
  dispatch(logOutUserRequest())
  auth
    .signOut()
    .then(data => {
        TokenStore.destroyApiToken()
        dispatch(logOutUserResponse(data))
    })
    .catch(err => logOutUserResponse(err))
}


/**
|--------------------------------------------------
| Log user in with email and password
|--------------------------------------------------
*/
export const logInWithEmailPassword = (email, password) => dispatch => {
  dispatch(logInUserRequest())
  auth
    .signInAndRetrieveDataWithEmailAndPassword(email, password)
    .then(user => {
      auth.currentUser
        .getIdToken()
        .then(token => {
         getServerAccessToken(token, dispatch)
          // dispatch(getAccessTokenApiResponse(token))
          dispatch(logInUserResponse(user))
        })
        .catch(err => getUserTokenResponse(err))
    })
    .catch(error => dispatch(logInUserResponse(error)))
}

/**
  |--------------------------------------------------
  | Log user in with facebook
  |--------------------------------------------------
*/

export const logInWithFacebook = () => dispatch => {
  dispatch(logInUserRequest())
  LoginManager.logInWithReadPermissions(["public_profile"]).then(result => {
    if (result.isCancelled) {
      // alert('Login cancelled')
    }
    AccessToken.getCurrentAccessToken().then(data => {
      auth
        .signInAndRetrieveDataWithCredential(
          firebase.auth.FacebookAuthProvider.credential(data.accessToken)
        )
        .then(user => {
          auth.currentUser
            .getIdToken()
            .then(token => {
              getServerAccessToken(token, dispatch)
              //dispatch(getAccessTokenApiResponse(token))
              dispatch(logInUserResponse(user))
            })
            .catch(err => getUserTokenResponse(err))
        })
    })
    .catch(err => dispatch(logInUserResponse(err)))
  })
  .catch(error => dispatch(logInUserResponse(error)))
}
/**
|--------------------------------------------------
| Create User
|--------------------------------------------------
*/
export const createUserWithEmailPassword = (email, password) => dispatch => {
 
  const db = firebase.database()
 
  dispatch(createUserRequest())
  auth
    .createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then(user => {
      auth.currentUser
        .getIdToken()
        .then(token => {
         getServerAccessToken(token, dispatch)
          // dispatch(getAccessTokenApiResponse(token))
          dispatch(logInUserResponse(user))
        })
        .catch(err => getUserTokenResponse(err))

        
      auth.currentUser
        .sendEmailVerification()
        .then(() => {
          dispatch(sendEmailVerifyResponse(true))
        })
        .catch(err => sendEmailVerifyResponse(err))
      dispatch(createUserResponse(user))
    
    })
    .catch(error => dispatch(createUserResponse(error)))
}


/**
|--------------------------------------------------
| RESET USER PASSWORD
|--------------------------------------------------
*/
export const resetUserPassword = email => dispatch => {
  dispatch(resetPasswordRequest())
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      dispatch(resetPasswordResponse(true))
    })
    .catch(err => dispatch(resetPasswordResponse(err)))
}

/**
|--------------------------------------------------
| HANDLE ACTIONS
|--------------------------------------------------
*/

const actions = {
    [LOG_IN_USER_REQUEST]: state => state.withMutations( s => 
      s.set('isLogin', true)
        .set('isLoginSuccess', false)
    ),
    [LOG_OUT_USER_REQUEST]: state => state.set('isLogout', true),
    [CREATE_USER_REQUEST]: state =>
      state.withMutations(s =>
        s
          .set('isCreateUser', true)
          .set('isSendEmail', false)
          .set('userInfo', Map())
      ),
    [CHECK_USER_LOGIN]: (state, action) => {
      return state.withMutations(s => s.set('isUserLogin', action.payload))
    },
  
    [RESET_PASSWORD_REQUEST]: state => state.set('isResetPassword', true),
    [RESET_PASSWORD_RESPONSE]: (state, action) => {
      if (action.payload instanceof Error) {
        return state.withMutations(s =>
          s
            .set('isResetPassword', false)
            .set('isError', true)
            .set('resetPasswordResponse', action.payload)
        )
      }
      return state.withMutations(s =>
        s
          .set('isResetPassword', false)
          .set('isError', false)
          .set('resetPasswordResponse', action.payload)
      )
    },
  
    [CHANGE_PASSWORD_REQUEST]: state => state.set('isChangePassword', true),
    [CHANGE_PASSWORD_RESPONSE]: (state, action) => {
      if (action.payload instanceof Error) {
        return state.withMutations(s =>
          s
            .set('isChangePassword', false)
            .set('isError', true)
            .set('changePasswordResponse', action.payload)
        )
      }
      return state.withMutations(s =>
        s
          .set('isChangePassword', false)
          .set('changePasswordResponse', 'Change Password Success')
      )
    },
  
    [LOG_IN_USER_RESPONSE]: (state, action) => {
      if (action.payload instanceof Error) {
        return state.withMutations(s =>
          s
            .set('isLogin', false)
            .set('userInfo', state.userInfo.merge(action.payload))
        )
      }
      return state.withMutations(s =>
        s
          .set('isLogin', false)
          .set('isLoginSuccess', true)
          .set('userInfo', state.userInfo.merge(action.payload))
      )
    },
  
    [LOG_OUT_USER_RESPONSE]: state => {
      return state.withMutations(s => {
        s.set('isLogout', false)
          .set('changePasswordResponse', null)
          .set('isLogin', false)
      })
    },
  
    [CREATE_USER_RESPONSE]: (state, action) => {
      return state.withMutations(s =>
        s
          .set('isCreateUser', false)
          .set('userInfo', state.userInfo.merge(action.payload))
      )
    },
  
    [SEND_EMAIL_VERIFY_RESPONSE]: (state, action) => {
      if (action.payload instanceof Error) {
        return state.set('isSendEmail', false)
      }
      return state.withMutations(s => s.set('isSendEmail', action.payload))
    },
  
    [GET_USER_TOKEN]: (state, action) => {
      if (action.payload instanceof Error) {
        return state.set('token', null)
      }
      return state.withMutations(s => s.set('token', action.payload))
    },
    [GET_ACCESS_TOKEN_API_RESPONSE]: (state, action) => {
      if (action.payload instanceof Error) {
        return state.set('accessTokenApi', null)
      }
      return state.withMutations(s => s.set('accessTokenApi', action.payload))
    },
    [GET_TYPE_OF_LOGIN]: (state, action) => {
      return state.withMutations(s => s.set('typeOfLogin', action.payload))
    },
  }
  
  export default handleActions(actions, initialState)
  