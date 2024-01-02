import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  //   videoContainer: {
  //     flex: 1,
  //     // flexDirection: 'column',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  //   videoView: {
  //     flex: 1,
  //     width: Dimensions.get('window').width,
  //   },
  //   videoPlayer: {
  //     width: '100%',
  //     aspectRatio: 16 / 9,
  //     resizeMode: 'contain',
  //   },

  videoPlayer: {
    flex: 1,
    width: 200,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
