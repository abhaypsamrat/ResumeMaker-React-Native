import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Info from './src/screen/Info';
import Resume1 from './src/screen/Resume1';
import Resume2 from './src/screen/Resume2';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Info">
        <Stack.Screen
          name="Info"
          component={Info}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Resume1" component={Resume1} />
        <Stack.Screen name="Resume2" component={Resume2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
