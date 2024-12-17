import axios from 'axios'
import API from '../../config/API_URL'

export const getAllAdvertisements = async (token) => {
  try {
    const response = await axios.get(API.getAllAdvertisements_url, {
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

export const createAdvertisement = async (token, data) => {
  try {
    const response = await axios.post(API.createAdvertisement_url, data, {
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

export const deleteAdvertisement = async (token, id) => {
  try {
    const response = await axios.delete(
      `${API.deleteAdvertisement_url}/${id}`,
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

export const updateAdvertisement = async (token, id, data) => {
  console.log('data', data)
  console.log('id', id)

  try {
    const response = await axios.put(
      `${API.updateAdvertisement_url}/${id}`,
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
    if (error.response) {
      console.log(error.response.data.message || 'Something went wrong')
    } else if (error.request) {
      console.log('No response received from the server')
    } else {
      console.log(error.message)
    }
  }
}
