import axios from 'axios'
import API from '../../config/API_URL'

export const getAllOutsourcingServices = async (token) => {
  try {
    console.log(token)

    const response = await axios.get(API.getAllOutsourcingServices_url, {
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

export const createOutsourcingService = async (token, data) => {
  try {
    const response = await axios.post(API.createOutsourcingService_url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
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

export const deleteOutsourcingService = async (token, id) => {
  try {
    const response = await axios.delete(
      `${API.deleteOutsourcingService_url}/${id}`,
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

export const updateOutsourcingService = async (token, id, data) => {
  try {
    const response = await axios.put(
      `${API.updateOutsourcingService_url}/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  } catch (error) {
    console.log(error)

    if (error.response) {
      console.log(error.response.data.message || 'Something went wrong')
    } else if (error.request) {
      console.log('No response received from the server')
    } else {
      console.log(error.message)
    }
  }
}
