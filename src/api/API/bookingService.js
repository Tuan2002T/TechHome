import axios from 'axios'
import API from '../../config/API_URL'

export const getAllBookings = async (token) => {
  try {
    const response = await axios.get(API.getAllBookings_url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message || 'Something went wrong')
    } else if (error.request) {
      console.log(error.response.data.message || 'Something went wrong')
    } else {
      console.log(error.response.data.message || 'Something went wrong')
    }
  }
}

export const bookingService = async (token, serviceId) => {
  try {
    const response = await axios.post(
      `${API.bookingService_url}/${serviceId}`,
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
      console.log(error.response.data.message || 'Something went wrong')
    } else if (error.request) {
      console.log('No response received from the server')
    } else {
      console.log(error.message)
    }
  }
}

export const bookingServiceForOutsourcing = async (token, serviceId) => {
  try {
    const response = await axios.post(
      `${API.bookingService_url}/${serviceId}`,
      {
        type: 'outsourcing'
      },
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
      console.log(error.response.data.message || 'Something went wrong')
    } else if (error.request) {
      console.log('No response received from the server')
    } else {
      console.log(error.message)
    }
  }
}
