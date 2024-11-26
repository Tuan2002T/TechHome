import AsyncStorage from '@react-native-async-storage/async-storage'

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('persist:root')
    console.log('Persisted data:', value)
  } catch (e) {
    console.log('Error reading data:', e)
  }
}

const clearPersistedData = async () => {
  try {
    await AsyncStorage.clear()
    console.log('Data cleared!')
  } catch (e) {
    console.log('Error clearing data:', e)
  }
}

export { getData, clearPersistedData }
