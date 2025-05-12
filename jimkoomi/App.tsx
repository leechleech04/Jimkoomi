import { NavigationContainer } from '@react-navigation/native';
import Stack from './navigations/Stack';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
