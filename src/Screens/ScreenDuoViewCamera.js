import {Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {RNCamera} from 'react-native-camera';
import styles from './StyleDuoViewCamera';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

const ScreenDuoViewCamera = ({navigation}) => {
  const [recording, setRecording] = useState(false);
  const frontCameraRef = useRef();
  const backCameraRef = useRef();
  const [frontCameraUri, setFrontCameraUri] = useState(null);
  const [backCameraUri, setBackCameraUri] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location for tracking.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          startLocationCapture();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const startLocationCapture = () => {
      const interval = setInterval(() => {
        Geolocation.getCurrentPosition(
          position => {
            console.log('Latitude:', position.coords.latitude);
            console.log('Longitude:', position.coords.longitude);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          error => {
            console.log('Error getting location:', error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }, 1000);

      return () => clearInterval(interval);
    };

    requestLocationPermission();
  }, []);

  const startRecording = async () => {
    if (frontCameraRef.current && backCameraRef.current) {
      setRecording(true);
      const frontOptions = {
        quality: RNCamera.Constants.VideoQuality['720p'],
        type: RNCamera.Constants.Type.front,
      };
      const backOptions = {
        quality: RNCamera.Constants.VideoQuality['720p'],
        type: RNCamera.Constants.Type.back,
      };

      const [frontUri, backUri] = await Promise.all([
        frontCameraRef.current.recordAsync(frontOptions),
        backCameraRef.current.recordAsync(backOptions),
      ]);

      console.log('Front Camera URI: ', frontUri);
      console.log('Back Camera URI: ', backUri);
      setFrontCameraUri(frontUri?.uri);
      setBackCameraUri(backUri?.uri);
    }
  };

  const stopRecording = async () => {
    if (frontCameraRef.current && backCameraRef.current) {
      setRecording(false);
      await Promise.all([
        frontCameraRef.current.stopRecording(),
        backCameraRef.current.stopRecording(),
      ]);
    }
  };

  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording(); // Stop recording if the component is unmounted while recording
      }
    };
  });

  useEffect(() => {
    if (frontCameraUri !== null && backCameraUri !== null) {
      navigation.navigate('recordedVideo', {
        frontCamUri: frontCameraUri,
        backCamUri: backCameraUri,
      });
    }
  });

  return (
    <>
      <View style={styles.flex1}>
        <RNCamera
          ref={frontCameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.front}
        />
        <RNCamera
          ref={backCameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={recording ? stopRecording : startRecording}
            style={recording ? styles.btnContainerGreen : styles.btnContainer}>
            <Text style={styles.btnView}>{recording ? '' : ''}</Text>
          </TouchableOpacity>
          <View style={styles.geoContainer}>
            <Text>Latitude: {latitude} </Text>
            <Text> Longitude: {longitude}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ScreenDuoViewCamera;
