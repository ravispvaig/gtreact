/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect,useState, useRef } from 'react';
import { Alert, BackHandler, NativeEventSubscription, Platform  } from 'react-native';
import { WebView } from 'react-native-webview';
import Share from 'react-native-share';

function App(): JSX.Element {
  const webViewRef = useRef(null);
const onAndroidBackPress = () => {
  if (webViewRef.current) {
    webViewRef.current?.goBack();
    return true; // prevent default behavior (exit app)
  }
  return false;
};

useEffect(() => {

 // shareLink();
  if (Platform.OS === 'android') {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }

}, []);

const shareLink =(options:any) =>{
  
  Share.open(options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    err && console.log('share..log=',err);
  });

}

function onMessage(data:any) {
  
  const webData = data.nativeEvent.data;
  if(webData)
  {
    const webDataArray = webData.split('$@');
    if(webDataArray.length>1)
    {
      console.log(webDataArray);
      if(webDataArray[0]==='share')
      {
        const url = webDataArray[1];
        const title = "Global Tax";
        const message = "";
        const options = {title, url, message,};
        shareLink(options);
      }

    }
   

  }

}

    return (
    <WebView
    ref={webViewRef}
    onMessage={onMessage}
    source={{
      uri: 'https://www.globaltax.in/login',
    }}
   
    geolocationEnabled={true}
    mediaPlaybackRequiresUserAction={false}
    javaScriptEnabled={true}
   
  />
  );
}
export default App;
