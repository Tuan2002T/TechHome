import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import 'intl-pluralrules'

const resources = {
  en: {
    translation: {
      welcome: 'App for residents',
      button: {
        login: 'Login',
        active: 'Activate account'
      },
      login: {
        login: 'Login',
        username: 'Phone number or email',
        password: 'Enter password',
        remember: 'Remember password',
        forgot: 'Forgot password',
        button: 'Login'
      },
      active: {
        title: 'Activate account',
        title1: 'Enter the ID/Passport of the contract holder',
        code: 'Enter ID/Passport',
        button: 'Activate'
      }
    }
  },
  vi: {
    translation: {
      welcome: 'Ứng dụng dành cho cư dân',
      button: {
        login: 'Đăng nhập',
        active: 'Kích hoạt tài khoản'
      },
      login: {
        title: 'Đăng nhập',
        username: 'Số điện thoại hoặc email',
        password: 'Nhập mật khẩu',
        remember: 'Nhớ mật khẩu',
        forgot: 'Quên mật khẩu',
        button: 'Đăng nhập'
      },
      active: {
        title: 'Kích hoạt tài khoản',
        title1: 'Nhập CMND/CCCD của người đứng tên trên hợp đồng',
        code: 'Nhập CCCD/CMND',
        button: 'Kích hoạt'
      }
    }
  }
}

// Khởi tạo i18n
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
