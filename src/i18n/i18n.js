import i18n, { t } from 'i18next'
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
          notificationSuccess: 'Password changed successfully',
          notificationError: 'Failed to change password'
        }
      },
      screen: {
        home: {
          welcome: 'Welcome',
          button: {
            home: 'Apartment',
            payment: 'Payment',
            notification: 'Notifications',
            sendFeedback: 'Send Feedback'
          },
          dashboard: {
            title: 'Monthly Expenses'
          }
        },
        chat: {
          title: 'Messages',
          select: {
            all: 'General',
            admin: 'Management'
          },
          newMessage: 'New message'
        },
        service: {
          title: 'Services and Facilities',
          service: {
            title: 'Services',
            tv: 'TV Repair',
            airConditioner: 'Air Conditioner Repair',
            washingMachine: 'Washing Machine Repair',
            plumbing: 'Plumbing Repair',
            laundry: 'Laundry',
            cleanup: 'Cleaning',
            electricity: 'Electric Repair',
            other: 'More'
          },
          facility: {
            title: 'Facilities',
            swimmingPool: 'Swimming Pool',
            gym: 'Gym',
            playground: 'Playground',
            bbq: 'BBQ Area',
            tenis: 'Tennis Court',
            badminton: 'Badminton Court',
            basketball: 'Basketball Court',
            other: 'More'
          }
        },
        bill: {
          title: 'Bill',
          select: {
            payment: 'Payment',
            history: 'Transaction History'
          },
          table: {
            type: 'Fee Type',
            month: 'Month',
            amount: 'Amount'
          },
          total: 'Total Outstanding',
          provisional: 'Provisional',
          button: 'Pay'
        },
        profile: {
          title: 'Profile',
          editProfile: 'Edit Profile Information',
          notification: 'Notifications',
          language: 'Language',
          supportandFeedback: 'Support and Feedback',
          contact: 'Contact',
          privacypolicy: 'Privacy Policy',
          logout: 'Logout'
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
      },
      screen: {
        home: {
          welcome: 'Xin chào',
          button: {
            home: 'Căn hộ',
            payment: 'Thanh toán',
            notification: 'Thông báo',
            sendFeedback: 'Gửi ý kiến'
          },
          dashboard: {
            title: 'Chi Tiêu Hàng Tháng'
          }
        },
        chat: {
          title: 'Tin nhắn',
          select: {
            all: 'Chung',
            admin: 'Ban quản lý'
          },
          newMessage: 'Tin nhắn mới'
        },
        service: {
          title: 'Dịch vụ và tiện ích',
          service: {
            title: 'Dịch vụ',
            tv: 'Sửa TV',
            airConditioner: 'Sửa điều hòa',
            washingMachine: 'Sửa máy giặt',
            plumbing: 'Sửa ống nước',
            laundry: 'Giặt là',
            cleanup: 'Dọn dẹp',
            electricity: 'Sửa điện',
            other: 'Thêm'
          },
          facility: {
            title: 'Tiện ích',
            swimmingPool: 'Bể bơi',
            gym: 'Phòng Gym',
            playground: 'Khu vui chơi',
            bbq: 'Khu BBQ',
            tenis: 'Sân Tennis',
            badminton: 'Sân cầu lông',
            basketball: 'Sân bóng rổ',
            other: 'Thêm'
          }
        },
        bill: {
          title: 'Hóa đơn',
          select: {
            payment: 'Thanh toán',
            history: 'Lịch sử giao dịch'
          },
          table: {
            type: 'Loại phí',
            month: 'Tháng',
            amount: 'Thành tiền'
          },
          total: 'Tổng nợ dư',
          provisional: 'Tạm tính',
          button: 'Thanh toán'
        },
        profile: {
          title: 'Tài khoản',
          editProfile: 'Chỉnh sửa thông tin hồ sơ',
          notification: 'Thông báo',
          language: 'Ngôn ngữ',
          supportandFeedback: 'Hỗ trợ và góp ý',
          contact: 'Liên hệ',
          privacypolicy: 'Chính sách bảo mật',
          logout: 'Đăng xuất'
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
