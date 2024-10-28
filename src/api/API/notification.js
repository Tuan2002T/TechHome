import axios from 'axios'
import API from '../../config/API_URL'

export const getAllNotification = async (token) => {
  try {
    const response = await axios.get(API.getAllNotification_url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Something went wrong')
    } else if (error.request) {
      throw new Error('No response received from the server')
    } else {
      throw new Error(error.message)
    }
  }
}

export const readNotification = async (token, id) => {
  try {
    const response = await axios.put(
      `${API.readNotification_url}/${id}`,
      {}, // Payload rỗng nếu không có dữ liệu nào được gửi
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Gửi token trong headers
        }
      }
    )
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Something went wrong')
    } else if (error.request) {
      throw new Error('No response received from the server')
    } else {
      throw new Error(error.message)
    }
  }
}

export const readAllNotification = async (token) => {
  try {
    const response = await axios.put(
      API.readAllNotification_url,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Something went wrong')
    } else if (error.request) {
      throw new Error('No response received from the server')
    } else {
      throw new Error(error.message)
    }
  }
}
