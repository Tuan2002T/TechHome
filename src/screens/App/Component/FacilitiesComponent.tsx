import React from 'react'
import { SvgProps } from 'react-native-svg'
import WaterBtn from '../../../img/Facilities/Water.svg'
import TVBtn from '../../../img/Facilities/TV.svg'
import LightningBoltBtn from '../../../img/Facilities/LightningBolt.svg'
import AirConditionerBtn from '../../../img/Facilities/AirConditioner.svg'
import MenuSquaredBtn from '../../../img/Facilities/MenuSquared.svg'
import WashByHandBtn from '../../../img/Facilities/WashByHand.svg'
import BroomBtn from '../../../img/Facilities/Broom.svg'
import WashingMachineBtn from '../../../img/Facilities/WashingMachine.svg'

import PoolBtn from '../../../img/Facilities/Pool.svg'
import GymBtn from '../../../img/Facilities/Gym.svg'
import PlaygroundBtn from '../../../img/Facilities/Playground.svg'
import WeberBtn from '../../../img/Facilities/Weber.svg'
import TennisBtn from '../../../img/Facilities/Tennis.svg'
import BadmintonBtn from '../../../img/Facilities/Badminton.svg'
import BasketballBtn from '../../../img/Facilities/Basketball.svg'

import { StyleSheet, View } from 'react-native'

//Service
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

const WashByHand: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <WashByHandBtn width={width} height={height} {...rest} />
    </View>
  )
}

const Broom: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <BroomBtn width={width} height={height} {...rest} />
    </View>
  )
}

const WashingMachine: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <WashingMachineBtn width={width} height={height} {...rest} />
    </View>
  )
}

//Utilities
const Pool: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <PoolBtn width={width} height={height} {...rest} />
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

const Gym: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <GymBtn width={width} height={height} {...rest} />
    </View>
  )
}

const Playground: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <PlaygroundBtn width={width} height={height} {...rest} />
    </View>
  )
}

const Weber: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <WeberBtn width={width} height={height} {...rest} />
    </View>
  )
}

const Tennis: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <TennisBtn width={width} height={height} {...rest} />
    </View>
  )
}

const Badminton: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <BadmintonBtn width={width} height={height} {...rest} />
    </View>
  )
}

const Basketball: React.FC<SvgComponentProps> = ({
  width = 45,
  height = 45,
  ...rest
}) => {
  return (
    <View style={styles.btn}>
      <BasketballBtn width={width} height={height} {...rest} />
    </View>
  )
}

export {
  Water,
  TV,
  LightningBolt,
  AirConditioner,
  MenuSquared,
  WashByHand,
  Broom,
  WashingMachine,
  Pool,
  Gym,
  Playground,
  Weber,
  Tennis,
  Badminton,
  Basketball
}
