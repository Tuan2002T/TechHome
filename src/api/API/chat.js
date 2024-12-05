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
  limit = 20
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
    formData.append('message', message.inputText)

    if (message.files && Array.isArray(message.files)) {
      message.files.forEach((file, index) => {
        formData.append('files', {
          uri:
            Platform.OS === 'android'
              ? file.uri
              : file.uri.replace('file://', ''),
          name: file.name || `file-${index}`,
          type: file.type || 'application/octet-stream'
        })
      })
    }

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
    if (error.response) {
      console.log('Server Error:', error.response.data)
      console.log('Status Code:', error.response.status)
    } else if (error.request) {
      console.log('No Response Received:', error.request)
    } else {
      console.log('Error Setting Up Request:', error.message)
    }
    throw error
  }
}

export const deleteMessage = async (token, messageId) => {
  try {
    const response = await axios.delete(
      `${API_URL.deleteMessage_url}/${messageId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(response)

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const sendMessageAI = async (token, message) => {
  try {
    console.log('sendMessageAI', message)
    console.log('token', token)

    const response = await axios.post(
      API_URL.sendMessageAI_url,
      {
        message: message
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log('dddddddđ', response)

    return response.data
  } catch (error) {
    console.log(error)
  }
}
