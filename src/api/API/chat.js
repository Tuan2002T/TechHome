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

export const getAllMessagesByChatId = async (
  token,
  chatId,
  offset = 0,
  limit = 10
) => {
  try {
    const response = await axios.get(
      `${API_URL.getAllMessagesByChatId_url}/${chatId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        params: {
          offset,
          limit
        }
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const sendMessages = async (token, chatId, message) => {
  try {
    const formData = new FormData()
    formData.append('message', message)

    // Nếu bạn có tệp, bạn có thể thêm chúng vào `formData`
    // Ví dụ:
    // formData.append("Files", file);

    const response = await axios.post(
      `${API_URL.sendMessages_url}/${chatId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(
      'Error sending message:',
      error.response ? error.response.data : error.message
    )
  }
}
