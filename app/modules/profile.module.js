import { Record, Map, List } from "immutable";
import { handleActions, createAction } from "redux-actions";

import Api from "../utils/api";
import Profile from "../models/profile.model";

const FETCH_PROFILE_REQUEST = "profile/FETCH_PROFILE_REQUEST";
const FETCH_PROFILE_RESPONSE = "profile/FETCH_PROFILE_RESPONSE";

const FOLLOW_USER_REQUEST = "profile/FOLLOW_USER_REQUEST";
const FOLLOW_USER_RESPONSE = "profile/FOLLOW_USER_RESPONSE";

const UN_FOLLOW_USER_REQUEST = "profile/UN_FOLLOW_USER_REQUEST";
const UN_FOLLOW_USER_RESPONSE = "profile/UN_FOLLOW_USER_RESPONSE";

const EDIT_PROFILE_REQUEST = "profile/EDIT_PROFILE_REQUEST";
const EDIT_PROFILE_RESPONSE = "profile/EDIT_PROFILE_RESPONSE";

const FETCH_SINGLE_PROFILE_REQUEST = 'profile/FETCH_SINGLE_PROFILE_REQUEST'
const FETCH_SINGLE_PROFILE_RESPONSE = 'profile/FETCH_SINGLE_PROFILE_RESPONSE'

const fetchProfileRequest = createAction(FETCH_PROFILE_REQUEST);
const fetchProfileResponse = createAction(FETCH_PROFILE_RESPONSE);

const followUserRequest = createAction(FOLLOW_USER_REQUEST);
const followUserResponse = createAction(FOLLOW_USER_RESPONSE);

const unFollowUserRequest = createAction(UN_FOLLOW_USER_REQUEST);
const unFollowUserResponse = createAction(UN_FOLLOW_USER_RESPONSE);

const editProfileRequest = createAction(EDIT_PROFILE_REQUEST);
const editProfileResponse = createAction(EDIT_PROFILE_RESPONSE);

const fetchSingleProfileRequest = createAction(FETCH_SINGLE_PROFILE_REQUEST)
const fetchSingleProfileResponse = createAction(FETCH_SINGLE_PROFILE_RESPONSE)

const profileRecord = new Record({
  isFetchProfile: false,
  isFollowUser: false,
  isUnFollowUser: false,
  profileData: new Profile(),
  responseData: null,
  isFetchSingleProfile: false,
  profileData: new Profile(),
  singleProfileData: List(),
});

const initialState = profileRecord();

/**
|--------------------------------------------------
| FETCH PROFILE 
|--------------------------------------------------
*/

export const fetchProfileData = (userId, access_token, isUserLogin) => dispatch => {
  dispatch(fetchProfileRequest());
  Api.fetchProfile(userId, access_token, isUserLogin)
    .then(data => {
      dispatch(fetchProfileResponse(data.data.profile));
    })
    .catch(err => {
      dispatch(fetchProfileResponse(err));
    });
};

/**
 |--------------------------------------------------
 | EDIT PROFILE
 |--------------------------------------------------
 */

export const editProfile = (param, access_token, id) => dispatch => {
  dispatch(editProfileRequest());
  Api.editProfile(param, access_token, id)
    .then(data => {
      dispatch(editProfileResponse(data));
      dispatch(fetchProfileData('', access_token, true))
    })
    .catch(err => {
      dispatch(editProfileResponse(err));
    });
};

/**
|--------------------------------------------------
| FOLLOW USER
|--------------------------------------------------
*/
export const followUser = (userId, accessToken) => dispatch => {
  dispatch(followUserRequest());
  Api.followUser(userId, accessToken)
    .then(data => {
      dispatch(followUserResponse(data));
    })
    .catch(err => followUserResponse(err));
};

/**
|--------------------------------------------------
| UNFOLLOW USER
|--------------------------------------------------
*/
export const unFollowUser = (userId, accessToken) => dispatch => {
  dispatch(unFollowUserRequest());
  Api.unFollowUser(userId, accessToken)
    .then(data => {
      dispatch(unFollowUserResponse(data));
    })
    .catch(err => unFollowUserResponse(err));
};


/**
|--------------------------------------------------
| FETCH SINGLE PROFILE
|--------------------------------------------------
*/
export const fetchSingleProfile = access_token => dispatch => {
  dispatch(fetchSingleProfileRequest())
  Api.fetchSingleProfile(access_token)
      .then(data => {
        dispatch(fetchSingleProfileResponse(data.data.profile))
      })
      .catch(err => fetchSingleProfileResponse(err))
}

/**
|--------------------------------------------------
| HANDLE ACTIONS
|--------------------------------------------------
*/
const actions = {
  [FETCH_PROFILE_REQUEST]: state => {
    return state.withMutations(s =>
      s.set("isFetchProfile", true).set("profileData", List())
    );
  },
  [FETCH_SINGLE_PROFILE_REQUEST]: state => {
    return state.withMutations(s =>
      s.set('isFetchSingleProfile', true)
    )
  },
  [FOLLOW_USER_REQUEST]: state => {
    return state.withMutations(s => s.set("isFollowUser", true));
  },
  [UN_FOLLOW_USER_REQUEST]: state => {
    return state.withMutations(s => s.set("isUnFollowUser", true));
  },
  [FETCH_PROFILE_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set("isFetchProfile", false));
    } else {
      return state.withMutations(s =>
        s
          .set("isFetchProfile", false)
          .set("profileData", state.profileData.merge(action.payload))
      );
    }
  },
  [FOLLOW_USER_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
    return state.withMutations(s => s.set("isFollowUser", false));
    
    }
    return state.withMutations(s => s.set("isUnFollowUser", false));
    
  },
  [UN_FOLLOW_USER_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
    return state.withMutations(s => s.set("isUnFollowUser", false));
    } 
    return state.withMutations(s => s.set("isUnFollowUser", false));
    
  },
  [EDIT_PROFILE_REQUEST]: state => {
    return state.withMutations(s =>
      s.set("isFetchProfile", true).set("responseData", null)
    );
  },
  [EDIT_PROFILE_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set("isFetchProfile", false));
    } else {
      return state.withMutations(s =>
        s
          .set("isFetchProfile", false)
          .set("responseData", action.payload)
      );
    }
  },
  [FETCH_SINGLE_PROFILE_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set('isFetchSingleProfile', false))
    } else {
      return state.withMutations(s =>
        s.set('isFetchSingleProfile', false)
        .set('singleProfileData', state.singleProfileData.merge(action.payload))
      )
    }
  }
};
export default handleActions(actions, initialState);
