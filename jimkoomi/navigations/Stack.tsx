import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import WriteDestinationScreen from '../screens/WriteDestinationScreen';
import RootStackParamList from '../types';
import WriteDateScreen from '../screens/WriteDateScreen';

const MyStack = createNativeStackNavigator<RootStackParamList>();

function Stack() {
  return (
    <MyStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        gestureEnabled: false,
      }}
    >
      <MyStack.Screen name="Start" component={StartScreen} />
      <MyStack.Screen
        name="WriteDestination"
        component={WriteDestinationScreen}
      />
      <MyStack.Screen name="WriteDate" component={WriteDateScreen} />
    </MyStack.Navigator>
  );
}

export default Stack;
