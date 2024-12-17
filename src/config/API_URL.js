const BASE_URL = 'http://192.168.2.23:3000'
// const BASE_URL = 'https://d2a1-116-111-185-128.ngrok-free.app'

const API_URL = `${BASE_URL}/resident`
const API_CHAT_URL = `${BASE_URL}/chat`
const API_SOCKET = BASE_URL
const API_ADVERTISEMENT_URL = `${BASE_URL}/advertisement`

const login_url = `${API_URL}/login`
const updateTokenFCM_url = `${API_URL}/updateTokenFCM`
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
const getAllFilesByChatId_url = `${API_CHAT_URL}/getAllFilesByChatId`
const sendMessageAI_url = `${API_CHAT_URL}/sendChatBot`
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
const getBuildings_url = `${API_URL}/getBuildings`
const getFloorsByBuildingId_url = `${API_URL}/getFloorsByBuildingId`
const getApartmentsByFloorId_url = `${API_URL}/getApartmentsByFloorId`
const getAllEvents_url = `${API_URL}/getAllEvents`
const getBills_url = `${API_URL}/getBills`
//SERVICEPROVIDER
const getAllAdvertisements_url = `${API_ADVERTISEMENT_URL}/getAllAdvertisements`
const createAdvertisement_url = `${API_ADVERTISEMENT_URL}/createAdvertisement`
const deleteAdvertisement_url = `${API_ADVERTISEMENT_URL}/deleteAdvertisement`
const updateAdvertisement_url = `${API_ADVERTISEMENT_URL}/updateAdvertisement`

//Our Services
const getAllOutsourcingServices_url = `${API_ADVERTISEMENT_URL}/getAllOutsourcingServices`
const createOutsourcingService_url = `${API_ADVERTISEMENT_URL}/createOutsourcingService`
const deleteOutsourcingService_url = `${API_ADVERTISEMENT_URL}/deleteOutsourcingService`
const updateOutsourcingService_url = `${API_ADVERTISEMENT_URL}/updateOutsourcingService`

export default {
  login_url,
  updateTokenFCM_url,
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
  getBuildings_url,
  getFloorsByBuildingId_url,
  getApartmentsByFloorId_url,
  getAllChats_url,
  getAllMessagesByChatId_url,
  getAllFilesByChatId_url,
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
  sendMessageAI_url,
  getAllEvents_url,
  getBills_url,

  //SERVICEPROVIDER
  getAllAdvertisements_url,
  createAdvertisement_url,
  deleteAdvertisement_url,
  updateAdvertisement_url,

  //Our Services
  getAllOutsourcingServices_url,
  createOutsourcingService_url,
  deleteOutsourcingService_url,
  updateOutsourcingService_url,
  API_SOCKET
}
