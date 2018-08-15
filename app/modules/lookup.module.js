import { Record, Map, List } from "immutable";
import { handleActions, createAction } from "redux-actions";

import Api from "../utils/api";

const FETCH_JOB_INDUSTRY_REQUEST = "lookup/FETCH_JOB_INDUSTRY_REQUEST";
const FETCH_JOB_INDUSTRY_RESPONSE = "lookup/FETCH_JOB_INDUSTRY_RESPONSE";

const LOOK_UP_REQUEST = "lookup/LOOK_UP_REQUEST";
const LOOK_UP_RESPONSE = "lookup/LOOK_UP_RESPONSE";

const LOOK_UP_MORE_REQUEST = 'lookup/LOOK_UP_MORE_REQUEST'
const START_SEARCHING_REQUEST = 'lookup/START_SEARCHING_REQUEST'


const FETCH_EXPERT_INDUSTRY_REQUEST = 'lookup/FETCH_EXPERT_INDUSTRY_REQUEST'
const FETCH_EXPERT_INDUSTRY_RESPONSE = 'lookup/FETCH_EXPERT_INDUSTRY_RESPONSE'

const fetchJobIndustryRequest = createAction(FETCH_JOB_INDUSTRY_REQUEST);
const fetchJobIndustryResponse = createAction(FETCH_JOB_INDUSTRY_RESPONSE);

const lookupRequest = createAction(LOOK_UP_REQUEST);
const lookupResponse = createAction(LOOK_UP_RESPONSE);
const fetchExpertIndustryRequest = createAction(FETCH_EXPERT_INDUSTRY_REQUEST)
const fetchExpertIndustryResponse = createAction(FETCH_EXPERT_INDUSTRY_RESPONSE)
const lookupMoreRequest = createAction(LOOK_UP_MORE_REQUEST)
const startSearchingRequest = createAction(START_SEARCHING_REQUEST)

const lookUpRecord = new Record({
  isFetchIndustry: false,
  isFetchExpertIndustry: false,
  isLookUpMore: false,
  isLookup: false,
  lookupData: List(),
  industryData: List(),
  expertIndustryData: List(),
  noData: false,
  page: 1,
  isLoadmore: true,
  isStartSearch: false,
  isStopLoadmore: false,
});

const initialState = lookUpRecord();

/**
|--------------------------------------------------
| LOOK UP
|--------------------------------------------------
*/

export const lookupModule = (expertName, page = 1) => dispatch => {
  if (page === 1) {
    dispatch(lookupRequest());
  } else if (page > 1) {
    dispatch(lookupMoreRequest())
  }
 
  Api.lookupExpert(expertName, page)
    .then(data => {
      dispatch(lookupResponse({data: data.data.search, page}));
    })
    .catch(err => {
      dispatch(lookupResponse(err));
    });
};

/**
|--------------------------------------------------
| FETCH INDUSTRY 
|--------------------------------------------------
*/
export const fetchJobIndustry = () => dispatch => {
  dispatch(fetchJobIndustryRequest());
  Api.fetchJobIndustry()
    .then(data => {
      dispatch(fetchJobIndustryResponse(data.data.industry));
    })
    .catch(error => {
      dispatch(fetchJobIndustryResponse(error));
    });
};

/**
|--------------------------------------------------
| FETCH EXPERT BASED ON JOB INDUSTRY
|--------------------------------------------------
*/
export const fetchExpertIndustry = industryId => dispatch => {
  dispatch(fetchExpertIndustryRequest())
  Api.fetchExpertIndustry(industryId)
    .then(data => {
      dispatch(fetchExpertIndustryResponse(data.data.expert))
    })
    .catch(err => {
      dispatch(fetchJobIndustryResponse(err))
    })
}

/**
|--------------------------------------------------
| START SEARCHING
|--------------------------------------------------
*/

export const startSearching = () => dispatch => {
dispatch(startSearchingRequest())
}

/**
|--------------------------------------------------
| HANDLE ACTION
|--------------------------------------------------
*/

const actions = {
  [FETCH_JOB_INDUSTRY_REQUEST]: state => {
    return state.withMutations(s => 
        s.set("isFetchIndustry", true)
          .set("lookupData", List())
    );
  },
  [LOOK_UP_REQUEST]: state => {
    return state.withMutations(s =>
      s.set("isLookup", true)
        .set('noData', false)
        .set("lookupData", List())
    );
  },

  [START_SEARCHING_REQUEST]: state => {
    return state.withMutations(s => 
      s.set('isStartSearch', true)
        .set('noData', false)
    )
  },
  [LOOK_UP_MORE_REQUEST]: state => {
    return state.withMutations(s => s.set('isLookUpMore', true))
  },
  [FETCH_EXPERT_INDUSTRY_REQUEST]: state => {
    return state.withMutations(s => 
        s.set('isFetchExpertIndustry', true)
          .set('noData', false)
      )
  },
  [FETCH_JOB_INDUSTRY_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set("isFetchIndustry", false));
    } else {
      return state.withMutations(s =>
        s
          .set("isFetchIndustry", false)
          .set('noData', false)
          .set("industryData", state.industryData.merge(action.payload))
      );
    }
  },
  [LOOK_UP_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => 
        s.set("isLookup", false)
          .set('isLookUpMore', false)
    
    );
    } else {
      if (action.payload.data.length === 0 && state.isStartSearch === true) {
        return state.withMutations(s =>
          s
            .set("isLookup", false)
            .set("lookupData", List())
            .set('noData', true)
            .set('isLookUpMore', false)
        );
      } else if (action.payload.data.length === 0 && state.isLookUpMore === true) {
        return state.withMutations(s =>
          s
            .set("isLookup", false)
            .set('isStopLoadmore', true)
            .set('isLookUpMore', false)
        );
      }
      else 
      {
        return state.withMutations(s =>
          s
            .set("isLookup", false)
            .set("lookupData", state.lookupData.merge(action.payload.data)
            .set('page', action.payload.page)
            .set('isLookUpMore', false)
          )
        );
      }
    }
  },
  [FETCH_EXPERT_INDUSTRY_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set('isFetchExpertIndustry', false))
    } else {
      return state.withMutations(s => 
        s.set('isFetchExpertIndustry', false)
          .set('expertIndustryData', state.expertIndustryData.merge(action.payload))
      )
    }
  }
};

export default handleActions(actions, initialState);
