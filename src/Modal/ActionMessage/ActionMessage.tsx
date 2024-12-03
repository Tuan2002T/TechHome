import React from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'

const MessageActionModal = ({
  modalVisible,
  toggleModal,
  closeModal,
  deleteMessage,
  checkMessage,
  saveMessage,
  userId
}) => {
  const { userData } = useSelector((state: any) => state.auth)
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <TouchableRipple onPress={closeModal} style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                userId !== userData.user.userId ? styles.disabledButton : null
              ]}
              disabled={userId !== userData.user.userId}
            >
              <Icon
                name="delete"
                size={28}
                color={userId !== userData.user.userId ? '#aaa' : '#333'}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.label,
                  userId !== userData.user.userId ? styles.disabledLabel : null
                ]}
              >
                Xoá
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={checkMessage}
              style={[
                styles.actionButton,
                userId !== userData.user.userId ? styles.disabledButton : null
              ]}
              disabled={userId !== userData.user.userId}
            >
              <Icon
                name="undo"
                size={28}
                color={userId !== userData.user.userId ? '#aaa' : '#333'}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.label,
                  userId !== userData.user.userId ? styles.disabledLabel : null
                ]}
              >
                Thu hồi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => saveMessage()}
              style={styles.actionButton}
            >
              <Icon
                name="content-copy"
                size={28}
                color="#333"
                style={styles.icon}
              />
              <Text style={styles.label}>Sao chép</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableRipple>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end'
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  icon: {
    marginBottom: 4
  },
  label: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600'
  },
  disabledButton: {
    backgroundColor: '#ddd'
  },
  disabledLabel: {
    color: '#aaa'
  }
})

export default MessageActionModal
