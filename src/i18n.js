
import { createI18n } from 'vue-i18n'

import zhCN from './i18n/zh-CN.json'
import en from './i18n/en.json'

const i18n = createI18n({
    globalInjection: true,
    locale: 'zh-CN',
    messages: {
        "zh-CN": zhCN,
        "en":en
    }
})

export default i18n