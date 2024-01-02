import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenDuoViewCamera from './ScreenDuoViewCamera';
import ScreenRecordedVideo from './ScreenRecordedVideo';

const Routes = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="duoViewCamera"
        component={ScreenDuoViewCamera}
      />
      <Stack.Screen name="recordedVideo" component={ScreenRecordedVideo} />
    </Stack.Navigator>
  );
};

export default Routes;
