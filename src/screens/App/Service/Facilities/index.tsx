import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { NavigationProp } from '@react-navigation/native'

interface Facility {
  id: string
  icon: JSX.Element
  name: string
  description: string
  location: string
  availability: string
  contact: string
}

interface FacilityInfoRow {
  icon: string
  title: string
  value: string
}

interface FacilitiesProps {
  navigation: NavigationProp<any>
  route: {
    params: {
      item: Facility
    }
  }
}

export default function Facilities({ navigation, route }: FacilitiesProps) {
  const [facility, setFacility] = React.useState<Facility>(route.params.item)

  const FacilityInfoRow = ({ icon, title, value }: FacilityInfoRow) => (
    <View style={styles.infoRow}>
      <FeatherIcon
        name={icon}
        size={20}
        color="#32AE63"
        style={styles.infoIcon}
      />
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoTitle}>{title}:</Text>
        <Text style={styles.info}>{value}</Text>
      </View>
    </View>
  )

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết cơ sở vật chất</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.iconContainer}>{facility.icon}</View>

        <Text style={styles.title}>{facility.name}</Text>
        <Text style={styles.description}>{facility.description}</Text>

        <View style={styles.infoContainer}>
          <FacilityInfoRow
            icon="map-pin"
            title="Địa điểm"
            value={facility.location}
          />
          <FacilityInfoRow
            icon="clock"
            title="Giờ làm việc"
            value={facility.availability}
          />
          <FacilityInfoRow
            icon="phone"
            title="Liên hệ"
            value={facility.contact}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f9',
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#32AE63',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  backButton: {
    marginRight: 15
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center'
  },
  iconContainer: {
    backgroundColor: '#F0F6F1',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#32AE63',
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#888'
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5
  },
  infoIcon: {
    marginRight: 15
  },
  infoTextContainer: {
    flex: 1
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 3
  },
  info: {
    fontSize: 14,
    color: '#555'
  }
})
