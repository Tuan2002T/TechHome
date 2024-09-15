import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import ButtonCustom from '../../authentication/Custom/ButtonCustom'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Switch } from '@rneui/themed'

function Profile({ navigation }) {
  const [value, setValue] = useState(false)
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="profile" size={20} color="black" />
          <Text style={styles.textSetting}>Chỉnh sửa thông tin hồ sơ</Text>
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
            <Fontisto name="bell" size={20} color="black" />
            <Text style={styles.textSetting}>Thông báo</Text>
          </View>
          <Switch
            color="#2089dc"
            value={value}
            onValueChange={() => setValue(!value)}
          />
        </View>
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
          <Text style={styles.textSettingForcus}>Tiếng Việt</Text>
        </View>
      </View>
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
        containerStyle={{ width: 260, backgroundColor: '#AE0000' }}
        titleStyle={{ color: 'white', fontSize: 15 }}
        onPress={() => {
          navigation.navigate('SignIn')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
    fontSize: 16,
    color: 'black',
    marginLeft: 10
  },
  textSettingForcus: {
    fontSize: 16,
    color: '#2089dc'
  }
})

export default Profile
