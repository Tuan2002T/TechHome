const API_URL = 'http://192.168.2.23:3000/resident'

const login_url = `${API_URL}/login`
const active_url = `${API_URL}/active`
const get_resident_no_active_by_idcard_url = `${API_URL}/getResidentNoActiveByIdcard`
const sendOTP_url = `${API_URL}/sendOTP`
const verifyOTP_url = `${API_URL}/verifyOTP`
const forgotPassword_url = `${API_URL}/forgotPassword`
// Xuất đối tượng chứa các URL
export default {
  login_url,
  active_url,
  get_resident_no_active_by_idcard_url,
  sendOTP_url,
  verifyOTP_url,
  forgotPassword_url
}
