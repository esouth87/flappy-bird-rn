import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Bird from './components/bird'
import Obstacles from './components/Obstacles'

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height

  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom ] = useState(screenHeight/2)
  const gravity = 3
  let gameTimerId

  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  let obstaclesLeftTimerId
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200

  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2)
  let obstaclesLeftTimerIdTwo

  let color
  //console.log(screenHeight)
  //console.log(screenWidth)

  //start bird falling
  useEffect(() => {
    if (birdBottom > 0 ) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])
  console.log(birdBottom)

  //start first obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)

      return () => {
        clearInterval(obstaclesLeftTimerId)
      }
      } else {
        setObstaclesLeft(screenWidth)
      }
  }, [obstaclesLeft])

//start second obstacles
  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)

      return () => {
        clearInterval(obstaclesLeftTimerIdTwo)
      }
      } else {
        setObstaclesLeftTwo(screenWidth)
      }
  }, [obstaclesLeftTwo])


  return (
    <View style={styles.container}>
        <Bird
          birdBottom={birdBottom}
          birdLeft={birdLeft}
        />
      <Obstacles
        color = {'green'}
        obstacleWidth = {obstacleWidth}
        obstacleHeight={obstacleHeight}
        gap = {gap}
        obstaclesLeft={obstaclesLeft}
      />
      <Obstacles
        color = {'yellow'}
        obstacleWidth = {obstacleWidth}
        obstacleHeight={obstacleHeight}
        gap = {gap}
        obstaclesLeft={obstaclesLeftTwo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
