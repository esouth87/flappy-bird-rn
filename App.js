import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Bird from './components/bird'
import Obstacles from './components/Obstacles'

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height

  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom ] = useState(screenHeight/2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 20
  const gravity = 3
  const scrollSpeed = 5
  let gameTimerId
  let obstaclesTimerId

  //console.log(screenHeight)
  //console.log(screenWidth)

  const App = () => {
    const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
    const [obstaclesRendered, setObstaclesRendered] = useState(false);
    const obstacleWidth = 60;

    useEffect(() => {
      if (obstaclesLeft > -obstacleWidth) {
        setObstaclesRendered(true);
      } else {
        setObstaclesRendered(false);
      }
    }, [obstaclesLeft]);

    return (
      <View>
        <Obstacles obstaclesLeft={obstaclesLeft} obstacleWidth={obstacleWidth} />
        <RenderChecker obstaclesRendered={obstaclesRendered} />
      </View>
    );


  const RenderChecker = ({ obstaclesRendered }) => {
    return obstaclesRendered ? (
      <View>
        <Text>Obstacles are rendering</Text>
      </View>
    ) : (
      <View>
        <Text>Obstacles are not rendering</Text>
      </View>
    );
  };


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
//  console.log(birdBottom)

  //start first obstacles

  useEffect(() => {
    if (obstaclesLeft < screenWidth) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - scrollSpeed)
      }, 30)
    }
    return () => {
      clearInterval(obstaclesTimerId)
    }
  }, [obstaclesLeft])


}

  return (
    <>
        <Bird
          birdBottom={birdBottom}
          birdLeft={birdLeft}
        />

      <Obstacles
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        gap={gap}
        obstaclesLeft={obstaclesLeft}
      />

      <RenderChecker obstaclesRendered={obstaclesRendered} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
//    alignItems: 'center',
//    justifyContent: 'center',
  },
});
