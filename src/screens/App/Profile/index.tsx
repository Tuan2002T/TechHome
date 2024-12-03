import React, { useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity
} from 'react-native'
import ButtonCustom from '../../authentication/Custom/ButtonCustom'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Switch } from '@rneui/themed'
import { socket } from '../../../Socket/socket'
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions, NavigationProp } from '@react-navigation/native'
import { clearPersistedData } from '../../../redux/Persist/data'
import { setRememberMe } from '../../../redux/Slice/userSlice'

interface ProfileProps {
  navigation: NavigationProp<any>
}

const Profile = ({ navigation }: ProfileProps) => {
  const { userData } = useSelector((state: any) => state.auth)
  const [value, setValue] = useState(false)
  const [language, setLanguage] = useState('Tiếng Việt')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch()

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    toggleModal()
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hearderText}>Tài khoản</Text>
      </View>
      <View style={styles.profile}>
        <Image
          source={{
            uri: 'https://media.hanamtv.vn/upload/image/202203/medium/73654_2f4fe64533b5115490e234952f1db0c6.jpg'
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.textName}>Trương Văn Tuấn</Text>
          <Text style={styles.textPhone}>03123213121</Text>
        </View>
      </View>
      <View style={styles.setting}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <AntDesign name="profile" size={20} color="black" />
          <Text style={styles.textSetting}>Chỉnh sửa thông tin hồ sơ</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Fontisto name="bell" size={20} color="black" />
            <Text style={styles.textSetting}>Thông báo</Text>
          </View>
          <Switch
            color="#2089dc"
            value={value}
            onValueChange={() => setValue(!value)}
          />
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="language" size={20} color="black" />
              <Text style={styles.textSetting}>Ngôn ngữ</Text>
            </View>
            <Text style={styles.textSettingForcus}>{language}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal for Language Selection */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn ngôn ngữ</Text>
            <TouchableOpacity
              onPress={() => handleLanguageChange('Tiếng Việt')}
            >
              <Text style={styles.modalText}>Tiếng Việt</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('English')}>
              <Text style={styles.modalText}>English</Text>
            </TouchableOpacity>

            {/* Custom Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Other settings sections */}
      <View style={styles.setting}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="help-circle-outline" size={25} color="black" />
          <Text style={styles.textSetting}>Trợ giúp & Hỗ trợ</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10
          }}
        >
          <AntDesign name="contacts" size={23} color="black" />
          <Text style={styles.textSetting}>Liên hệ</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="lock-outline" size={25} color="black" />
          <Text style={styles.textSetting}>Chính sách bảo mật</Text>
        </View>
      </View>
      <View style={styles.setting}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="security" size={20} color="black" />
          <Text style={styles.textSetting}>Bảo mật</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name="light-up" size={20} color="black" />
            <Text style={styles.textSetting}>Màn hình</Text>
          </View>
          <Text style={styles.textSettingForcus}>Sáng</Text>
        </View>
      </View>
      <ButtonCustom
        title="Đăng xuất"
        buttonStyle={{ width: 260, backgroundColor: '#AE0000' }}
        containerStyle={{
          width: 260,
          backgroundColor: '#AE0000',
          marginTop: 30
        }}
        titleStyle={{ color: 'white', fontSize: 15 }}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Authentication' }]
            })
          )
          const userId = userData.user.userId
          socket.emit('userOffline', userId)
          clearPersistedData()
          dispatch(setRememberMe(false))
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    marginVertical: 10
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2089dc',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F7F9'
  },
  header: {
    width: '100%',
    height: 180,
    backgroundColor: '#FEAE73'
  },
  hearderText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 65,
    marginLeft: 35
  },
  profile: {
    width: '85%',
    height: 120,
    backgroundColor: 'white',
    marginTop: -65,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50
  },
  textName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: 'black'
  },
  textPhone: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 15
  },
  setting: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
    padding: 15,
    justifyContent: 'center'
  },
  textSetting: {
    marginLeft: 20,
    fontSize: 16,
    color: 'black',
    fontWeight: '600'
  },
  textSettingForcus: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600'
  }
})

export default Profile
