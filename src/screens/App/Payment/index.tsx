import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Modal,
  Share,
  ScrollView
} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFA from 'react-native-vector-icons/FontAwesome5'
import Clipboard from '@react-native-clipboard/clipboard'
import { NavigationProp } from '@react-navigation/native'
import { cancelledPayment } from '../../../api/API/payment'
import { useSelector } from 'react-redux'

const { width } = Dimensions.get('window')

interface PaymentLink {
  bin: string
  accountNumber: string
  accountName: string
  amount: number
  description: string
  orderCode: number
  currency: string
  paymentLinkId: string
  status: string
  checkoutUrl: string
  qrCode: string
}

interface Service {
  id: number
  name: string
  description: string
  price: string
  contact: string
  availability: string
  location: string
  estimatedTime: string
  warranty: string
  notes: string
}

interface PaymentProps {
  navigation: NavigationProp<any>
  route: {
    params: {
      item: PaymentLink
    }
  }
}

const Payment = ({ navigation, route }) => {
  const { userData } = useSelector((state: any) => state.auth)
  const [modalVisible, setModalVisible] = useState(false)
  const [qrValue, setQrValue] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [paymentLink, setPaymentLink] = useState<PaymentLink>(
    route.params.response.paymentLink
  )
  console.log(route.params.response.paymentLink)

  const paymentDetails = {
    recipientName: paymentLink.accountName,
    amount: paymentLink.amount,
    content: paymentLink.description,
    bankName: 'Vietcombank',
    accountNumber: paymentLink.accountNumber,
    qrContent: paymentLink.qrCode
  }

  const handleCancelledPayment = async () => {
    try {
      const response = await cancelledPayment(
        userData.token,
        paymentLink.orderCode
      )
      console.log('Cancelled Payment:', response)
      if (response) {
        navigation.navigate('Home')
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const handleCopy = async (content, title) => {
    setQrValue(content)
    setModalTitle(title)
    setModalVisible(true)
  }

  const copyToClipboard = async (content) => {
    try {
      await Clipboard.setString(content)
      Alert.alert('Thành công!', 'Nội dung đã được sao chép.', [
        { text: 'OK', style: 'default' }
      ])
      setModalVisible(false)
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể sao chép nội dung')
    }
  }

  const handleShare = async (content) => {
    try {
      await Share.share({
        message: content
      })
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chia sẻ nội dung')
    }
  }

  const CopyModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <Text style={styles.modalText}>{qrValue}</Text>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.copyButton]}
              onPress={() => copyToClipboard(qrValue)}
            >
              <Icon name="content-copy" size={20} color="#fff" />
              <Text style={styles.buttonText}>Sao chép</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.shareButton]}
              onPress={() => handleShare(qrValue)}
            >
              <Icon name="share" size={20} color="#fff" />
              <Text style={styles.buttonText}>Chia sẻ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <CopyModal />

      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Thanh Toán</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.bankCard}>
          <View style={styles.bankHeader}>
            <IconFA name="university" size={20} color="#4A90E2" />
            <Text style={styles.bankName}>{paymentDetails.bankName}</Text>
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.accountLabel}>Số tài khoản:</Text>
            <View style={styles.accountNumberContainer}>
              <Text style={styles.accountNumber}>
                {paymentDetails.accountNumber}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Clipboard.setString(paymentDetails.accountNumber)
                }
              >
                <Icon name="content-copy" size={20} color="#4A90E2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.qrContainer}>
          <View style={styles.qrWrapper}>
            <QRCode
              value={paymentDetails.qrContent}
              size={width * 0.6}
              color="black"
              backgroundColor="white"
            />
          </View>
          <TouchableOpacity
            style={styles.copyQrButton}
            onPress={() =>
              handleCopy(paymentDetails.content, 'Nội dung chuyển khoản')
            }
          >
            <Icon name="content-copy" size={20} color="#fff" />
            <Text style={styles.copyQrText}>Sao chép thông tin</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Người nhận</Text>
            <Text style={styles.detailValue}>
              {paymentDetails.recipientName}
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Số tiền</Text>
            <Text style={[styles.detailValue, styles.amountText]}>
              {paymentDetails.amount}
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nội dung</Text>
            <Text style={styles.detailValue}>{paymentDetails.content}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => {
          Alert.alert(
            'Hủy thanh toán',
            'Bạn có chắc chắn muốn hủy thanh toán này?',
            [
              {
                text: 'Hủy',
                style: 'cancel'
              },
              {
                text: 'Đồng ý',
                onPress: () => {
                  handleCancelledPayment()
                  navigation.goBack()
                }
              }
            ],
            { cancelable: false }
          )
        }}
      >
        <Text style={styles.cancelButtonText}>Hủy Thanh Toán</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#4A90E2',
    justifyContent: 'center'
  },
  backBtn: {
    padding: 8
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16
  },
  content: {
    flex: 1,
    padding: 16
  },
  bankCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  bankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  bankName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8
  },
  accountInfo: {
    marginTop: 4
  },
  accountLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4
  },
  accountNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  accountNumber: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500'
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  qrWrapper: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  copyQrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16
  },
  copyQrText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  },
  detailLabel: {
    fontSize: 14,
    color: '#7F8C8D'
  },
  detailValue: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500'
  },
  amountText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600'
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 4
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
    maxHeight: '70%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50'
  },
  closeButton: {
    padding: 4
  },
  modalBody: {
    padding: 16,
    maxHeight: '60%'
  },
  modalText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5'
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 140,
    justifyContent: 'center'
  },
  copyButton: {
    backgroundColor: '#4A90E2'
  },
  shareButton: {
    backgroundColor: '#4CAF50'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8
  },
  cancelButton: {
    paddingVertical: 15,
    width: '60%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#E74C3C',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    marginBottom: 60
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  }
})

export default Payment
