import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  btnView: {
    fontSize: 20,
    color: 'white',
  },
  btnContainer: {
    backgroundColor: 'red',
    borderRadius: 40,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  btnContainerGreen: {
    backgroundColor: 'green',
    borderRadius: 40,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  geoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default styles;
