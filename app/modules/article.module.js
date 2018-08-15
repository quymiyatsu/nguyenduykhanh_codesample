import { Record, Map, List } from "immutable";
import { handleActions, createAction } from "redux-actions";

import Api from "../utils/api";


// DECLARE ACTION

const CREATE_ARTICLE_REQUEST = "article/CREATE_ARTICLE_REQUEST";
const CREATE_ARTICLE_RESPONSE = "article/CREATE_ARTICLE_RESPONSE";

const FETCH_ARTICLE_REQUEST = "article/FETCH_ARTICLE_REQUEST";
const FETCH_ARTICLE_RESPONSE = "article/FETCH_ARTICLE_RESPONSE";
const FETCH_SINGLE_ARTICLE_REQUEST = "article/FETCH_SINGLE_ARTICLE_REQUEST";
const FETCH_SINGLE_ARTICLE_RESPONSE = "article/FETCH_SINGLE_ARTICLE_RESPONSE";

const LIKE_ARTICLE_REQUEST = 'article/LIKE_ARTICLE_REQUEST'
const UN_LIKE_ARTICLE_REQUEST = 'article/UN_LIKE_ARTICLE_REQUEST'

const LIKE_ARTICLE_RESPONSE = 'article/LIKE_ARTICLE_RESPONSE'
const UN_LIKE_ARTICLE_RESPONSE = 'article/UN_LIKE_ARTICLE_RESPONSE'

// DECLARE COMMENT ACTION

const FETCH_COMMENT_REQUEST = 'comment/FETCH_COMMENT_REQUEST'
const FETCH_COMMENT_RESPONSE = 'comment/FETCH_COMMENT_RESPONSE'


const FETCH_REPLY_COMMENT_REQUEST = 'comment/FETCH_REPLY_COMMENT_REQUEST'
const FETCH_REPLY_COMMENT_RESPONSE = 'comment/FETCH_REPLY_COMMENT_RESPONSE'

const CREATE_COMMENT_REQUEST = 'comment/CREATE_COMMENT_REQUEST'
const CREATE_COMMENT_RESPONSE = 'comment/CREATE_COMMENT_RESPONSE'

const CREATE_REPLY_COMMENT_REQUEST = 'comment/CREATE_REPLY_COMMENT_REQUEST'
const CREATE_REPLY_COMMENT_RESPONSE = 'comment/CREATE_REPLY_COMMENT_RESPONSE'

const DELETE_COMMENT_REQUEST = 'comment/DELETE_COMMENT_REQUEST'
const DELETE_COMMENT_RESPONSE = 'comment/DELETE_COMMENT_RESPONSE'

const GET_COMMENT_ID = 'comment/GET_COMMENT_ID'

const LIKE_COMMENT_REQUEST =  'comment/LIKE_COMMENT_REQUEST'
const LIKE_COMMENT_RESPONSE = 'comment/LIKE_COMMENT_RESPONSE'

const UNLIKE_COMMENT_REQUEST = 'comment/UNLIKE_COMMENT_REQUEST'
const UNLIKE_COMMENT_RESPONSE = 'comment/UNLIKE_COMMENT_RESPONSE'

// INTERACT WITH ARTICLE SECTION

const likeArticleRequest = createAction(LIKE_ARTICLE_REQUEST)
const unlikeArticleRequest = createAction(UN_LIKE_ARTICLE_REQUEST)

const likeArticleResponse = createAction(LIKE_ARTICLE_RESPONSE)
const unlikeArticleResponse = createAction(UN_LIKE_ARTICLE_RESPONSE)

const fetchArticleRequest = createAction(FETCH_ARTICLE_REQUEST);
const fetchArticleResponse = createAction(FETCH_ARTICLE_RESPONSE);

const createArticleRequest = createAction(CREATE_ARTICLE_REQUEST);
const createArticleResponse = createAction(CREATE_ARTICLE_RESPONSE);

const fetchSingleArticleRequest = createAction(FETCH_SINGLE_ARTICLE_REQUEST);
const fetchSingleArticleResponse = createAction(FETCH_SINGLE_ARTICLE_RESPONSE);

// COMMENT SECTION

const fetchCommentRequest = createAction(FETCH_COMMENT_REQUEST)
const fetchCommentResponse = createAction(FETCH_COMMENT_RESPONSE)

const fetchReplyCommentRequest = createAction(FETCH_REPLY_COMMENT_REQUEST)
const fetchReplyCommentResponse =createAction(FETCH_REPLY_COMMENT_RESPONSE)

const createCommentRequest = createAction(CREATE_COMMENT_REQUEST)
const createCommentResponse = createAction(CREATE_COMMENT_RESPONSE)

const createReplyCommentRequest = createAction(CREATE_REPLY_COMMENT_REQUEST)
const createReplyCommentResponse = createAction(CREATE_REPLY_COMMENT_RESPONSE)

const deleteCommentRequest = createAction(DELETE_COMMENT_REQUEST)
const deleteCommentResponse = createAction(DELETE_COMMENT_RESPONSE)

const getCommentId = createAction(GET_COMMENT_ID)

const likeCommentRequest = createAction(LIKE_COMMENT_REQUEST)
const likeCommentResponse = createAction(LIKE_COMMENT_RESPONSE)

const unlikeCommentRequest = createAction(UNLIKE_COMMENT_REQUEST)
const unlikeCommentResponse = createAction(UNLIKE_COMMENT_RESPONSE)


const articleRecord = new Record({
  isFetchArticle: false,
  isFetchSingleArticle: false,
  isFetchComment: false,
  likeArticleRequest: false,
  unlikeArticleRequest: false,
  isCreateComment: false,
  isFetchReplyComment: false,
  isCreateReplyComment: false,
  isDeleteComment: false,
  isLikeComment: false,
  isUnlikeComment: false,
  userArticleData: List(),
  singleArticleData: List(),
  commentData: List(),
  replyCommentData: List(),
  article: null,
  isLoading: false,
  commentId: 0
});

const initialState = articleRecord();

/**
|--------------------------------------------------
| FETCH ARTICLE
|--------------------------------------------------
*/

export const fetchArticle = userId => dispatch => {
  dispatch(fetchArticleRequest());
  Api.fetchArticle(userId)
    .then(data => {
      dispatch(fetchArticleResponse(data.data.article));
    })
    .catch(err => {
      dispatch(fetchArticleResponse(err));
    });
};

/**
|--------------------------------------------------
| FETCH SINGLE ARTICLE
|--------------------------------------------------
*/
export const fetchSingleArticle = (articleId, access_token, isUserLogin) => dispatch => {
  dispatch(fetchSingleArticleRequest());
  Api.fetchSingleArticle(articleId, access_token, isUserLogin)
    .then(data => {
      dispatch(fetchSingleArticleResponse(data.data.article));
    })
    .catch(err => {
      dispatch(fetchSingleArticleResponse(err));
    });
};

/**
|--------------------------------------------------
| LIKE ARTICLE
|--------------------------------------------------
*/
export const likeArticle = (articleId, access_token) => dispatch => {
  dispatch(likeArticleRequest())
  Api.likeArticle(articleId, access_token)
    .then(data => {
      dispatch(likeArticleResponse(data))
    })
    .catch(err => {
      dispatch(likeArticleResponse(data))
    })
}

/**
|--------------------------------------------------
| UNLIKE ARTICLE
|--------------------------------------------------
*/
export const unlikeArticle = (articleId, access_token) => dispatch => {
  dispatch(unlikeArticleRequest())
  Api.unLikeArticle(articleId, access_token)
    .then(data => {
      dispatch(unlikeArticleResponse(data))
    })
    .catch(err => {
      dispatch(unlikeArticleResponse(err))
    })
}

/**
 |--------------------------------------------------
 | CREATE ARTICLE
 |--------------------------------------------------
 */

export const createArticle = (param, token) => dispatch => {
  dispatch(createArticleRequest());
  Api.createArticle(param, token)
    .then(data => {
      dispatch(createArticleResponse(data));
    })
    .catch(error => {
      dispatch(createArticleResponse(error));
    });
};

/**
|--------------------------------------------------
| FETCH COMMENT
|--------------------------------------------------
*/
export const fetchComment = (articleId) => dispatch => {
  dispatch(fetchCommentRequest())
  Api.fetchCommentArticle(articleId)
      .then(data => {
        dispatch(fetchCommentResponse(data.data.comment))
      })
      .catch(err => {
        dispatch(fetchCommentResponse(err))
      })
}

/**
|--------------------------------------------------
| FETCH REPLY COMMENT
|--------------------------------------------------
*/
export const fetchReplyComment = (commentId, access_token, isUserLogin) => dispatch => {
  dispatch(fetchReplyCommentRequest())
  Api.fetchReplyComment(commentId, access_token, isUserLogin)
      .then(data => {
        dispatch(fetchReplyCommentResponse(data.data.comment))
      })
      .catch(err => {
        dispatch(fetchReplyCommentResponse(err))
      })
}

/**
|--------------------------------------------------
| CREATE COMMENT
|--------------------------------------------------
*/
export const createComment = (articleId, access_token, commentText) => dispatch => {
  dispatch(createCommentRequest())
  Api.createComment(articleId, access_token, commentText)
      .then(data => {
        dispatch(createCommentResponse(data))
      })
      .catch(err => {
        dispatch(createCommentResponse(err))
      })
}

/**
|--------------------------------------------------
| CREATE REPLY COMMENT
|--------------------------------------------------
*/
export const createReplyComment = (commentId, access_token, replyCommentTxt) => dispatch => {
  dispatch(createReplyCommentRequest())
  Api.createReplyComment(commentId, access_token, replyCommentTxt)
      .then(data => {
        dispatch(createReplyCommentResponse(data))
      })
      .catch(err => {
        dispatch(createReplyCommentResponse(err))
      })
}

/**
|--------------------------------------------------
| GET COMMENT ID
|--------------------------------------------------
*/
export const getCommentIds = id => dispatch => {
  dispatch(getCommentId(id))
}

/**
|--------------------------------------------------
| LIKE COMMENT
|--------------------------------------------------
*/

export const likeComment = (commentId, access_token) => dispatch => {
  dispatch(likeCommentRequest())
  Api.likeComment(commentId, access_token)
      .then(data => {
        dispatch(likeCommentResponse(data))
      })
      .catch(err => dispatch(likeCommentResponse(err)))
}

/**
|--------------------------------------------------
| UNLIKE COMMENT
|--------------------------------------------------
*/
export const unlikeComment = (commentId, access_token) => dispatch => {
  dispatch(unlikeCommentRequest())
  Api.unlikeComment(commentId, access_token)
    .then(data => {
      dispatch(unlikeCommentResponse(data))
    })
    .catch(err => dispatch(unlikeCommentResponse(err)))
}

/**
|--------------------------------------------------
| HANDLE ACTION
|--------------------------------------------------
*/

const actions = {
  [FETCH_ARTICLE_REQUEST]: state => {
    return state.withMutations(s =>
      s.set("isFetchArticle", true).set("userArticleData", List())
    );
  },
  [FETCH_SINGLE_ARTICLE_REQUEST]: state => {
    return state.withMutations(s =>
      s.set("isFetchSingleArticle", true).set("singleArticleData", List())
    );
  },
  [FETCH_COMMENT_REQUEST]: state => {
    return state.withMutations(s => 
      s.set('isFetchComment', true)
        .set('commentData', List())
    )
  },
  [FETCH_REPLY_COMMENT_REQUEST]: state => {
    return state.withMutations(s => 
      s.set('isFetchReplyComment', true)
        .set('replyCommentData', List())
    )
  },
  [LIKE_ARTICLE_REQUEST]: state => {
    return state.withMutations(s =>
      s.set('likeArticleRequest', true)
    )
  },
  [UN_LIKE_ARTICLE_REQUEST]: state => {
    return state.withMutations(s =>
      s.set('unlikeArticleRequest', true)
    )
  },
  [LIKE_COMMENT_REQUEST]: state => {
    return state.withMutations(s => 
      s.set('isLikeComment', true)
    )
  },
  [UNLIKE_COMMENT_REQUEST]: state => {
    return state.withMutations(s => 
      s.set('isUnlikeComment', false)
    )
  },
  [CREATE_COMMENT_REQUEST]: state => {
    return state.withMutations(s => 
      s.set('isCreateComment', true)
    )
  },
  [CREATE_REPLY_COMMENT_REQUEST]: state => {
    return state.withMutations(s => 
      s.set('isCreateReplyComment', true)
    )
  },
  [FETCH_ARTICLE_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set("isFetchArticle", false));
    } else {
      return state.withMutations(s =>
        s
          .set("isFetchArticle", false)
          .set("userArticleData", state.userArticleData.merge(action.payload))
      );
    }
  },
  [FETCH_SINGLE_ARTICLE_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => 
          s.set("isFetchSingleArticle", false)
            .set("isFetchArticle", false)
        );
    } else {
      return state.withMutations(s =>
        s
          .set("isFetchSingleArticle", false)
          .set(
            "singleArticleData",
            state.singleArticleData.merge(action.payload)
          )
      );
    }
  },
  [LIKE_ARTICLE_RESPONSE]: state => {
    return state.withMutations(s =>
      s.set('likeArticleRequest', false)
    )
  },
  [UN_LIKE_ARTICLE_RESPONSE]: state => {
    return state.withMutations(s =>
      s.set('unlikeArticleRequest', false)
    )
  },
  [FETCH_COMMENT_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set('isFetchComment', false))
    } else {
      return state.withMutations(s => 
        s.set('isFetchComment', false)
          .set('commentData', state.commentData.merge(action.payload))
      )
    }
  },
  [CREATE_COMMENT_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set('isCreateComment', false))
    } else {
      return state.withMutations(s => s.set('isCreateComment', false))
    }
  },
  [CREATE_ARTICLE_REQUEST]: state => {
    return state.withMutations(s => s.set("isLoading", true));
  },
  [CREATE_ARTICLE_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set("isLoading", false));
    } else {
      return state.withMutations(s =>
        s
          .set("isLoading", false)
          .set("article", action.payload)
      );
    }
  },
  [FETCH_REPLY_COMMENT_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set('isFetchReplyComment', false))
    } else {
      return state.withMutations(s => 
        s.set('isFetchReplyComment', false)
          .set('replyCommentData', state.replyCommentData.merge(action.payload))
      )
    }
  },
  [CREATE_REPLY_COMMENT_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set('isCreateReplyComment', false))
    } else {
      return state.withMutations(s => s.set('isCreateReplyComment', false))
    }
  },
  [GET_COMMENT_ID]: (state, action) => {
    return state.withMutations(s =>
      s.set('commentId', action.payload)
    )
  },
  [LIKE_COMMENT_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set('isLikeComment', false))
    } else {
      return state.withMutations(s => s.set('isLikeComment', false))
    }
  },
  [UNLIKE_COMMENT_RESPONSE]: (state, action) => {
    if (action.payload instanceof Error) {
      return state.withMutations(s => s.set('isUnlikeComment', false))
    } else {
      return state.withMutations(s => s.set('isUnlikeComment', false))
    }
  }
};

export default handleActions(actions, initialState);
