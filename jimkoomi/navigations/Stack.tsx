import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';

const MyStack = createNativeStackNavigator();

function Stack() {
  return (
    <MyStack.Navigator>
      <MyStack.Screen name="Start" component={StartScreen} />
    </MyStack.Navigator>
  );
}

export default Stack;
