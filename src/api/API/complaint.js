import axios from 'axios'
import API from '../../config/API_URL'

export const getAllComplaints = async (token) => {
  try {
    const response = await axios.get(API.getAllComplaints_url, {
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
