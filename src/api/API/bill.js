import axios from 'axios'
import API from '../../config/API_URL'

export const getAllBills = async (token) => {
  try {
    const response = await axios.get(API.getAllBills_url, {
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

export const createBill = async (token, data) => {
  try {
    const response = await axios.post(API.createBill_url, data, {
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
      console.log('No response received from the server')
    } else {
      console.log(error.message)
    }
  }
}
