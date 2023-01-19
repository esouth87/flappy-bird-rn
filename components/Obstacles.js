import React from 'react'
import { View } from 'react-native'

const Obstacles = ({obstaclesLeft, obstacleWidth, obstacleHeight, gap}) => {
  //if (obstaclesLeft > 0 -obstacleWidth) {
  return (
    <View>
      <View style={{
          position: 'absolute',
          backgroundColor: 'blue',
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstaclesLeft,
          bottom: 10 + obstacleHeight + gap,
      }}
      />
      <View style={{
          position: 'absolute',
          backgroundColor: 'green',
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstaclesLeft,
          bottom: 0,
      }}/>
    </View>
  )
//} //else {
//  return null;
//}
}

export default Obstacles
