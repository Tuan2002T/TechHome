import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import SwitchSelector from 'react-native-switch-selector'
import { SpeedDial } from '@rneui/themed'
import { NavigationProp } from '@react-navigation/native'
import {
  getAllBuidlingsAndFloorsAndApartments,
  getAllComplaints,
  sendComplaint
} from '../../../api/API/complaint'
import { useSelector } from 'react-redux'
import DropDown from '../../authentication/Custom/DropDownPicker'

interface Building {
  buildingId: string
  buildingName: string
}

interface Floor {
  floorId: string
  floorNumber: string
  buildingId: string
}

interface Apartment {
  apartmentId: string
  apartmentNumber: string
  floorId: string
}

interface Complaint {
  complainId: string
  complaintTitle: string
  complaintDate: string
  complaintStatus: string
}
interface FeedbackProps {
  navigation: NavigationProp<any>
}

const Feedback: React.FC<FeedbackProps> = ({ navigation }) => {
  const { userData } = useSelector((state: any) => state.auth)
  const [open, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('1')
  const [modalVisible, setModalVisible] = useState(false)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [buildings, setBuildings] = useState<Building[]>([])
  const [floors, setFloors] = useState<Floor[]>([])
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [complaintTitle, setComplaintTitle] = useState('')
  const [complaintDescription, setComplaintDescription] = useState('')
  const [idBuilding, setIdBuilding] = useState()
  const [idFloor, setIdFloor] = useState()
  const [idApartment, setIdApartment] = useState()
  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await getAllComplaints(userData.token)
        setComplaints(response)
      } catch (error) {
        console.error('Error:', error)
      } finally {
      }
    }
    const complaintsBuidingsFloorsApartments = async () => {
      try {
        const response = await getAllBuidlingsAndFloorsAndApartments(
          userData.token
        )

        setBuildings(response.buildings)
        setFloors(response.floors)
        setApartments(response.apartments)
      } catch (error) {
        console.error('Error:', error)
      } finally {
      }
    }
    getComplaints()
    complaintsBuidingsFloorsApartments()
  }, [])

  const handleSendComplaint = async () => {
    try {
      const data = {
        complaintTitle: complaintTitle,
        complaintDescription: complaintDescription,
        buildingId: idBuilding,
        floorId: idFloor,
        apartmentId: idApartment
      }
      const response = await sendComplaint(userData.token, data)
      setComplaints([...complaints, response])

      handleAddFeedback()
    } catch (error) {
      console.error('Error:', error)
    } finally {
    }
  }

  const options = [
    { label: 'Đang chờ xử lý', value: '1' },
    { label: 'Lịch sử', value: '1.5' }
  ]
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text style={styles.requestContent}>{item.complaintTitle}</Text>
      <Text style={styles.requestTime}>{formatDate(item.complaintDate)}</Text>
      {item.complaintStatus && (
        <Text style={styles.requestStatus}>{item.complaintStatus}</Text>
      )}
    </View>
  )

  const handleAddFeedback = () => {
    setModalVisible(false)
    setIdBuilding(undefined)
    setIdFloor(undefined)
    setIdApartment(undefined)
    setComplaintTitle('')
    setComplaintDescription('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ý kiến đánh giá</Text>
      </View>
      <View style={styles.content}>
        <SwitchSelector
          options={options}
          textColor={'black'}
          buttonColor={'#32AE63'}
          selectedColor={'white'}
          borderColor={'#32AE63'}
          borderRadius={12}
          valuePadding={3}
          hasPadding
          initial={0}
          onPress={(value) => setSelectedOption(value)}
          style={styles.switchSelector}
        />
        {selectedOption === '1' ? (
          <FlatList
            data={complaints.filter(
              (item) => item.complaintStatus === 'Pending'
            )}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.complainId}
            style={styles.list}
          />
        ) : (
          <FlatList
            data={
              complaints.filter((item) => item.complaintStatus !== 'Pending') ||
              []
            }
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        )}
      </View>

      <SpeedDial
        isOpen={open}
        icon={{ name: 'edit', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        overlayColor="rgba(0, 0, 0, 0.6)"
        buttonStyle={{
          backgroundColor: '#32AE63',
          borderRadius: 30
        }}
      >
        <SpeedDial.Action
          icon={{ name: 'add', color: '#fff' }}
          title="Add"
          onPress={() => {
            setModalVisible(true), setOpen(!open)
          }}
          buttonStyle={{
            backgroundColor: '#32AE63',
            borderRadius: 25
          }}
        />
        <SpeedDial.Action
          icon={{ name: 'delete', color: '#fff' }}
          title="Delete"
          onPress={() => console.log('Delete Something')}
          buttonStyle={{
            backgroundColor: '#32AE63',
            borderRadius: 25
          }}
        />
      </SpeedDial>

      {/* Modal để gửi ý kiến */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Gửi ý kiến</Text>
            <Text>Chọn Tòa nhà:</Text>
            <DropDown
              value={idBuilding}
              style={styles.input}
              zIndex={3000}
              onValueChange={(value) => {
                setIdBuilding(value)
                setFloors(floors.filter((floor) => floor.buildingId === value))
              }}
              items={
                buildings.map((building) => ({
                  label: building.buildingName,
                  value: building.buildingId
                })) || []
              }
            />
            <Text>Chọn Tầng:</Text>
            <DropDown
              value={idFloor}
              style={styles.input}
              zIndex={2000}
              onValueChange={(value) => {
                setIdFloor(value)
              }}
              items={
                floors.map((floor) => ({
                  label: floor.floorNumber,
                  value: floor.floorId
                })) || []
              }
            />
            <Text>Chọn số phòng:</Text>
            <DropDown
              value={idApartment}
              style={styles.input}
              zIndex={1000}
              onValueChange={(value) => {
                setIdApartment(value)
                console.log(parseInt(value))
              }}
              items={
                apartments.map((apartment) => ({
                  label: apartment.apartmentNumber,
                  value: apartment.apartmentId
                })) || []
              }
            />
            <Text>Tiêu đề:</Text>
            <TextInput
              style={styles.input}
              value={complaintTitle}
              onChangeText={setComplaintTitle}
              placeholder="Nhập Phòng"
            />
            <Text>Nội dung:</Text>
            <TextInput
              style={styles.textArea}
              value={complaintDescription}
              onChangeText={setComplaintDescription}
              placeholder="Nhập nội dung ý kiến"
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity
              onPress={handleSendComplaint}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Gửi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false)
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9'
  },
  header: {
    width: '100%',
    height: 150,
    backgroundColor: '#32AE63',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 35
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
    height: '80%'
  },
  switchSelector: {
    width: '90%'
  },
  list: {
    width: '90%',
    marginTop: 20
  },
  requestItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2
  },
  requestContent: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  requestTime: {
    fontSize: 14,
    color: '#888',
    marginTop: 5
  },
  requestStatus: {
    fontSize: 14,
    color: '#32AE63',
    marginTop: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    elevation: 10
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#32AE63'
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333'
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    textAlignVertical: 'top'
  },
  submitButton: {
    backgroundColor: '#32AE63',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  closeButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default Feedback
