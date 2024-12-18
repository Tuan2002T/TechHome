import React, { useState, useMemo, useEffect } from 'react'
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import {
  Text,
  Searchbar,
  IconButton,
  Surface,
  Card,
  Appbar
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { getAllOutsourcingServices } from '../../../api/API/outsourcingService'
import { useSelector } from 'react-redux'

interface OutsourcingService {
  outsourcingServiceId: number
  outsourcingServiceName: string
  outsourcingServiceDescription: string
  outsourcingServiceImage: string
  outsourceServicePrice: string
  outsourceServiceLocation: string
  outsourcingServiceType: string
  createdAt: string
  updatedAt: string
}

const OutsourcingServiceList: React.FC = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { userData } = useSelector((state: any) => state.auth)
  const [services, setServices] = useState<OutsourcingService[]>([])
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    getAllOS()
  }, [])
  const formatCurrency = (amount: string) => {
    const number = parseFloat(amount.replace(/[^\d.-]/g, ''))
    if (isNaN(number)) return amount

    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(number)
  }
  const getAllOS = async () => {
    try {
      const response = await getAllOutsourcingServices(userData.token)

      const data = response.outsourcingServices.filter(
        (item: any) => item.outsourcingServiceStatus === 'ACTIVE'
      )
      setServices(data)
    } catch (error) {
      console.error(error)
    }
  }

  const filteredAndPaginatedServices = useMemo(() => {
    const filtered = services.filter(
      (service) =>
        service.outsourcingServiceName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        service.outsourcingServiceDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        service.outsourceServiceLocation
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    )

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE

    return {
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
      data: filtered.slice(startIndex, endIndex)
    }
  }, [searchQuery, currentPage, services])

  const renderServiceItem = ({ item }: { item: OutsourcingService }) => (
    <Card style={styles.serviceContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('OutsourcingServiceDetail', {
            outsourcingService: item
          })
        }
        style={styles.cardContent}
      >
        <Image
          source={{ uri: item.outsourcingServiceImage }}
          style={styles.serviceImage}
          resizeMode="cover"
        />
        <View style={styles.serviceDetails}>
          <Text style={styles.serviceName} numberOfLines={1}>
            {item.outsourcingServiceName}
          </Text>
          <Text style={styles.servicePrice}>
            {formatCurrency(item.outsourceServicePrice)} VND
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  )

  const renderPagination = () => (
    <Surface style={styles.paginationContainer}>
      <IconButton
        icon={() => <Icon name="arrow-back" size={24} />}
        disabled={currentPage <= 1}
        onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
      />
      <Text style={styles.pageText}>
        Trang {currentPage} / {filteredAndPaginatedServices.totalPages}
      </Text>
      <IconButton
        icon={() => <Icon name="arrow-forward" size={24} />}
        disabled={currentPage >= filteredAndPaginatedServices.totalPages}
        onPress={() => setCurrentPage((prev) => prev + 1)}
      />
    </Surface>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Danh Sách Dịch Vụ Thuê Ngoài" />
      </Appbar.Header>
      <Searchbar
        placeholder="Tìm kiếm dịch vụ..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredAndPaginatedServices.data}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.outsourcingServiceId.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có dịch vụ nào</Text>
          </View>
        }
        contentContainerStyle={styles.listContainer}
      />
      {renderPagination()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  searchbar: {
    margin: 16,
    borderRadius: 8
  },
  listContainer: {
    paddingBottom: 16
  },
  serviceContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  serviceDetails: {
    flex: 1,
    padding: 12,
    justifyContent: 'center'
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333'
  },
  servicePrice: {
    fontSize: 14,
    color: '#333',
    marginTop: 4
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  pageText: {
    fontSize: 16,
    marginHorizontal: 20
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  emptyText: {
    fontSize: 18,
    color: '#888'
  }
})

export default OutsourcingServiceList
