/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Header,
  ImageBackground
} from 'react-native';

import { 
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen  from './components/HomeScreen';

const App: () => React$Node = () => {
  return (
    <View style={styles.body}>
    <View style={styles.header}>
      <Image style={styles.logo} source={require('./images/pi-conditioner-logo.jpg')}></Image> 
     </View>

      <View style={styles.body}>
      <HomeScreen/>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'black',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'black',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: "center"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    textAlign: "center"
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  toggleACButton: {
    marginRight: 60,
    marginLeft: 40,
    marginTop: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#FFB612',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFB612'
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center"

  },
  logo: {
    marginTop: 100,
    height: 80,
    width: 420,

  },
  header: {
    borderColor: 'black',
    borderStyle: "solid",
    borderBottomWidth: 5,
    borderTopWidth: 5,
    backgroundColor: 'black'
  }
});

export default App;
