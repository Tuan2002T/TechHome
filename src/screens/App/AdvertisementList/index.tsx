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
import { getAllAdvertisements } from '../../../api/API/advertisement'
import { useSelector } from 'react-redux'

interface Advertisement {
  advertisementId: number
  advertisementName: string
  advertisementContent: string
  advertisementImage: string
  adverLocation: string
  createdAt: string
  updatedAt: string
}

const AdvertisementList: React.FC = ({ navigation }) => {
  const { userData } = useSelector((state: any) => state.auth)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([])
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    getAvertisement()
  }, [])

  const getAvertisement = async () => {
    try {
      const response = await getAllAdvertisements(userData.token)
      console.log('API Response:', response)
      const data = response.advertisements.filter(
        (item: any) => item.advertisementStatus === 'ACTIVE'
      )
      setAdvertisements(data)
    } catch (error) {
      console.error('API Error:', error)
    }
  }

  const filteredAndPaginatedAds = useMemo(() => {
    const filtered = advertisements.filter(
      (ad) =>
        ad.advertisementName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        ad.advertisementContent
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        ad.adverLocation.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE

    return {
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
      data: filtered.slice(startIndex, endIndex)
    }
  }, [searchQuery, currentPage, advertisements])

  const renderAdvertisementItem = ({ item }: { item: Advertisement }) => (
    <Card style={styles.advertisementContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AdvertisementDetail', { advertisement: item })
        }
        style={styles.cardContent}
      >
        <Image
          source={{ uri: item.advertisementImage }}
          style={styles.advertisementImage}
          resizeMode="cover"
        />
        <View style={styles.advertisementDetails}>
          <Text style={styles.advertisementName}>{item.advertisementName}</Text>
          {/* <Text style={styles.advertisementContent} numberOfLines={2}> */}
          {/* {item.advertisementContent}
          </Text> */}
          {/* <Text style={styles.advertisementLocation}>{item.adverLocation}</Text> */}
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
        Trang {currentPage} / {filteredAndPaginatedAds.totalPages}
      </Text>
      <IconButton
        icon={() => <Icon name="arrow-forward" size={24} />}
        disabled={currentPage >= filteredAndPaginatedAds.totalPages}
        onPress={() => setCurrentPage((prev) => prev + 1)}
      />
    </Surface>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Danh Sách Quảng Cáo" />
      </Appbar.Header>
      <Searchbar
        placeholder="Tìm kiếm quảng cáo..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredAndPaginatedAds.data}
        renderItem={renderAdvertisementItem}
        keyExtractor={(item) => item.advertisementId.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có quảng cáo nào</Text>
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
  advertisementContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  advertisementImage: {
    width: '100%',
    height: 200,
    borderRadius: 8
  },
  advertisementDetails: {
    flex: 1,
    padding: 12,
    alignItems: 'center'
  },
  advertisementName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  advertisementContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  advertisementLocation: {
    fontSize: 12,
    color: '#999'
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

export default AdvertisementList
