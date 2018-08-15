import SInfo from 'react-native-sensitive-info'

const API_TOKEN_STORAGE_KEY = 'auth/ApiToken'

export const perseTokenResponseHeaderToTokenObj = responseHeaders => {
  const accessTokenObj = {}

  Object.keys(responseHeaders).map(key => {
    const accessTokenKey = responseHeaders[key]
    accessTokenObj.access_token = accessTokenKey['access-token'].toString()
    accessTokenObj.client = accessTokenKey.client.toString()
    accessTokenObj.uid = accessTokenKey.uid.toString()
  })
  return accessTokenObj
}

export const saveApiToken = tokenObj => {
  SInfo.setItem(API_TOKEN_STORAGE_KEY, JSON.stringify(tokenObj), {})
}

export const loadApiToken = () => {
  return SInfo.getItem(API_TOKEN_STORAGE_KEY, {})
    .then(data => {
      if (!data) return null

      const dataObj = JSON.parse(data)
      if (dataObj === null) return null

      return dataObj
    })
    .catch(e => {
      console.log(e)
    })
}

export const destroyApiToken = () => {
  SInfo.deleteItem(API_TOKEN_STORAGE_KEY, {})
}
