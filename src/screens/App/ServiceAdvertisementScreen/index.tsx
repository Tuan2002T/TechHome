import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput
} from 'react-native'
import { Tab, TabView } from '@rneui/themed'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import {
  deleteOutsourcingService,
  getAllOutsourcingServices
} from '../../../api/API/outsourcingService'
import { useSelector } from 'react-redux'
import {
  deleteAdvertisement,
  getAllAdvertisements
} from '../../../api/API/advertisement'
import { showMessage } from 'react-native-flash-message'

interface Advertisement {
  advertisementId: string
  advertisementName: string
  advertisementContent: string
  advertisementImage: string
  adverLocation: string
  advertisementStatus: string
  createdAt: string
}

interface OutsourcingService {
  outsourcingServiceId: string
  outsourcingServiceName: string
  outsourcingServiceDescription: string
  adverLocation: string
  outsourcingServiceStatus: string
  outsourcingServiceImage: string
  outsourceServicePrice: string
  outsourcingServiceType: string
  outsourceServiceLocation: string
  resellerId: string
  createdAt: string
}

const ServiceAdvertisementScreen: React.FC = ({ navigation }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const { userData } = useSelector((state: any) => state.auth)

  const [searchQuery, setSearchQuery] = useState('')
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([])
  const [services, setServices] = useState<OutsourcingService[]>([])

  useEffect(() => {
    getAllOS()
    getAvertisement()
  }, [])

  const getAllOS = async () => {
    try {
      const response = await getAllOutsourcingServices(userData.token)

      const data = response.data.filter(
        (item: any) => item.residentId === userData.resident.residentId
      )
      setServices(data)
    } catch (error) {
      console.error(error)
    }
  }

  const getAvertisement = async () => {
    try {
      const response = await getAllAdvertisements(userData.token)
      const data = response.data.filter(
        (item: any) => item.residentId === userData.resident.residentId
      )
      setAdvertisements(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handledeleteAdvertisement = async (id: string) => {
    try {
      const response = await deleteAdvertisement(userData.token, id)
      showMessage({
        message: 'Quảng cáo đã được xóa!',
        type: 'success'
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteOutsourcingService = async (id: string) => {
    try {
      const response = await deleteOutsourcingService(userData.token, id)
      showMessage({
        message: 'Dịch vụ đã được xóa!',
        type: 'success'
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = (id: string, type: 'advertisement' | 'service') => {
    Alert.alert('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa mục này?', [
      {
        text: 'Hủy',
        style: 'cancel'
      },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          if (type === 'advertisement') {
            handledeleteAdvertisement(id)
            setAdvertisements(
              advertisements.filter((ad) => ad.advertisementId !== id)
            )
          } else {
            handleDeleteOutsourcingService(id)
            setServices(
              services.filter((service) => service.outsourcingServiceId !== id)
            )
          }
        }
      }
    ])
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const filteredAdvertisements = advertisements.filter(
    (ad) =>
      ad.advertisementName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.advertisementContent.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredServices = services.filter(
    (service) =>
      service.outsourcingServiceName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      service.outsourcingServiceDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  )

  const renderAdvertisementItem = ({ item }: { item: Advertisement }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.advertisementImage }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.advertisementName}</Text>
        <Text style={styles.cardText}>{item.advertisementContent}</Text>
        <Text style={styles.cardStatus}>
          {item.advertisementStatus === 'ACTIVE'
            ? 'Đã được kích hoạt'
            : 'Chưa được kích hoạt'}
        </Text>
        <Text style={styles.cardLocation}>📍 {item.adverLocation}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AdvertisementUpdate', { item })}
            style={styles.editButton}
          >
            <Text style={styles.buttonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.advertisementId, 'advertisement')}
          >
            <Text style={styles.buttonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  const renderServiceItem = ({ item }: { item: OutsourcingService }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.outsourcingServiceImage }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.outsourcingServiceName}</Text>
        <Text style={styles.cardText}>
          {item.outsourcingServiceDescription}
        </Text>
        <Text style={styles.cardText}>{item.outsourceServicePrice}</Text>
        <Text style={styles.cardLocation}>
          📍 {item.outsourceServiceLocation}
        </Text>
        <Text style={styles.cardStatus}>
          {item.outsourcingServiceStatus === 'ACTIVE'
            ? 'Đã được kích hoạt'
            : 'Chưa được kích hoạt'}
        </Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OutsourcingServiceUpdate', { item })
            }
            style={styles.editButton}
          >
            <Text style={styles.buttonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.outsourcingServiceId, 'service')}
          >
            <Text style={styles.buttonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome6Icon
          name="arrow-left"
          size={25}
          color="#FFFFFF"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Quảng cáo & Dịch vụ</Text>
        <Text style={styles.headerTitle}></Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <Tab value={tabIndex} onChange={setTabIndex} style={{ marginBottom: 10 }}>
        <Tab.Item title="Quảng cáo" titleStyle={styles.tabTitle} />
        <Tab.Item title="Dịch vụ" titleStyle={styles.tabTitle} />
      </Tab>

      <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
        <TabView.Item style={{ flex: 1 }}>
          <FlatList
            data={filteredAdvertisements}
            renderItem={renderAdvertisementItem}
            keyExtractor={(item) => item.advertisementId}
            ListEmptyComponent={
              <Text style={styles.emptyListText}>Không có quảng cáo nào</Text>
            }
          />
        </TabView.Item>
        <TabView.Item style={{ flex: 1 }}>
          <FlatList
            data={filteredServices}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.outsourcingServiceId}
            ListEmptyComponent={
              <Text style={styles.emptyListText}>Không có dịch vụ nào</Text>
            }
          />
        </TabView.Item>
      </TabView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  header: {
    width: '100%',
    height: 70,
    backgroundColor: '#007BFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007BFF'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 4,
    marginHorizontal: 10
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 8
  },
  cardContent: {
    padding: 15
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333'
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#28a745',
    marginBottom: 8
  },
  cardLocation: {
    fontSize: 13,
    color: '#777',
    marginBottom: 12
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  editButton: {
    flex: 1,
    marginRight: 5,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#28a745',
    alignItems: 'center'
  },
  deleteButton: {
    flex: 1,
    marginLeft: 5,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#dc3545',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  emptyListText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5
  }
})

export default ServiceAdvertisementScreen
