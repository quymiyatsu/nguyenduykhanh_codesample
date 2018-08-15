import { checkIfUserLogin } from "../modules/auth.module";

const URL_HOST_API_ENDPOINT = "https://darius.enforces.xyz";
const returnErorr = response => {
  if (!response.ok) {
    return new Error(response);
  }
};


/**
 * GET SERVER API ACCESS TOKEN
 */
const getServerAccessToken = token => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/auth/verify`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "id_token": token
    })
  }).then(response => {
    returnErorr(response)
    return response.json()
  })
}

const headerInfomations = (access_token, client, uid) => {
  return (headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "access-token": access_token,
    client: client,
    uid: uid
  });
};

// GET JOB INDUSTRY
const fetchJobIndustry = () => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/graphql/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "query": "{ industry(limit: 50) { id name experts_count } }"
    })
  }).then(response => {
    returnErorr(response)
    return response.json();
  });
};

const fetchJob = () => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/graphql/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "query": "{ industry(limit: 10) { id name job_titles { id name } } }"
    })
  }).then(response => {
  
    return response.json();
  });
};

const createIntroduction = (param, token) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/introductions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: param,
  }).then(response => {
    return response.json();
  });
};

const createArticle = (param, token) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: param,
  }).then(response => {
    return response.json();
  });
};

const editProfile = (param, token, id) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/introductions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: param,
  }).then(response => {
    return response.json();
  });
};

// LOOK UP EXPERT

const lookupExpert = (expertName, page) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/graphql/query`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "query": `{ search(textSearch: \"${expertName}\", page: ${page}) { id user_id avatar { thumb } email phone full_name work_place job_position about_me  gender industry { name } job_title { name } } }`
    })
  }).then(response => {
    returnErorr(response)
    return response.json()
  })
}

/**
|--------------------------------------------------
| FETCH ARTICLE QUERY
|--------------------------------------------------
*/

const fetchArticle = (userId) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/graphql/query`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "query": `{ article(userId: ${parseInt(userId)}) {user { introduction { full_name } } id title introduction cached_votes_up comments_count image { thumb medium }} }`
    })
  }).then(response => {
    returnErorr(response)
    return response.json()
  })
}

/**
|--------------------------------------------------
| FETCH SINGLE ARTICLE
|--------------------------------------------------
*/

const fetchSingleArticle = (articleId, token, isUserLogin) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/graphql/query`, {
    method: 'POST',
    headers: isUserLogin ?  {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "query": `{ article(id: ${parseInt(articleId)}) {user { introduction { full_name job_position work_place } } id is_liked title introduction journey challenges conclusion all_tags_list cached_votes_up created_at updated_at comments_count image { thumb medium }} }`
    })
  }).then(response => {
    returnErorr(response)
    return response.json()
  })
}

/**
|--------------------------------------------------
| FETCH PROFILE
|--------------------------------------------------
*/

const fetchProfile = (userId, token, isUserLogin) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/graphql/query`, {
    method: 'POST',
    headers: isUserLogin ?  {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    } :
    {
      "Content-Type": "application/json",
    } 
    ,
    body: userId !== '' ? JSON.stringify({
      "query": `{ profile(userId: ${userId}) {id user_id avatar { thumb } cover { medium } is_expert full_name about_me email job_position work_place is_following facebook_url user  { follow_count followers_count articles_count } } }`
    }) :
      JSON.stringify({
        "query": `{profile {id user_id avatar { thumb } cover { medium } full_name is_expert about_me email job_position work_place is_following facebook_url twitter_url linkedin_url user  { follow_count followers_count articles_count } } }`
      })
  }).then(response => {
    returnErorr(response)
    return response.json()
  })
}

/**
|--------------------------------------------------
| FETCH SINGLE PROFILE
|--------------------------------------------------
*/
const fetchSingleProfile = access_token => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/graphql/query`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`
    },
    body: JSON.stringify({
      "query": "{ profile {id avatar { thumb } full_name about_me email job_position work_place } }"
    })
  }).then(response => {
    returnErorr(response)
    return response.json()
  })
}

/**
|--------------------------------------------------
| FOLLOW USER
|--------------------------------------------------
*/

const followUser = (userId, token) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/users/${userId}/follow`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}

/**
|--------------------------------------------------
| UNFOLLOW USER
|--------------------------------------------------
*/
const unFollowUser = (userId, token) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/users/${userId}/unfollow`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}


/**
|--------------------------------------------------
| LIKE ARTICLE
|--------------------------------------------------
*/
const likeArticle = (articleId, token) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/articles/${articleId}/like`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}

/**
|--------------------------------------------------
| UNLIKE ARTICLE
|--------------------------------------------------
*/
const unLikeArticle = (articleId, token) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/articles/${articleId}/unlike`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}

/**
|--------------------------------------------------
| FETCH COMMENT ARTICLE
|--------------------------------------------------
*/
const fetchCommentArticle = (articleId) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/graphql/query`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "query": `{ comment(page: 1, commentableId: ${articleId}) { id created_at updated_at is_liked comment comments_count commented_user { introduction { full_name } } } }`

    })
  }).then(response => {
    returnErorr(response)
    return response.json()
  })
}
/**
|--------------------------------------------------
| REPLY COMMENT
|--------------------------------------------------
*/
const fetchReplyComment = (commentId, access_token, isUserLogin) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/graphql/query`, {
    method: 'POST',
    headers: isUserLogin ? {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`
    } : {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "query": `{ comment(page: 1, commentableId: ${commentId}) { id comment created_at updated_at comments_count is_liked commented_user { introduction { full_name } } } }`
    })
  }).then(response => {
    returnErorr(response)
    return response.json()
  })
}
/**
|--------------------------------------------------
| CREATE COMMENT
|--------------------------------------------------
*/
const createComment = (articleId, token, commentText) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/articles/${articleId}/comment?comment=${commentText}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}

/**
|--------------------------------------------------
| CREATE REPLY COMMENT
|--------------------------------------------------
*/
const createReplyComment = (commentId, token, replyCommentTxt) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/comments/${commentId}/reply?comment=${replyCommentTxt}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}

/**
|--------------------------------------------------
| GET QUOTES
|--------------------------------------------------
*/

const fetchQuotes = token => {
  return fetch('https://favqs.com/api/quotes', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token token=${token}`
    }
  }).then(response => {
    returnErorr(response)
    return response.json()
  })
}

/**
|--------------------------------------------------
| LIKE COMMENT
|--------------------------------------------------
*/
const likeComment = (commentId, token) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/comments/${commentId}/like`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}


/**
|--------------------------------------------------
| UNLIKE COMMENT
|--------------------------------------------------
*/
const unlikeComment = (commentId, token) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/comments/${commentId}/unlike`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}


/**
|--------------------------------------------------
| FETCH EXPERT BASED ON INDUSTRY
|--------------------------------------------------
*/

const fetchExpertIndustry = (industry_id) => {
  return fetch(`${URL_HOST_API_ENDPOINT}/api/v1/graphql/query`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "query": `{expert(industryId: ${industry_id}) {id about_me job_title {name} work_place job_position full_name avatar { thumb }  industry { name } } }`

    })
  }).then(response => {
    returnErorr(response)
    return response.json()
  })
}



/**
|--------------------------------------------------
| EXPORT FUNCTION
|--------------------------------------------------
*/

export default {
  fetchJobIndustry,
  fetchJob,
  createIntroduction,
  createArticle,
  lookupExpert,
  fetchArticle,
  fetchProfile,
  fetchSingleArticle,
  getServerAccessToken,
  followUser,
  unFollowUser,
  likeArticle,
  unLikeArticle,
  fetchCommentArticle,
  createComment,
  fetchReplyComment,
  createReplyComment,
  fetchSingleProfile,
  editProfile,
  fetchQuotes,
  likeComment,
  unlikeComment,
  fetchExpertIndustry
};