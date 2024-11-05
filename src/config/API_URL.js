const API_URL = 'http://192.168.2.23:3000/resident'
const API_CHAT_URL = 'http://192.168.2.23:3000/chat'
const API_SOCKET = 'http://192.168.2.23:3000'

const login_url = `${API_URL}/login`
const active_url = `${API_URL}/active`
const get_resident_no_active_by_idcard_url = `${API_URL}/getResidentNoActiveByIdcard`
const sendOTP_url = `${API_URL}/sendOTP`
const verifyOTP_url = `${API_URL}/verifyOTP`
const forgotPassword_url = `${API_URL}/forgotPassword`
const getAllNotification_url = `${API_URL}/getAllNotifications`
const readNotification_url = `${API_URL}/readNotification`
const readAllNotification_url = `${API_URL}/readAllNotification`
const getResidentApartmentInfo_url = `${API_URL}/getResidentApartmentInfo`
const getAllComplaints_url = `${API_URL}/getAllComplaints`
const getAllChats_url = `${API_CHAT_URL}/getAllChats`
const getAllMessagesByChatId_url = `${API_CHAT_URL}/getAllMessagesByChatId`
// Xuất đối tượng chứa các URL
export default {
  login_url,
  active_url,
  get_resident_no_active_by_idcard_url,
  sendOTP_url,
  verifyOTP_url,
  forgotPassword_url,
  getAllNotification_url,
  readNotification_url,
  readAllNotification_url,
  getResidentApartmentInfo_url,
  getAllComplaints_url,
  getAllChats_url,
  getAllMessagesByChatId_url,
  API_SOCKET
}
