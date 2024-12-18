import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

const AdvertisementDetail = ({ route }: any) => {
  const navigation = useNavigation()
  const { advertisement } = route.params

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#2e2e2e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết quảng cáo</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: advertisement.advertisementImage }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{advertisement.advertisementName}</Text>

          <View style={styles.detailRow}>
            <Icon name="location-outline" size={20} color="#666" />
            <Text style={styles.location}> {advertisement.adverLocation}</Text>
          </View>

          <Text style={styles.description}>
            {advertisement.advertisementContent}
          </Text>

          <View style={styles.detailRow}>
            <Icon name="calendar-outline" size={20} color="#666" />
            <Text style={styles.date}>
              Ngày tạo: {new Date(advertisement.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(230,230,230,0.7)',
    borderRadius: 20
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e2e2e',
    marginLeft: 16
  },
  container: {
    flexGrow: 1,
    paddingBottom: 20,
    backgroundColor: '#f8f8f8'
  },
  image: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20
  },
  textContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2e2e2e',
    marginBottom: 12,
    textAlign: 'center'
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  location: {
    fontSize: 16,
    color: '#444',
    marginLeft: 8
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 16,
    lineHeight: 22,
    textAlign: 'center'
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginLeft: 8
  }
})

export default AdvertisementDetail
