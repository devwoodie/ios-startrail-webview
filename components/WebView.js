import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {View, Linking} from "react-native";
import {WebView} from 'react-native-webview';
import UserStore from '../stores/UserStore';

const MyWebView = ({route, navigation}) => {
  const BASE_URL = 'https://www.byeoljachui.com/';
  const [webview, setWebview] = useState();

    useEffect(() => {
        if (webview && webview.clearCache) webview.clearCache();
    }, [webview]);

    const handleLinkNavigation = (event) => {
        const url = event.url;
        if (url.startsWith('http://forms') || url.startsWith('https://forms')) {
            // 외부 링크인 경우 앱을 나와서 사파리 브라우저로 열기
            Linking.openURL(url)
                .then()
                .catch((err) => alert(err.message));
            return false;
        }
        // 내부 링크인 경우 WebView에서 로드
        return true;
    };

    let webViewRef = useRef()
    const handleSetRef = _ref => {
        webViewRef = _ref;
    };

    const handleEndLoading = e => {
        webViewRef.postMessage(UserStore.getJwtKey);
    };

  return (
      <View style={{ flex: 1 }}>
          <WebView
              onShouldStartLoadWithRequest={handleLinkNavigation}
              ref={handleSetRef}
              onLoadEnd={handleEndLoading}
              pullToRefreshEnabled={true}
              startInLoadingState={true}
              allowsBackForwardNavigationGestures={false}
              source={{uri: BASE_URL}}
              sharedCookiesEnabled={true}
              mixedContentMode={'compatibility'}
              originWhitelist={['https://*', 'http://*']}
              overScrollMode={'never'}
              postMessage={{}}
              onContentProcessDidTerminate={() => {
                  webViewRef.current?.reload();
              }}
              onMessage={(event) => {
                  const message = event.nativeEvent.data;

                  if (message === "logout") {
                      navigation.navigate('Login');
                      AsyncStorage.removeItem('jwtKey');
                  }
              }}
          />
      </View>
  );
};

export default MyWebView;
