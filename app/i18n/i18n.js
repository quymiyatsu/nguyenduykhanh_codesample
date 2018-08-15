import I18n from 'react-native-i18n'
import ja from './locales/ja'
import ko from './locales/ko'
import en from './locales/en'

I18n.fallbacks = true

I18n.translations = {
  ja,
  ko,
  en,
}

I18n.langs = ['ja', 'ko', 'en']

I18n.locale = 'en'

I18n.switchLanguage = lang => {
  I18n.locale = lang
}

export default I18n
