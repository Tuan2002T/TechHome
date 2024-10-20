import { Text, View, StyleSheet, Animated, Easing } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import { useEffect, useRef } from 'react'

const SpendingChartComponent = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0)).current
  const legendAnim = useRef(new Animated.Value(0)).current

  const pieData = [
    {
      value: 47,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
      shiftRadius: 3
    },
    {
      value: 40,
      color: '#93FCF8',
      gradientCenterColor: '#3BE9DE',
      shiftRadius: 2
    },
    {
      value: 16,
      color: '#BDB2FA',
      gradientCenterColor: '#8F80F3',
      shiftRadius: 2
    },
    {
      value: 3,
      color: '#FFA5BA',
      gradientCenterColor: '#FF7F97',
      shiftRadius: 2
    }
  ]

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

  const renderDot = (color) => {
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
        <View style={styles.legendItem}>
          {renderDot('#009FFF')}
          <Text style={styles.legendText}>Tiền điện: 47%</Text>
        </View>
        <View style={styles.legendItem}>
          {renderDot('#3BE9DE')}
          <Text style={styles.legendText}>Phí DV: 40%</Text>
        </View>
        <View style={styles.legendItem}>
          {renderDot('#8F80F3')}
          <Text style={styles.legendText}>Rác: 16%</Text>
        </View>
        <View style={styles.legendItem}>
          {renderDot('#FF7F97')}
          <Text style={styles.legendText}>Khác: 3%</Text>
        </View>
      </Animated.View>
    )
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Chi Tiêu Hàng Tháng</Text>
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
              data={pieData}
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
                    <Text style={styles.centerLabelText}>47%</Text>
                    <Text style={styles.centerLabelSubText}>Điện</Text>
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
  centerLabelSubText: {
    fontSize: 14,
    color: '#93FCF8',
    marginTop: 2
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
