import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import WriteDestinationScreen from '../screens/WriteDestinationScreen';
import WriteDateScreen from '../screens/WriteDateScreen';
import SelectVehicleScreen from '../screens/SelectVehicleScreen';
import SelectActivityScreen from '../screens/SelectActivityScreen';
import { RootStackParamList } from '../types';
import CreateChecklistScreen from '../screens/CreateChecklistScreen';
import HomeScreen from '../screens/HomeScreen';

const MyStack = createNativeStackNavigator<RootStackParamList>();

const Stack = () => {
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
      <MyStack.Screen name="SelectVehicle" component={SelectVehicleScreen} />
      <MyStack.Screen name="SelectActivity" component={SelectActivityScreen} />
      <MyStack.Screen
        name="CreateChecklist"
        component={CreateChecklistScreen}
      />
      <MyStack.Screen name="Home" component={HomeScreen} />
    </MyStack.Navigator>
  );
};

export default Stack;
