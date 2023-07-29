
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WebView from './components/WebView';
import Login from "./components/Login";
import Agreement from "./components/Agreement";
import Terms from "./components/Terms";
import RegisterNickname from "./components/RegiserNickname";

const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle={"light-content"} />
          <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                  gestureEnabled: false,
                  swipeEnabled: false,
                }}
            >
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
              <Stack.Screen name='Agreement' component={Agreement} options={{ headerShown: false }}/>
              <Stack.Screen name='Term' component={Terms} options={{ headerShown: false }}/>
              <Stack.Screen name='RegisterNickname' component={RegisterNickname} options={{ headerShown: false }}/>
              <Stack.Screen name='WebView' component={WebView} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
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
