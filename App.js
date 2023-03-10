import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Bird from './components/bird'
import Obstacles from './components/Obstacles'

export default function App() {
  const gameTimerIdRef= useRef(null);
  const obstaclesLeftTimerIdRef = useRef(null);
  const obstaclesLeftTimerIdTwoRef = useRef(null);

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height

  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom ] = useState(screenHeight/2)
  const gravity = 3

  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200

  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + obstacleWidth/2)

  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)

  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  //console.log(screenHeight)
  //console.log(screenWidth)

  //start bird falling
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      setBirdBottom(birdBottom => birdBottom - gravity);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return() => cancelAnimationFrame(animationFrameId);
  }, []);

  console.log(birdBottom)

const jump = () => {
  if (!isGameOver && (birdBottom < screenHeight)) {
    setBirdBottom(birdBottom => birdBottom + 50)
    console.log('jumped')
  }
}

  //start first obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerIdRef.current = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)

      return () => {
        clearInterval(obstaclesLeftTimerIdRef.current)
      }
      } else {
        setScore(score => score + 1)
        setObstaclesLeft(screenWidth)
        setObstaclesNegHeight( - Math.random() * 100)
      }
  }, [obstaclesLeft])

//start second obstacles
useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwoRef.current = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)

      return () => {
        clearInterval(obstaclesLeftTimerIdTwoRef.current)
      }
      } else {
        setScore(score => score + 1)
        setObstaclesLeftTwo(screenWidth)
        setObstaclesNegHeightTwo( - Math.random() * 100)
      }
  }, [obstaclesLeftTwo])

  //check for collisions
  useEffect(() => {
    if (
          (birdBottom < (obstaclesNegHeight + obstacleHeight) &&
          (obstaclesLeft > birdLeft - 30 && obstaclesLeft < birdLeft + 30)) ||
          (birdBottom > (obstaclesNegHeight + obstacleHeight + gap) &&
          (obstaclesLeft > birdLeft - 30 && obstaclesLeft < birdLeft + 30)) ||
          (birdBottom < (obstaclesNegHeightTwo + obstacleHeight) &&
          (obstaclesLeftTwo > birdLeft - 30 && obstaclesLeftTwo < birdLeft + 30)) ||
          (birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap) &&
          (obstaclesLeftTwo > birdLeft - 30 && obstaclesLeftTwo < birdLeft + 30))
        ) {
    console.log("Collision dick head")
    gameOver()
    }
  }, [obstaclesLeft, obstaclesNegHeight, obstaclesLeftTwo, obstaclesNegHeightTwo,
  birdBottom])

  const gameOver = () => {
    clearInterval(gameTimerIdRef.current)
    clearInterval(obstaclesLeftTimerIdRef.current)
    clearInterval(obstaclesLeftTimerIdTwoRef.current)
    setIsGameOver(true)
  }

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text style={{fontSize: '30px'}}>{score}</Text>}
          <Bird
            birdBottom={birdBottom}
            birdLeft={birdLeft}
          />
        <Obstacles
          color = {'green'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeight}
          gap = {gap}
          obstaclesLeft={obstaclesLeft}
        />
        <Obstacles
          color = {'yellow'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeightTwo}
          gap = {gap}
          obstaclesLeft={obstaclesLeftTwo}
        />
      </View>
    </TouchableWithoutFeedback>
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
