import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import WriteDestinationScreen from '../screens/WriteDestinationScreen';
import WriteDateScreen from '../screens/WriteDateScreen';
import SelectVehicleScreen from '../screens/SelectVehicleScreen';
import SelectActivityScreen from '../screens/SelectActivityScreen';
import { RootStackParamList } from '../types';
import CreateChecklistScreen from '../screens/CreateChecklistScreen';
import HomeScreen from '../screens/HomeScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../colors';

const MyStack = createNativeStackNavigator<RootStackParamList>();

const Stack = () => {
  const [initialRouteName, setInitialRouteName] = useState<
    keyof RootStackParamList | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('jimkoomiChecklist');
        if (hasLaunched) {
          setInitialRouteName('Home');
        } else {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setInitialRouteName('Start');
        }
      } catch (error) {
        console.error('AsyncStorage 에러:', error);
        setInitialRouteName('Start');
      } finally {
        setIsLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.skyBlue,
        }}
      >
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  return (
    <MyStack.Navigator
      initialRouteName={initialRouteName ?? 'Start'}
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
