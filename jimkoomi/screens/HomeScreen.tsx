import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import { ActivityIndicator, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.skyBlue};
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  align-self: stretch;
`;

const LogoImage = styled(Image)`
  width: 36px;
  height: 36px;
  margin-right: 10px;
`;

const TextImage = styled(Image)`
  width: ${36 * (678 / 242)}px;
  height: 36px;
  margin-bottom: 30px;
`;

const CreateChecklistButton = styled.Pressable`
  align-self: stretch;
  align-items: center;
  background-color: ${colors.blue};
  border-radius: 16px;
  padding: 20px 10px;
  flex-direction: row;
`;

const CreateChecklistButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.white};
  font-weight: bold;
  text-align: center;
  margin-left: 10px;
`;

const ChecklistList = styled.FlatList`
  flex-grow: 1;
  align-self: stretch;
  margin: 20px 0;
`;

const ChecklistButton = styled.Pressable`
  background-color: ${colors.white};
  flex-direction: row;
  align-items: center;
  padding: 20px 10px;
`;

const ChecklistButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  text-align: center;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const preloadImages = async () => {
      try {
        const images = [
          require('../assets/logo/splash-logo.png'),
          require('../assets/logo/text-logo.png'),
        ];
        await Promise.all(
          images.map((image) => Asset.fromModule(image).downloadAsync())
        );
        if (isMounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setImagesLoaded(true);
        }
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  const [storedChecklist, setStoredChecklist] = useState<any[]>([]);

  useEffect(() => {
    const getChecklist = async () => {
      try {
        const storedChecklist = await AsyncStorage.getItem('jimkoomiChecklist');
        if (storedChecklist) {
          setStoredChecklist(JSON.parse(storedChecklist));
        }
      } catch (error) {
        Alert.alert('체크리스트를 불러오는 중 오류가 발생했습니다.', '', [
          { text: '확인', style: 'default' },
        ]);
      }
    };

    getChecklist();
  }, []);

  if (!imagesLoaded) {
    return (
      <SafeAreaView>
        <Container style={{ justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.blue} />
        </Container>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Container>
        <Header>
          <LogoImage
            source={require('../assets/logo/splash-logo.png')}
            contentFit="content"
          />
          <TextImage
            source={require('../assets/logo/text-logo.png')}
            contentFit="content"
          />
        </Header>
        <CreateChecklistButton
          onPress={() => {
            navigation.navigate('WriteDestination');
          }}
        >
          <Ionicons name="add-circle-outline" size={24} color={colors.white} />
          <CreateChecklistButtonText>
            새로운 체크리스트
          </CreateChecklistButtonText>
        </CreateChecklistButton>
        <ChecklistList
          data={Object.keys(storedChecklist)}
          renderItem={({ item }: { item: string }) => (
            <ChecklistButton
              onPress={() => {
                navigation.navigate('ChecklistDetail', {
                  checklistName: item,
                  checklistData: storedChecklist[item],
                });
              }}
            >
              <ChecklistButtonText>{item}</ChecklistButtonText>
            </ChecklistButton>
          )}
          keyExtractor={(item: string) => item}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: colors.lightGray,
              }}
            />
          )}
        />
      </Container>
    </SafeAreaView>
  );
};

export default HomeScreen;
