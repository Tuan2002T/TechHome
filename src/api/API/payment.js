import axios from 'axios'
import API from '../../config/API_URL'

export const createPayment = async (token, data) => {
  console.log('data', data)

  try {
    const response = await axios.post(API.createPayment_url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response.data)
    } else if (error.request) {
      console.log('No response received from the server')
    } else {
      console.log(error.message)
    }
  }
}

export const cancelledPayment = async (token, orderCode) => {
  try {
    const response = await axios.post(
      API.cancelledPayment_url,
      {
        orderCode: orderCode
      },
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
    if (error.response) {
      console.log(error.response.data)
    } else if (error.request) {
      console.log('No response received from the server')
    } else {
      console.log(error.message)
    }
  }
}
