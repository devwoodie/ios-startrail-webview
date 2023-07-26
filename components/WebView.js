import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import UserStore from '../stores/UserStore';

const MyWebView = ({route, navigation}) => {
  const BASE_URL = 'https://www.byeoljachui.com/';
  const [webview, setWebview] = useState();
  useEffect(() => {
    if (webview && webview.clearCache) webview.clearCache();
  }, [webview]);

    let webViewRef = useRef()
    const handleSetRef = _ref => {
        webViewRef = _ref;
    };

    const handleEndLoading = e => {
        webViewRef.postMessage(UserStore.getJwtKey);
    };

  return (
      <WebView
          ref={handleSetRef}
          onLoadEnd={handleEndLoading}
          pullToRefreshEnabled={true}
          startInLoadingState={true}
          allowsBackForwardNavigationGestures={true}
          source={{uri: BASE_URL}}
          sharedCookiesEnabled={true}
          mixedContentMode={'compatibility'}
          originWhitelist={['https://*', 'http://*']}
          overScrollMode={'never'}
          postMessage={{}}
          onMessage={(event) => {
              const message = event.nativeEvent.data;

              if (message === "logout") {
                  navigation.navigate('Login');
                  AsyncStorage.removeItem('jwtKey');
              }
          }}
      />
  );
};

export default MyWebView;
