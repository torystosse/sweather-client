import * as WebBrowser from 'expo-web-browser';
// import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import config from '../config.js';

// const Weather = props => {
//   const [weather, setWeather] = useState(null)
//
//   // useEffect(() => {
//   //   axios(`${config.url}/current?postal_code=${props.match.params.postal_code}/&key=${config.apikey}`)
//   //     .then(res => setWeather(res.data))
//   //     .catch(console.error)
//   // }, [])
//   }

const getWeather = props => {
    fetch(`${config.url}/current?postal_code=${props.match.params.postal_code}/&key=${config.apikey}`)
      .then(res => setWeather(res.data))
      .catch(console.error)

}

// let temperature = ''
// if (!data) {
//   temperature = 'Loading...'
// } else {
//   temperature = data.weather.temp
// }


export default function HomeScreen(props) {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
      fetch(`${config.url}/current/`)
        .then(res => setWeather(res.data))
        .catch(console.error)
    }, [])
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

        </View>
        <View style={styles.welcomeContainer}>
          <Text>Check out the weather for your area here:</Text>
            <TextInput style={styles.formInput}></TextInput>
            <Button title={"Get Weather"} onClick={getWeather}></Button>
        </View>

        <View>
          <Text>Location:</Text>
          <Text>Temperature:</Text>
          <Text>Humidity:</Text>
          <Text>Conditions:</Text>
        </View>

      </ScrollView>


    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  formInput: {
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 2,
    height: 40,
    marginBottom: 10,
    width: 300,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
