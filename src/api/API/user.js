import axios from 'axios'
import API from '../../config/API_URL'

export const loginResident = async (loginData) => {
  try {
    const response = await axios.post(API.login_url, loginData, {
      headers: {
        'Content-Type': 'application/json'
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

export const activeResident = async (activeData) => {
  console.log(activeData)

  try {
    const response = await axios.put(API.active_url, activeData, {
      headers: {
        'Content-Type': 'application/json'
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

export const getResidentNoActiveByIdcard = async (idcard) => {
  try {
    const response = await axios.get(
      API.get_resident_no_active_by_idcard_url + '/' + idcard,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
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

export const sendOTP = async (to) => {
  try {
    const response = await axios.post(
      API.sendOTP_url,
      { to },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
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

export const verifyOTP = async (data) => {
  console.log(data)

  try {
    const response = await axios.post(API.verifyOTP_url, data, {
      headers: {
        'Content-Type': 'application/json'
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

export const forgotPassword = async (data) => {
  try {
    const response = await axios.post(API.forgotPassword_url, data, {
      headers: {
        'Content-Type': 'application/json'
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
