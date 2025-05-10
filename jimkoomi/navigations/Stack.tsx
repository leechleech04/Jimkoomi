import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import WriteDestinationScreen from '../screens/WriteDestinationScreen';
import RootStackParamList from '../types';

const MyStack = createNativeStackNavigator<RootStackParamList>();

function Stack() {
  return (
    <MyStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        // gestureEnabled: false,
      }}
    >
      <MyStack.Screen name="Start" component={StartScreen} />
      <MyStack.Screen
        name="WriteDestination"
        component={WriteDestinationScreen}
      />
    </MyStack.Navigator>
  );
}

export default Stack;
