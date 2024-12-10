import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'

const events = [
  {
    id: '1',
    name: 'Sự kiện A',
    description: 'Mô tả chi tiết về sự kiện A',
    date: '2024-12-15',
    location: 'Hà Nội'
  },
  {
    id: '2',
    name: 'Sự kiện B',
    description: 'Mô tả chi tiết về sự kiện B',
    date: '2024-12-18',
    location: 'TP.HCM'
  },
  {
    id: '3',
    name: 'Sự kiện C',
    description: 'Mô tả chi tiết về sự kiện C',
    date: '2024-12-22',
    location: 'Đà Nẵng'
  }
]

const Events = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sự kiện</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.eventItem}>
            <Card.Content>
              <Title style={styles.eventTitle}>{item.name}</Title>
              <Paragraph style={styles.eventDetails}>
                {item.description}
              </Paragraph>
              <Paragraph style={styles.eventDetails}>
                Ngày: {item.date}
              </Paragraph>
              <Paragraph style={styles.eventDetails}>
                Địa điểm: {item.location}
              </Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f7'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1a73e8'
  },
  eventItem: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333'
  },
  eventDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4
  }
})

export default Events
