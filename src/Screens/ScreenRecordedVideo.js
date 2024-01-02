import {View} from 'react-native';
import React from 'react';
import styles from './StyleRecordedVideo';
import Video from 'react-native-video';

const ScreenRecordedVideo = ({route}) => {
  const {frontCamUri, backCamUri} = route.params;

  return (
    <View style={styles.videoContainer}>
      <View style={styles.videoView}>
        <Video
          source={{uri: frontCamUri}}
          style={styles.videoPlayer}
          controls={true}
          resizeMode="contain"
        />
      </View>
      <View style={styles.videoView}>
        <Video
          source={{uri: backCamUri}}
          style={styles.videoPlayer}
          controls={true}
        />
      </View>
    </View>
  );
};

export default ScreenRecordedVideo;
