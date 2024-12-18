import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Text, Appbar, Button, Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'

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

interface Props {
  route: any
  navigation: any
}

const OutsourcingServiceDetail: React.FC<Props> = ({ route, navigation }) => {
  const { outsourcingService } = route.params

  const {
    outsourcingServiceName,
    outsourcingServiceDescription,
    outsourcingServiceImage,
    outsourceServicePrice,
    outsourceServiceLocation,
    outsourcingServiceType
  } = outsourcingService
  const formatCurrency = (amount: string) => {
    const number = parseFloat(amount.replace(/[^\d.-]/g, ''))
    if (isNaN(number)) return amount

    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(number)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Chi Tiết Dịch Vụ" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Image
            source={{ uri: outsourcingServiceImage }}
            style={styles.serviceImage}
            resizeMode="cover"
          />
          <View style={styles.cardContent}>
            <Text style={styles.serviceName}>{outsourcingServiceName}</Text>
            <View style={styles.serviceInfoRow}>
              <Icon name="briefcase" size={16} color="#6200ea" />
              <Text style={styles.serviceInfoText}>
                {outsourcingServiceType === 'FOOD'
                  ? 'Đồ ăn'
                  : outsourcingServiceType === 'DRINKS'
                  ? 'Đồ uống'
                  : 'Dịch vụ khác'}
              </Text>
            </View>
            <View style={styles.serviceInfoRow}>
              <Icon name="location" size={16} color="#6200ea" />
              <Text style={styles.serviceInfoText}>
                {outsourceServiceLocation}
              </Text>
            </View>
            <View style={styles.serviceInfoRow}>
              <Icon name="cash" size={16} color="#e91e63" />
              <Text style={styles.servicePrice}>
                {formatCurrency(outsourceServicePrice)}
              </Text>
            </View>
            <Text style={styles.serviceDescription}>
              {outsourcingServiceDescription}
            </Text>
          </View>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => alert('Đặt dịch vụ thành công!')}
            style={styles.bookButton}
            labelStyle={styles.bookButtonLabel}
          >
            Đặt Dịch Vụ
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  appbar: {
    backgroundColor: '#A4C3A2',
    elevation: 4
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 60,
    padding: 16,
    backgroundColor: '#f9f9f9'
  },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    elevation: 8,
    backgroundColor: '#ffffff'
  },
  serviceImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  cardContent: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  serviceInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  serviceInfoText: {
    fontSize: 16,
    color: '#6200ea',
    marginLeft: 8
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 12,
    marginLeft: 8
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  bookButton: {
    backgroundColor: '#5D7B6F',
    width: '80%',
    borderRadius: 50,
    paddingVertical: 12,
    marginBottom: 30
  },
  bookButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
})

export default OutsourcingServiceDetail
