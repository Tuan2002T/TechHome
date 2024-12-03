const API_URL = 'https://42e1-116-111-184-229.ngrok-free.app/resident'
const API_CHAT_URL = 'https://42e1-116-111-184-229.ngrok-free.app/chat'
const API_SOCKET = 'https://42e1-116-111-184-229.ngrok-free.app'

const login_url = `${API_URL}/login`
const active_url = `${API_URL}/active`
const update_url = `${API_URL}/update`
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
const sendMessages_url = `${API_CHAT_URL}/sendMessages`
const deleteMessage_url = `${API_CHAT_URL}/deleteMessage`
const getAllBuildingServices_url = `${API_URL}/getAllBuildingServices`
const getAllBuidlingsAndFloorsAndApartments_url = `${API_URL}/getAllBuidlingsAndFloorsAndApartments`
const sendComplaint_url = `${API_URL}/sendComplaint`
const deleteComplaint_url = `${API_URL}/deleteComplaint`
const getAllBills_url = `${API_URL}/getAllBills`
const refreshToken_url = `${API_URL}/refreshToken`
const createPayment_url = `${API_URL}/createPayment`
const cancelledPayment_url = `${API_URL}/cancelledPayment`
const bookingService_url = `${API_URL}/bookingService`

export default {
  login_url,
  refreshToken_url,
  active_url,
  update_url,
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
  sendMessages_url,
  deleteMessage_url,
  getAllBuildingServices_url,
  getAllBuidlingsAndFloorsAndApartments_url,
  sendComplaint_url,
  getAllBills_url,
  deleteComplaint_url,
  createPayment_url,
  bookingService_url,
  cancelledPayment_url,
  API_SOCKET
}
