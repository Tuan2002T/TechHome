import axios from 'axios'
import API_URL from '../../config/API_URL'

export const getAllBuildingServices = async (token) => {
  try {
    const response = await axios.get(API_URL.getAllBuildingServices_url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}
