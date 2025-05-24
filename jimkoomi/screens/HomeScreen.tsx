import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, StoredChecklistType } from '../types';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { Image } from 'expo-image';
import { useCallback, useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import { ActivityIndicator, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import store from '../redux/store';
import { useFocusEffect } from '@react-navigation/native';

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
  margin-bottom: 20px;
`;

const LogoImage = styled(Image)`
  width: 36px;
  height: 36px;
  margin-right: 10px;
`;

const TextImage = styled(Image)`
  width: ${36 * (678 / 242)}px;
  height: 36px;
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
  margin-top: 20px;
`;

const ChecklistButton = styled.Pressable`
  background-color: ${colors.white};
  align-items: center;
  padding: 10px 20px;
`;

const ChecklistButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  align-self: stretch;
`;

const ChecklistButtonSubText = styled.Text`
  font-size: 16px;
  color: ${colors.textGray};
  flex-grow: 1;
  align-self: stretch;
  margin-top: 5px;
  font-weight: 600;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  // useEffect(() => {
  //   const removeValue = async () => {
  //     try {
  //       await AsyncStorage.removeItem('jimkoomiChecklist');
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   removeValue();
  // }, []);
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

  const [storedChecklist, setStoredChecklist] = useState<StoredChecklistType[]>(
    []
  );

  useFocusEffect(
    useCallback(() => {
      const getChecklist = async () => {
        try {
          const storedChecklist = await AsyncStorage.getItem(
            'jimkoomiChecklist'
          );
          if (storedChecklist) {
            const parsedChecklist = JSON.parse(storedChecklist);
            const checklistArray = Object.keys(parsedChecklist).map((key) => ({
              ...parsedChecklist[key],
            }));
            setStoredChecklist(checklistArray);
          }
        } catch (error) {
          Alert.alert('체크리스트를 불러오는 중 오류가 발생했습니다.', '', [
            { text: '확인', style: 'default' },
          ]);
        }
      };

      getChecklist();
    }, [])
  );

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
          data={storedChecklist}
          renderItem={({ item }: { item: StoredChecklistType }) => (
            <ChecklistButton
              onPress={() => {
                navigation.navigate('ChecklistDetail', {
                  name: item.checklist.name,
                });
              }}
            >
              <ChecklistButtonText numberOfLines={1} ellipsizeMode="tail">
                {item.checklist.name}
              </ChecklistButtonText>
              <ChecklistButtonSubText numberOfLines={1} ellipsizeMode="tail">
                {item.tripData.startDate} {item.tripData.fullAddress}
              </ChecklistButtonSubText>
            </ChecklistButton>
          )}
          keyExtractor={(item: StoredChecklistType) => item.checklist.name}
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
