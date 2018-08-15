import Api from "../utils/api";

import { Record, Map, List } from "immutable";
import { handleActions, createAction } from "redux-actions";

const FETCH_JOB_INDUSTRY_REQUEST = "introduction/FETCH_JOB_INDUSTRY_REQUEST";
const FETCH_JOB_INDUSTRY_RESPONSE = "introduction/FETCH_JOB_INDUSTRY_RESPONSE";
const CREATE_INTRODUCTION_REQUEST = "introduction/CREATE_INTRODUCTION_REQUEST";
const CREATE_INTRODUCTION_RESPONSE = "introduction/CREATE_INTRODUCTION_RESPONSE";

const fetchJobRequest = createAction(FETCH_JOB_INDUSTRY_REQUEST);
const fetchJobResponse = createAction(FETCH_JOB_INDUSTRY_RESPONSE);
const createIntroductionRequest = createAction(CREATE_INTRODUCTION_REQUEST);
const createIntroductionResponse = createAction(CREATE_INTRODUCTION_RESPONSE);

const introductionRecord = new Record({
  isFetchJob: false,
  jobData: List(),
  introduction: null,
  isCreateIntroduction: false,
});

const initialState = introductionRecord({
  isFetchJob: false,
  jobData: List(),
  introduction: null,
  isCreateIntroduction: false,
});

/**
|--------------------------------------------------
| FETCH JOB
|--------------------------------------------------
*/
export const fetchJob = () => dispatch => {
  dispatch(fetchJobRequest());
  Api.fetchJob()
    .then(data => {
      dispatch(fetchJobResponse(data.data.industry));
    })
    .catch(error => {
      dispatch(fetchJobResponse(error));
    });
};

export const createIntroduction = (param, token) => dispatch => {
  dispatch(createIntroductionRequest());
  Api.createIntroduction(param, token)
    .then(data => {
      dispatch(createIntroductionResponse(data));
    })
    .catch(error => {
      dispatch(createIntroductionResponse(error));
    });
};

/**
|--------------------------------------------------
| HANDLE ACTION
|--------------------------------------------------
*/

const actions = {
  [FETCH_JOB_INDUSTRY_REQUEST]: state => {
    return state.withMutations(s => s.set("isFetchJob", true));
  },
  [FETCH_JOB_INDUSTRY_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set("isFetchJob", false));
    } else {
      return state.withMutations(s =>
        s
          .set("isFetchJob", false)
          .set("jobData", state.jobData.merge(action.payload))
      );
    }
  },
  [CREATE_INTRODUCTION_REQUEST]: state => {
    return state.withMutations(s => s.set("isCreateIntroduction", true));
  },
  [CREATE_INTRODUCTION_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set("isCreateIntroduction", false));
    } else {
      return state.withMutations(s =>
        s
          .set("isCreateIntroduction", false)
          .set("introduction", action.payload)
      );
    }
  },
};

export default handleActions(actions, initialState)