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
  StatusBar,
  StyleSheet,
} from 'react-native';
import WebView from './components/WebView';
import Login from "./components/Login";
import Agreement from "./components/Agreement";

const App = () => {

  return (
    <>
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle={"light-content"} />
        {/*<WebView />*/}
        {/*<Login />*/}
        <Agreement />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    color: "#000"
  },
});

export default App;
