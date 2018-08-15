import { combineReducers } from "redux-immutable";

import AppReducer from "../actions/app.action";
import AuthReducer from "../modules/auth.module";
import LookUpReducer from "../modules/lookup.module";
import ProfileReducer from "../modules/profile.module";
import ArticleReducer from "../modules/article.module";
import IntroductionReducer from '../modules/introduction.module'
import QuotesReducer from '../modules/quotes.module'

const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  lookup: LookUpReducer,
  profile: ProfileReducer,
  article: ArticleReducer,
  introduction: IntroductionReducer,
  quotes: QuotesReducer
});

export default rootReducer