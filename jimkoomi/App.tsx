import { NavigationContainer } from '@react-navigation/native';
import Stack from './navigations/Stack';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack />
    </NavigationContainer>
  );
};

export default App;
