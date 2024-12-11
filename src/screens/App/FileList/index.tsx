import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Linking
} from 'react-native'
import { getFiles } from '../../../api/API/chat'
import { useSelector } from 'react-redux'
import Video from 'react-native-video'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import SpinnerLoading from '../../../Spinner/spinnerloading'
import Notification from '../../../Modal/Notification/notification'
import ImageViewerModal from '../Component/ImageViewerModal'

// Get screen dimensions
const { width } = Dimensions.get('window')
const ITEM_WIDTH = (width - 60) / 3

const FileListScreen = ({ navigation, route }) => {
  const { userData } = useSelector((state: any) => state.auth)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [notification, setNotification] = useState('')
  const [listImages, setListImages] = useState([])
  const [listVideos, setListVideos] = useState([])
  const [listFiles, setListFiles] = useState([])

  const closeNotification = () => {
    setError(false)
    setLoading(false)
  }

  const getAllFiles = async () => {
    setLoading(true)
    try {
      const response = await getFiles(userData.token, route.params.chatId)
      const sortedFiles = {
        images: [],
        videos: [],
        documents: []
      }

      response.files.forEach((file) => {
        switch (file.fileType) {
          case 'image':
            sortedFiles.images.push(file)
            break
          case 'video':
            sortedFiles.videos.push(file)
            break
          case 'document':
            sortedFiles.documents.push(file)
            break
        }
      })

      setListImages(sortedFiles.images)
      setListVideos(sortedFiles.videos)
      setListFiles(sortedFiles.documents)
      setLoading(false)
    } catch (error) {
      setError(true)
      setNotification('Lấy tin nhắn thất bại')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllFiles()
  }, [])

  const renderFileItem = ({ item, type }) => {
    const handleDocumentPress = () => {
      Linking.openURL(item.fileUrl)
    }

    return (
      <TouchableOpacity
        style={styles.fileItemContainer}
        onPress={() => {
          if (type === 'image' || type === 'video') {
            openImageViewer(item.fileUrl, item.fileType)
          } else if (type === 'document') {
            handleDocumentPress()
          }
        }}
      >
        {type === 'image' && (
          <Image
            source={{ uri: item.fileUrl }}
            style={styles.mediaItem}
            resizeMode="cover"
          />
        )}

        {type === 'video' && (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: item.fileUrl }}
              style={styles.mediaItem}
              resizeMode="cover"
              controls={false}
              paused={true}
            />
            <View style={styles.videoOverlay}>
              <MaterialIcon name="play-circle-fill" size={50} color="#fff" />
            </View>
          </View>
        )}

        {type === 'document' && (
          <View style={styles.documentItem}>
            <AntDesignIcon name="filetext1" size={50} color="#007bff" />
            <Text style={styles.documentText} numberOfLines={2}>
              {item.fileName}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    )
  }

  const FileSection = ({ title, data, type }) =>
    data.length > 0 ? (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={data}
          renderItem={(props) => renderFileItem({ ...props, type })}
          keyExtractor={(item) => `${item.fileId}-${item.fileName}`}
          horizontal={false}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    ) : null
  const [isImageViewerVisible, setImageViewerVisible] = useState(false)
  const [imageUri, setImageUri] = useState('')
  const [typeViewer, setTypeViewer] = useState('')

  const openImageViewer = (uri: string, type) => {
    setImageUri(uri)
    setTypeViewer(type)
    setImageViewerVisible(true)
  }

  const closeImageViewer = () => {
    setImageViewerVisible(false)
  }
  return (
    <View style={styles.container}>
      <SpinnerLoading loading={loading} />
      <Notification
        loading={error}
        message={notification}
        onClose={closeNotification}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tệp tin</Text>
      </View>

      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <FileSection title="Video" data={listVideos} type="video" />
        <FileSection title="Hình ảnh" data={listImages} type="image" />
        <FileSection title="Tài liệu" data={listFiles} type="document" />
      </ScrollView>
      <ImageViewerModal
        isVisible={isImageViewerVisible}
        imageUri={
          imageUri ||
          'https://techhomearchive.s3.ap-southeast-1.amazonaws.com/defautavatar.jpg'
        }
        onClose={closeImageViewer}
        type={typeViewer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 4
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 15
  },
  backButton: {
    padding: 5
  },
  contentContainer: {
    flex: 1,
    padding: 20
  },
  sectionContainer: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10
  },
  fileItemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  mediaItem: {
    width: '100%',
    height: '100%'
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  documentItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  documentText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center'
  },
  columnWrapper: {
    justifyContent: 'flex-start'
  }
})

export default FileListScreen
