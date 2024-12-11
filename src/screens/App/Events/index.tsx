import React from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import { Card, Title } from 'react-native-paper'
import { Calendar, MapPin, ArrowLeft } from 'lucide-react-native'

const events = [
  {
    id: '1',
    name: 'Lễ hội âm nhạc tại Hà Nội',
    description:
      'Lễ hội âm nhạc này sẽ có sự tham gia của các nghệ sĩ nổi tiếng trong và ngoài nước, diễn ra tại khu vực trung tâm Hà Nội. Đây là một sự kiện lớn trong năm với các màn trình diễn âm nhạc sôi động và hấp dẫn.',
    date: '2024-12-15',
    location: 'Quảng trường Ba Đình, Hà Nội'
  },
  {
    id: '2',
    name: 'Triển lãm nghệ thuật hiện đại tại TP.HCM',
    description:
      'Triển lãm này sẽ giới thiệu các tác phẩm nghệ thuật đương đại của các nghệ sĩ Việt Nam và quốc tế, từ hội họa đến điêu khắc. Đây là cơ hội để công chúng chiêm ngưỡng những tác phẩm nghệ thuật độc đáo và đầy sáng tạo.',
    date: '2024-12-18',
    location: 'Bảo tàng Mỹ thuật TP.HCM'
  },
  {
    id: '3',
    name: 'Giải chạy marathon quốc tế tại Đà Nẵng',
    description:
      'Giải marathon quốc tế tại Đà Nẵng thu hút hàng nghìn vận động viên từ khắp nơi trên thế giới. Các vận động viên sẽ chạy qua các tuyến đường đẹp nhất của thành phố và tận hưởng không khí biển trong lành.',
    date: '2024-12-22',
    location: 'Cầu Rồng, Đà Nẵng'
  },
  {
    id: '4',
    name: 'Hội thảo công nghệ AI tại Hà Nội',
    description:
      'Hội thảo này sẽ quy tụ các chuyên gia công nghệ hàng đầu trong lĩnh vực trí tuệ nhân tạo, chia sẻ những tiến bộ mới nhất trong nghiên cứu và ứng dụng AI. Đây là dịp để các nhà phát triển, doanh nghiệp và những người đam mê công nghệ giao lưu và học hỏi.',
    date: '2024-12-25',
    location: 'Trung tâm Hội nghị Quốc gia, Hà Nội'
  },
  {
    id: '5',
    name: 'Chợ Tết truyền thống tại TP.HCM',
    description:
      'Chợ Tết truyền thống là nơi bạn có thể tìm thấy các sản phẩm đặc trưng của Tết Nguyên Đán như hoa mai, hoa đào, mứt Tết và các đặc sản vùng miền. Đây là cơ hội tuyệt vời để chuẩn bị cho mùa Tết sum vầy.',
    date: '2024-12-28',
    location: 'Chợ Bến Thành, TP.HCM'
  },
  {
    id: '6',
    name: 'Lễ hội đêm Noel tại Đà Lạt',
    description:
      'Đến với Lễ hội đêm Noel tại Đà Lạt, du khách sẽ được trải nghiệm không khí lạnh giá, cùng các hoạt động giải trí đặc sắc, như diễu hành, trang trí cây thông Noel và nhiều chương trình văn nghệ đặc sắc.',
    date: '2024-12-24',
    location: 'Quảng trường Lâm Viên, Đà Lạt'
  },
  {
    id: '7',
    name: 'Chương trình từ thiện tại Hà Nội',
    description:
      'Chương trình từ thiện này được tổ chức nhằm hỗ trợ những hoàn cảnh khó khăn trong mùa đông, cung cấp quần áo, thực phẩm và đồ dùng thiết yếu cho các gia đình nghèo tại các khu vực ngoại thành Hà Nội.',
    date: '2024-12-29',
    location: 'Khu vực các xã ngoại thành, Hà Nội'
  },
  {
    id: '8',
    name: 'Festival phim Việt Nam tại TP.HCM',
    description:
      'Festival phim Việt Nam là nơi giới thiệu những bộ phim nổi bật trong năm, từ các bộ phim ngắn cho đến các tác phẩm điện ảnh. Đây là cơ hội để khán giả thưởng thức các tác phẩm nghệ thuật đậm chất văn hóa Việt.',
    date: '2024-12-30',
    location: 'Rạp chiếu phim Cinestar, TP.HCM'
  }
]

const EventCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Card style={styles.eventItem}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.eventTitle}>{item.name}</Title>
          </View>

          <View style={styles.eventDetailsContainer}>
            <View style={styles.eventDetailRow}>
              <Calendar size={20} color="#1a73e8" style={styles.icon} />
              <Text style={styles.eventDetails}>{item.date}</Text>
            </View>

            <View style={styles.eventDetailRow}>
              <MapPin size={20} color="#4CAF50" style={styles.icon} />
              <Text style={styles.eventDetails}>{item.location}</Text>
            </View>
          </View>

          <Text style={styles.eventDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
}

const Events = ({ navigation }) => {
  const handleEventPress = (event) => {
    // Placeholder for event details navigation or action
    console.log('Pressed event:', event.name)
  }

  const handleGoBack = () => {
    // Use navigation prop to go back to the previous screen
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#1a73e8" />
        </TouchableOpacity>
        <Text style={styles.title}>Danh sách sự kiện</Text>
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard item={item} onPress={() => handleEventPress(item)} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7'
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a73e8',
    textAlign: 'center'
  },
  cardContainer: {
    marginBottom: 12
  },
  eventItem: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardHeader: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
  eventDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 8
  },
  eventDetails: {
    fontSize: 16,
    color: '#666'
  },
  eventDescription: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic'
  }
})

export default Events
