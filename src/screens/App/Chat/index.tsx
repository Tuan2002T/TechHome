import React, { useState } from 'react';
import { 
  FlatList, 
  Modal, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { SpeedDial } from '@rneui/themed';

function Chat() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [feedback, setFeedback] = useState('');

  const pendingRequests = [
    { id: '1', content: 'Yêu cầu sửa điện', time: '12:00 - 21/10/2024' },
    { id: '2', content: 'Yêu cầu sửa ống nước', time: '09:30 - 22/10/2024' },
  ];

  const historyRequests = [
    { id: '1', content: 'Sửa máy lạnh', time: '14:00 - 20/10/2024', status: 'Đã giải quyết' },
    { id: '2', content: 'Thay bóng đèn', time: '10:00 - 18/10/2024', status: 'Đã giải quyết' },
  ];

  const options = [
    { label: 'Đang chờ xử lý', value: '1' },
    { label: 'Lịch sử', value: '1.5' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text style={styles.requestContent}>{item.content}</Text>
      <Text style={styles.requestTime}>{item.time}</Text>
      {item.status && <Text style={styles.requestStatus}>{item.status}</Text>}
    </View>
  );

  const handleAddFeedback = () => {
    // Logic để xử lý gửi ý kiến
    console.log('Gửi ý kiến:', {
      building: selectedBuilding,
      floor: selectedFloor,
      room: selectedRoom,
      feedback,
    });
    // Đóng modal sau khi gửi
    setModalVisible(false);
    // Reset form
    setSelectedBuilding('');
    setSelectedFloor('');
    setSelectedRoom('');
    setFeedback('');
    setOpen(!open)
  };

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
            data={pendingRequests}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        ) : (
          <FlatList
            data={historyRequests}
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
          borderRadius: 30,
        }}
      >
        <SpeedDial.Action
          icon={{ name: 'add', color: '#fff' }}
          title="Add"
          onPress={() => setModalVisible(true)}
          buttonStyle={{
            backgroundColor: '#32AE63',
            borderRadius: 25,
          }}
        />
        <SpeedDial.Action
          icon={{ name: 'delete', color: '#fff' }}
          title="Delete"
          onPress={() => console.log('Delete Something')}
          buttonStyle={{
            backgroundColor: '#32AE63',
            borderRadius: 25,
          }}
        />
      </SpeedDial>

      {/* Modal để gửi ý kiến */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Gửi ý kiến</Text>
            <Text>Chọn Tòa nhà:</Text>
            <TextInput
              style={styles.input}
              value={selectedBuilding}
              onChangeText={setSelectedBuilding}
              placeholder="Nhập Tòa nhà"
            />
            <Text>Chọn Tầng:</Text>
            <TextInput
              style={styles.input}
              value={selectedFloor}
              onChangeText={setSelectedFloor}
              placeholder="Nhập Tầng"
            />
            <Text>Chọn Phòng:</Text>
            <TextInput
              style={styles.input}
              value={selectedRoom}
              onChangeText={setSelectedRoom}
              placeholder="Nhập Phòng"
            />
            <Text>Nội dung:</Text>
            <TextInput
              style={styles.textArea}
              value={feedback}
              onChangeText={setFeedback}
              placeholder="Nhập nội dung ý kiến"
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity onPress={handleAddFeedback} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Gửi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setModalVisible(false), setOpen(!open)}} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
  },
  header: {
    width: '100%',
    height: 150,
    backgroundColor: '#32AE63',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 35,
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
  },
  switchSelector: {
    width: '90%',
    marginTop: 20,
  },
  list: {
    width: '90%',
    marginTop: 20,
  },
  requestItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  requestContent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  requestTime: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  requestStatus: {
    fontSize: 14,
    color: '#32AE63',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20, 
  },
  modalContent: {
    width: '90%', 
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#32AE63', 
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10, 
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#32AE63',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Chat;