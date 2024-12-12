import React, { useEffect, useRef, useState } from 'react'
import { Text, View, StyleSheet, Animated, Easing } from 'react-native'
import { PieChart, PieChartData } from 'react-native-gifted-charts'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getBills } from '../../../../api/API/bill'

const SpendingChartComponent: React.FC = () => {
  const { t } = useTranslation()
  const { userData } = useSelector((state: any) => state.auth)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0)).current
  const legendAnim = useRef(new Animated.Value(0)).current
  const [data, setData] = useState<PieChartData[]>([])

  useEffect(() => {
    getBillTotal()
  }, [])

  const getBillTotal = async () => {
    try {
      const response = await getBills(userData.token)

      if (response?.total && Array.isArray(response.total)) {
        const parsedData = response.total.map((item: any) => ({
          value: parseFloat(item.percentage),
          color: getRandomColor(),
          name: item.billName
        }))
        setData(parsedData)
      } else {
        console.log('Invalid data structure:', response)
        setData([])
      }
    } catch (error) {
      console.log('Error fetching bills:', error)
    }
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic)
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.elastic(1)
      }),
      Animated.timing(legendAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad)
      })
    ]).start()
  }, [])

  const renderDot = (color: string) => {
    return (
      <View style={[styles.dot, { backgroundColor: color }]}>
        <View style={styles.dotInner} />
      </View>
    )
  }

  const renderLegendComponent = () => {
    return (
      <Animated.View
        style={[
          styles.legendContainer,
          {
            transform: [
              {
                translateX: legendAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0]
                })
              }
            ],
            opacity: legendAnim
          }
        ]}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            {renderDot(item.color)}
            <Text
              style={styles.legendText}
            >{`${item.name}: ${item.value}%`}</Text>
          </View>
        ))}
      </Animated.View>
    )
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>{t('screen.home.dashboard.title')}</Text>
        <View style={styles.contentWrapper}>
          <Animated.View
            style={[
              styles.pieChartContainer,
              {
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <PieChart
              data={data}
              donut
              showGradient
              sectionAutoFocus
              radius={70}
              innerRadius={40}
              innerCircleColor={'#232B5D'}
              strokeWidth={2}
              strokeColor="#232B5D"
              animate
              animationDuration={1000}
              centerLabelComponent={() => {
                return (
                  <View style={styles.centerLabel}>
                    <Text style={styles.centerLabelText}>Total</Text>
                  </View>
                )
              }}
            />
          </Animated.View>
          {renderLegendComponent()}
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  chartContainer: {
    borderRadius: 20,
    backgroundColor: '#232B5D',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  pieChartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '50%'
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerLabelText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold'
  },
  legendContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 12,
    maxWidth: '50%'
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  legendText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500'
  },
  dot: {
    height: 14,
    width: 14,
    borderRadius: 7,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dotInner: {
    height: 5,
    width: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255,255,255,0.4)'
  }
})

export default SpendingChartComponent
