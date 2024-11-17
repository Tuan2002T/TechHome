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
    const response = await axios.put(API.forgotPassword_url, data, {
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

export const update = async (data, token) => {
  try {
    const formData = new FormData()

    if (data.fullname) formData.append('fullname', data.fullname)
    if (data.email) formData.append('email', data.email)
    if (data.password) formData.append('password', data.password)
    if (data.idcard) formData.append('idcard', data.idcard)
    if (data.phonenumber) formData.append('phonenumber', data.phonenumber)
    if (data.username) formData.append('username', data.username)

    if (data.file) {
      formData.append('file', {
        uri: data.file.uri,
        name: data.file.name,
        type: data.file.type
      })
    }

    const response = await axios.put(API.update_url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}
