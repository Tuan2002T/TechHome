import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {
  AirConditioner,
  Badminton,
  Basketball,
  Broom,
  Gym,
  LightningBolt,
  MenuSquared,
  Playground,
  Pool,
  Tennis,
  TV,
  WashByHand,
  WashingMachine,
  Water,
  Weber
} from '../Component/FacilitiesComponent.tsx'
import { NavigationProp } from '@react-navigation/native'
import { getAllBuildingServices } from '../../../api/API/service.js'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface ServiceProps {
  navigation: NavigationProp<any>
}

const Service: React.FC<ServiceProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const dataServices = [
    {
      id: '1',
      icon: <TV width={40} height={40} />,
      name: t('screen.service.service.tv'),
      description:
        'Dịch vụ sửa chữa tất cả các loại TV bao gồm LCD, LED, OLED và Smart TV. Đội ngũ kỹ thuật viên có hơn 5 năm kinh nghiệm sẽ kiểm tra, chẩn đoán và khắc phục sự cố ngay tại nhà.',
      price: '100,000 - 300,000 VNĐ',
      contact: 'Hotline: 1900 1234',
      availability: '8:00 - 18:00 từ Thứ 2 đến Chủ Nhật',
      location: 'Tầng Kỹ Thuật, Chung Cư',
      estimatedTime: '30 - 60 phút',
      warranty: 'Bảo hành 3 tháng với linh kiện thay thế',
      notes:
        'Dịch vụ bao gồm kiểm tra miễn phí trong trường hợp không sửa chữa được tại chỗ.'
    },
    {
      id: '2',
      icon: <AirConditioner width={40} height={40} />,
      name: t('screen.service.service.airConditioner'),
      description:
        'Bảo trì, sửa chữa và vệ sinh điều hòa treo tường, âm trần. Dịch vụ này đảm bảo điều hòa hoạt động tốt, tiết kiệm điện và kéo dài tuổi thọ thiết bị.',
      price: '150,000 - 500,000 VNĐ',
      contact: 'Hotline: 1900 5678',
      availability: '9:00 - 17:00 từ Thứ 2 đến Thứ 7',
      location: 'Tầng Hầm, Chung Cư',
      estimatedTime: '45 - 90 phút',
      warranty: 'Bảo hành 6 tháng',
      notes:
        'Dịch vụ bao gồm vệ sinh dàn lạnh và kiểm tra gas điều hòa. Phụ thu thêm nếu cần nạp gas mới.'
    },
    {
      id: '3',
      icon: <WashingMachine width={40} height={40} />,
      name: t('screen.service.service.washingMachine'),
      description:
        'Sửa chữa các lỗi như máy giặt không cấp nước, không vắt, kêu to, hoặc báo lỗi không hoạt động. Chúng tôi cam kết sử dụng linh kiện chính hãng.',
      price: '120,000 - 400,000 VNĐ',
      contact: 'Hotline: 1900 7890',
      availability: '8:00 - 17:30 từ Thứ 2 đến Thứ 6',
      location: 'Tầng Kỹ Thuật, Chung Cư',
      estimatedTime: '30 - 60 phút',
      warranty: 'Bảo hành 6 tháng',
      notes: 'Giảm giá 10% khi sửa chữa từ 2 thiết bị trở lên.'
    },
    {
      id: '4',
      icon: <Water width={40} height={40} />,
      name: t('screen.service.service.plumbing'),
      description:
        'Dịch vụ sửa chữa các vấn đề về đường ống nước như rò rỉ, tắc nghẽn, thay thế vòi nước và lắp đặt hệ thống nước mới.',
      price: '80,000 - 250,000 VNĐ',
      contact: 'Hotline: 1900 6543',
      availability: '7:30 - 16:30 hàng ngày',
      location: 'Tầng Kỹ Thuật, Chung Cư',
      estimatedTime: '60 phút',
      warranty: 'Không áp dụng bảo hành',
      notes: 'Vui lòng cung cấp ảnh chụp vị trí hư hỏng để hỗ trợ nhanh hơn.'
    },
    {
      id: '5',
      icon: <WashByHand width={40} height={40} />,
      name: t('screen.service.service.laundry'),
      description:
        'Dịch vụ giặt ủi chuyên nghiệp với trang thiết bị hiện đại, đảm bảo quần áo được giặt sạch, phơi khô và gấp gọn.',
      price: '15,000 VNĐ/kg (giặt thường), 30,000 VNĐ/kg (giặt hấp)',
      contact: 'Hotline: 1900 1111',
      availability: '6:00 - 20:00 từ Thứ 2 đến Chủ Nhật',
      location: 'Tầng Thương Mại, Chung Cư',
      estimatedTime: '1 - 2 giờ',
      warranty: 'Không áp dụng bảo hành',
      notes: 'Ưu đãi giảm giá 20% cho đơn hàng trên 10kg vào ngày Chủ Nhật.'
    },
    {
      id: '6',
      icon: <Broom width={40} height={40} />,
      name: t('screen.service.service.cleanup'),
      description:
        'Dọn dẹp căn hộ theo yêu cầu: lau sàn, lau kính, vệ sinh phòng tắm, và làm sạch bếp. Đội ngũ nhân viên chuyên nghiệp, được đào tạo bài bản.',
      price: '50,000 VNĐ/giờ',
      contact: 'Hotline: 1900 2222',
      availability: '8:00 - 17:00 từ Thứ 2 đến Thứ 6',
      location: 'Tầng Dịch Vụ, Chung Cư',
      estimatedTime: 'Tùy thuộc vào diện tích căn hộ',
      warranty: 'Không áp dụng bảo hành',
      notes:
        'Khách hàng cần đặt lịch trước 24 giờ để đảm bảo thời gian phục vụ.'
    },
    {
      id: '7',
      icon: <LightningBolt width={40} height={40} />,
      name: t('screen.service.service.electricity'),
      description:
        'Sửa chữa hệ thống điện, thay bóng đèn, sửa chập điện hoặc cài đặt thiết bị điện mới. Đảm bảo an toàn tuyệt đối cho cư dân.',
      price: '200,000 - 500,000 VNĐ',
      contact: 'Hotline: 1900 3333',
      availability: '9:00 - 16:30 từ Thứ 2 đến Thứ 6',
      location: 'Tầng Kỹ Thuật, Chung Cư',
      estimatedTime: '30 - 90 phút',
      warranty: 'Bảo hành 12 tháng',
      notes: 'Kiểm tra miễn phí nếu sử dụng dịch vụ thay thế thiết bị mới.'
    },
    {
      id: '8',
      icon: <MenuSquared width={40} height={40} />,
      name: t('screen.service.service.other'),
      description:
        'Danh sách tổng hợp các dịch vụ tiện ích khác dành riêng cho cư dân, bao gồm tư vấn và hỗ trợ đặc biệt.',
      price: 'Theo yêu cầu',
      contact: 'Hotline: 1900 0000',
      availability: '24/7',
      location: 'Trung Tâm Dịch Vụ, Chung Cư',
      estimatedTime: 'Tùy theo dịch vụ',
      warranty: 'Tùy thuộc vào từng loại dịch vụ',
      notes: 'Liên hệ để được tư vấn chi tiết các dịch vụ khác.'
    }
  ]

  const dataUtilities = [
    {
      id: '1',
      icon: <Pool width={40} height={40} />,
      name: t('screen.service.facility.swimmingPool'),
      description:
        'Bể bơi với không gian thoáng mát, sạch sẽ, phục vụ cho cư dân chung cư. Được thiết kế nhỏ gọn nhưng tiện nghi, phù hợp cho các hoạt động thư giãn và tập luyện.',
      location:
        'Khu vực sân sau của chung cư, gần khu vực cây xanh, tạo cảm giác thoải mái.',
      availability:
        'Mở cửa từ 6:00 sáng đến 20:00 tối, với giờ nghỉ trưa từ 12:00 đến 13:00.',
      contact:
        'Liên hệ với ban quản lý qua số điện thoại hoặc trực tiếp tại văn phòng để đăng ký và biết thêm chi tiết.'
    },
    {
      id: '2',
      icon: <Gym width={40} height={40} />,
      name: t('screen.service.facility.gym'),
      description:
        'Phòng gym trang bị đầy đủ các thiết bị thể hình cơ bản như máy chạy bộ, máy tập tạ và các dụng cụ thể dục khác. Không gian rộng rãi, thoáng mát, phục vụ cho việc tập luyện và rèn luyện sức khỏe.',
      location: 'Tầng trệt, dễ dàng tiếp cận từ lối vào chính của chung cư.',
      availability:
        'Giờ mở cửa từ 6:00 sáng đến 22:00 tối. Lưu ý có thể có sự thay đổi giờ vào các ngày lễ.',
      contact:
        'Liên hệ trực tiếp với lễ tân để được hướng dẫn sử dụng phòng gym hoặc yêu cầu tư vấn về chương trình tập luyện.'
    },
    {
      id: '3',
      icon: <Playground width={40} height={40} />,
      name: t('screen.service.facility.playground'),
      description:
        'Khu vui chơi ngoài trời dành cho trẻ em với các thiết bị như xích đu, cầu trượt, bập bênh, an toàn và được bảo trì thường xuyên. Không gian vui chơi giúp trẻ phát triển thể chất và tinh thần.',
      location:
        'Sân chung cư, khu vực dễ tiếp cận với mọi cư dân, đặc biệt là các gia đình có trẻ nhỏ.',
      availability:
        'Mở cửa từ 6:00 sáng đến 21:00 tối. Tuy nhiên, khu vui chơi sẽ tạm dừng hoạt động vào những ngày trời mưa lớn.',
      contact:
        'Ban quản lý chung cư sẽ cung cấp thêm thông tin về các sự kiện hoặc hoạt động đặc biệt trong khu vui chơi.'
    },
    {
      id: '4',
      icon: <Weber width={40} height={40} />,
      name: t('screen.service.facility.bbq'),
      description:
        'Khu vực BBQ ngoài trời được trang bị đầy đủ bếp nướng, bàn ghế và các vật dụng cần thiết. Đây là nơi lý tưởng để tổ chức tiệc nướng, gặp gỡ bạn bè hoặc các buổi tiệc gia đình.',
      location: 'Sân sau chung cư, không gian mở với gió mát và tầm nhìn đẹp.',
      availability:
        'Hoạt động theo lịch đăng ký. Các cư dân có thể đặt lịch sử dụng khu BBQ qua lễ tân hoặc ban quản lý.',
      contact:
        'Để đặt khu BBQ hoặc biết thêm chi tiết, vui lòng liên hệ lễ tân hoặc ban quản lý chung cư.'
    },
    {
      id: '5',
      icon: <Tennis width={40} height={40} />,
      name: t('screen.service.facility.tenis'),
      description:
        'Sân tennis được thiết kế chuyên nghiệp với bề mặt sân chất lượng cao, phục vụ cho các trận đấu thể thao giữa các cư dân. Không gian thoáng đãng, lý tưởng cho các buổi tập luyện và thi đấu.',
      location: 'Khu vực phía đông chung cư, dễ dàng tìm thấy và tiếp cận.',
      availability:
        'Sân mở cửa từ 5:00 sáng đến 21:00 tối. Sân có thể được đặt trước qua lễ tân để đảm bảo thời gian sử dụng.',
      contact:
        'Liên hệ lễ tân để đặt sân tennis hoặc tìm hiểu về các chương trình khuyến mãi và sự kiện đặc biệt.'
    },
    {
      id: '6',
      icon: <Badminton width={40} height={40} />,
      name: t('screen.service.facility.badminton'),
      description:
        'Sân cầu lông tiêu chuẩn với mặt sân mềm, không gian đủ rộng để chơi thể thao. Đây là nơi lý tưởng để cư dân thư giãn hoặc thi đấu cùng bạn bè và người thân.',
      location:
        'Sân thượng của chung cư, không gian thoáng đãng và có tầm nhìn rộng.',
      availability:
        'Mở cửa từ 6:00 sáng đến 20:00 tối. Ban quản lý sẽ hỗ trợ trong việc đặt lịch chơi sân cầu lông.',
      contact:
        'Liên hệ với ban quản lý để đặt lịch hoặc tham gia các lớp học cầu lông.'
    },
    {
      id: '7',
      icon: <Basketball width={40} height={40} />,
      name: t('screen.service.facility.basketball'),
      description:
        'Sân bóng rổ mini với các trang thiết bị đầy đủ phục vụ cho các trận đấu vui vẻ giữa cư dân. Không gian sân rộng rãi, phù hợp cho cả việc tập luyện và thi đấu.',
      location: 'Sân trước chung cư, dễ tiếp cận từ lối vào chính.',
      availability:
        'Mở cửa từ 6:00 sáng đến 20:00 tối, phù hợp cho việc tập luyện cá nhân hoặc thi đấu giữa các đội.',
      contact:
        'Để đặt sân hoặc tham gia các giải đấu, vui lòng liên hệ ban quản lý chung cư.'
    },
    {
      id: '8',
      icon: <MenuSquared width={40} height={40} />,
      name: t('screen.service.facility.other'),
      description:
        'Nhà hàng phục vụ các món ăn đa dạng từ Á đến Âu, phù hợp cho các bữa ăn gia đình hoặc tiếp khách. Món ăn được chế biến từ nguyên liệu tươi ngon, đảm bảo vệ sinh an toàn thực phẩm.',
      location:
        'Tầng trệt của chung cư, dễ dàng tìm thấy và là nơi lý tưởng để thưởng thức bữa ăn cùng gia đình hoặc bạn bè.',
      availability:
        'Mở cửa từ 8:00 sáng đến 22:00 tối. Nhà hàng có dịch vụ đặt bàn và phục vụ tiệc cho các sự kiện.',
      contact:
        'Gọi lễ tân để đặt bàn hoặc tìm hiểu về thực đơn và các chương trình khuyến mãi đặc biệt.'
    }
  ]
  const [data, setData] = useState([])
  const { userData } = useSelector((state: any) => state.auth)

  useEffect(() => {
    getAllService()
  }, [])

  const getAllService = async () => {
    try {
      const response = await getAllBuildingServices(userData.token)

      setData(response)
    } catch (error) {
      console.error(error)
    }
  }

  const renderItem = (item) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('BookService')}
      >
        {item.icon}
      </TouchableOpacity>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('screen.service.title')}</Text>
      </View>

      <View style={{ width: '95%' }}>
        <Text style={styles.headerList}>
          {t('screen.service.service.title')}
        </Text>
        <View style={styles.grid}>
          {dataServices.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <TouchableOpacity
                style={styles.item}
                disabled={item.id === '8'}
                onPress={() =>
                  navigation.navigate('BookService', {
                    item: {
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      contact: item.contact,
                      availability: item.availability,
                      location: item.location,
                      estimatedTime: item.estimatedTime,
                      warranty: item.warranty,
                      notes: item.notes
                    }
                  })
                }
              >
                {item.icon}
              </TouchableOpacity>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ width: '95%' }}>
        <Text style={styles.headerList}>
          {' '}
          {t('screen.service.facility.title')}
        </Text>
        <View style={styles.grid}>
          {dataUtilities.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <TouchableOpacity
                style={styles.item}
                disabled={item.id === '8'}
                onPress={() =>
                  navigation.navigate('Facilities', {
                    item: {
                      name: item.name,
                      description: item.description,
                      location: item.location,
                      availability: item.availability,
                      contact: item.contact
                    }
                  })
                }
              >
                {item.icon}
              </TouchableOpacity>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
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
    height: 150,
    backgroundColor: '#32AE63',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 35
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  itemContainer: {
    alignItems: 'center',
    margin: 5,
    width: '22%'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerList: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    color: 'black'
  },
  itemText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: 'gray'
  }
})

export default Service
