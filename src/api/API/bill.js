import axios from 'axios'
import API from '../../config/API_URL'

export const getAllBills = async (token) => {
  try {
    const response = await axios.get(API.getAllBills_url, {
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

// export createBill = async (token, data) => {
//   try {
//     const response = await axios.post(API.createBill_url, data, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       }
//     })

//     return response.data
//   } catch (error) {
//     if (error.response) {
//       throw new Error(error.response.data.message || 'Something went wrong')
//     } else if (error.request) {
//       throw new Error('No response received from the server')
//     } else {
//       throw new Error(error.message)
//     }
//   }
// }
