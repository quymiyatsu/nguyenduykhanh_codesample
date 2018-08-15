import { Record, Map, List } from "immutable";
import { handleActions, createAction } from "redux-actions";

import Api from '../utils/api'

const FETCH_QUOTES_REQUEST = 'quotes/FETCH_QUOTES_REQUEST'
const FETCH_QUOTES_RESPONSE = 'quotes/FETCH_QUOTES_RESPONSE'

const fetchQuotesRequest = createAction(FETCH_QUOTES_REQUEST)
const fetchQuotesResponse = createAction(FETCH_QUOTES_RESPONSE)

const quotesRecord = new Record({
    isFetchQuotes: false,
    quotesData: Map(),
})

const initialState = quotesRecord()

/**
|--------------------------------------------------
| FETCH QUOTES
|--------------------------------------------------
*/
export const fetchQuotes = () => dispatch => {
    dispatch(fetchQuotesRequest())
    Api.fetchQuotes("96eb40c48f53e12bec6385c5d86d3b03")
        .then(data => {
            dispatch(fetchQuotesResponse(data))
        })
        .catch(err => {
            dispatch(fetchQuotesResponse(err))
        })
}

/**
|--------------------------------------------------
| HANDLE ACTION
|--------------------------------------------------
*/
const actions = {
    [FETCH_QUOTES_REQUEST]: state => {
        return state.withMutations(s => s.set('isFetchQuotes', true))
    },
    [FETCH_QUOTES_RESPONSE]: (state, action) => {
        if (action.payload instanceof Error) {
            return state.withMutations(s => s.set('isFetchQuotes', false))
        } else {
            return state.withMutations(s => 
                s.set('isFetchQuotes', false)
                    .set('quotesData', state.quotesData.merge(action.payload))
            )
        }
    }
}

export default handleActions(actions, initialState)