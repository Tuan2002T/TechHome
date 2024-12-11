import axios from 'axios'
import API from '../../config/API_URL'

export const getAllComplaints = async (token) => {
  try {
    const response = await axios.get(API.getAllComplaints_url, {
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

export const getAllBuidlingsAndFloorsAndApartments = async (token) => {
  try {
    const response = await axios.get(
      API.getAllBuidlingsAndFloorsAndApartments_url,
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
      console.log(error.response)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log(error.message)
    }
  }
}

export const sendComplaint = async (token, data) => {
  try {
    const changeData = {}
    const {
      complaintTitle,
      complaintContent,
      buildingId,
      floorId,
      apartmentId
    } = data
    changeData.complaintTitle = complaintTitle
    changeData.complaintContent = complaintContent
    if (buildingId !== null) {
      changeData.buildingId = buildingId
    }
    if (floorId !== null) {
      changeData.floorId = floorId
    }
    if (apartmentId !== null) {
      changeData.apartmentId = apartmentId
    }

    const response = await axios.post(API.sendComplaint_url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data)

    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log(error.message)
    }
  }
}

export const deleteComplaint = async (token, complaintId) => {
  try {
    const response = await axios.delete(
      `${API.deleteComplaint_url}/${complaintId}`,
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
      console.log(error.response)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log(error.message)
    }
  }
}

export const getBuildings = async (token) => {
  try {
    console.log(token)

    const response = await axios.get(API.getBuildings_url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    console.log('123', response.data)

    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log(error.message)
    }
  }
}

export const getFloorsByBuildingId = async (token, buildingId) => {
  try {
    const response = await axios.get(
      `${API.getFloorsByBuildingId_url}/${buildingId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(response.data)

    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log(error.message)
    }
  }
}

export const getApartmentsByFloorId = async (token, floorId) => {
  try {
    const response = await axios.get(
      `${API.getApartmentsByFloorId_url}/${floorId}`,
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
      console.log(error.response)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log(error.message)
    }
  }
}
