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
        title: 'Login',
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
      },
      forgotPassword: {
        title: 'Forgot password',
        phoneOrEmail: 'Enter phone number or email',
        otp: 'Enter verification code',
        sendOTP: 'Send OTP',
        button: 'Next',
        notificationSuccessSendOTP: 'OTP code has been sent',
        notificationErrorSendOTP: 'Send OTP code failed',
        notificationErrorOTP: 'OTP code is incorrect',
        newPassword: {
          title: 'Create new password',
          password: 'Enter new password',
          confirmPassword: 'Re-enter password',
          button: 'Confirm',
          passwordError: 'Password does not match',
          notificationSuccess: 'Change password successfully',
          notificationError: 'Change password failed'
        }
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
      },
      forgotPassword: {
        title: 'Quên mật khẩu',
        phoneOrEmail: 'Nhập số điện thoại hoặc email',
        otp: 'Nhập mã xác nhận',
        sendOTP: 'Gửi OTP',
        button: 'Tiếp theo',
        notificationSuccessSendOTP: 'Mã OTP đã gửi',
        notificationErrorSendOTP: 'Gửi mã OTP thất bại',
        notificationErrorOTP: 'Mã OTP không đúng',
        newPassword: {
          title: 'Mật khẩu mới',
          password: 'Nhập mật khẩu mới',
          confirmPassword: 'Nhập lại mật khẩu mới',
          button: 'Xác nhận',
          passwordError: 'Mật khẩu không khớp',
          notificationSuccess: 'Đổi mật khẩu thành công',
          notificationError: 'Đổi mật khẩu thất bại'
        }
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
