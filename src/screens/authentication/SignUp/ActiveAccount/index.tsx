import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextInputCustom from '../../Custom/TextInputCustom.tsx';
import ButtonCustom from '../../Custom/ButtonCustom.tsx';
import TextInputPasswordCustom from '../../Custom/TextInputPasswordCustom.tsx';

function ActiveAccount({ navigation, route }) {
  const residentData = route.params?.residentData;

  // Sử dụng useState để lưu giá trị có thể chỉnh sửa
  const [idcard, setIdcard] = useState(residentData?.idcard || '');
  const [fullname, setFullname] = useState(residentData?.fullname || '');
  const [phonenumber, setPhonenumber] = useState(residentData?.phonenumber || '');
  const [email, setEmail] = useState(residentData?.email || '');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <MaterialIcons
        onPress={() => navigation.goBack()}
        style={styles.buttonLeft}
        name="keyboard-arrow-left"
        size={38}
        color="#000000"
      />
      <Text style={styles.title}>Kích hoạt tài khoản</Text>
      <Text style={styles.text}>Nhập thông tin tài khoản mật khẩu</Text>

      <TextInputCustom
        placeholder="Nhập CMND/CCCD"
        value={idcard}
        onChangeText={setIdcard}
        editable={false}
      />
      <TextInputCustom
        placeholder="Căn hộ"
        value={fullname}
        onChangeText={setFullname}
        editable={false}
      />
      <TextInputCustom
        placeholder="Nhập tên"
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInputCustom
        placeholder="Nhập số điện thoại"
        value={phonenumber}
        onChangeText={setPhonenumber}
      />
      <TextInputCustom
        placeholder="Nhập email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInputPasswordCustom
        value={password}
        onChangeText={setPassword}
      />

      <ButtonCustom title="Xác nhận" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonLeft: {
    borderRadius: 100,
    borderWidth: 1,
    width: 41,
    marginTop: 75,
    marginLeft: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    color: 'black',
    marginLeft: 40,
    marginTop: 70,
  },
  text: {
    fontSize: 12,
    color: '#94989B',
    marginLeft: 40,
    marginBottom: 45,
  },
});

export default ActiveAccount;
