import axios from 'axios'
import API_URL from '../../config/API_URL'

export const getAllChats = async (token) => {
  try {
    const response = await axios.get(API_URL.getAllChats_url, {
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

export const getAllMessagesByChatId = async (token, chatId) => {
  try {
    const response = await axios.get(
      `${API_URL.getAllMessagesByChatId_url}/${chatId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}
