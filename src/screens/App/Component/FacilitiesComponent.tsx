import React from 'react'
import { SvgProps } from 'react-native-svg'
import WaterBtn from '../../../img/Facilities/Water.svg'
import TVBtn from '../../../img/Facilities/TV.svg'
import LightningBoltBtn from '../../../img/Facilities/LightningBolt.svg'
import AirConditionerBtn from '../../../img/Facilities/AirConditioner.svg'
import MenuSquaredBtn from '../../../img/Facilities/MenuSquared.svg'

import { StyleSheet, View } from 'react-native'

interface SvgComponentProps extends SvgProps {
  width?: number
  height?: number
}

const Water: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <WaterBtn width={width} height={height} {...rest} />
    </View>
  )
}

const TV: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <TVBtn width={width} height={height} {...rest} />
    </View>
  )
}

const LightningBolt: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <LightningBoltBtn width={width} height={height} {...rest} />
    </View>
  )
}

const AirConditioner: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <AirConditionerBtn width={width} height={height} {...rest} />
    </View>
  )
}

const MenuSquared: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <MenuSquaredBtn width={width} height={height} {...rest} />
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10
  }
})

export { Water, TV, LightningBolt, AirConditioner, MenuSquared }
