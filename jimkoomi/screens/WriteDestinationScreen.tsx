import styled from 'styled-components/native';
import { colors } from '../colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LocationData, RootStackParamList } from '../types';
import { useState } from 'react';
import axios from 'axios';
import { ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLocationReducer } from '../tripDataSlice';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.skyBlue};
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

const ContentBox = styled.View`
  flex-grow: 1;
  align-self: stretch;
  padding: 40px 0;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  line-height: 36px;
  width: 100%;
`;

const Comment = styled.Text`
  font-size: 20px;
  color: ${colors.textGray};
  font-weight: bold;
  line-height: 30px;
  margin-top: 10px;
`;

const DestinationInput = styled.TextInput`
  align-self: stretch;
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  padding: 20px 10px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  elevation: 4;
`;

const LocationName = styled.Text`
  font-size: 20px;
  color: ${colors.textGray};
  font-weight: bold;
  padding: 20px 10px;
`;

const NextButton = styled.Pressable`
  align-self: stretch;
  background-color: ${colors.blue};
  border-radius: 16px;
  padding: 20px 10px;
`;

const NextButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  text-align: center;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'WriteDestination'>;

const WriteDestinationScreen = ({ navigation }: Props) => {
  const [destination, setDestination] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  const validateLocation = async () => {
    if (destination.length === 0) {
      setLocationData(null);
      Alert.alert('목적지를 입력해주세요.', '', [
        { text: '확인', style: 'default' },
      ]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward`,
        {
          params: {
            q: destination,
            access_token: process.env.EXPO_PUBLIC_MAPBOX_TOKEN,
            language: 'ko',
            limit: 1,
          },
        }
      );
      setIsLoading(false);

      if (response.data.features.length === 1) {
        const data = response.data.features[0].properties;
        setLocationData({
          fullAddress: data.full_address,
          latitude: data.coordinates[0],
          longitude: data.coordinates[1],
        });
      } else {
        Alert.alert('유효한 목적지를 찾을 수 없습니다.');
        setLocationData(null);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setLocationData(null);
      Alert.alert('Error', '위치 정보를 가져오는 중 오류가 발생했습니다.', [
        { text: '확인', style: 'default' },
      ]);
    }
  };

  const dispatch = useDispatch();

  const onPressNext = () => {
    if (isLoading) {
      Alert.alert('위치 정보를 가져오는 중입니다. 잠시만 기다려주세요.', '', [
        { text: '확인', style: 'default' },
      ]);
      return;
    }
    if (locationData) {
      dispatch(setLocationReducer(locationData));
      navigation.navigate('WriteDate');
    } else {
      Alert.alert('목적지를 입력해주세요.', '', [
        { text: '확인', style: 'default' },
      ]);
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <Title>여행의 목적지를 입력해주세요</Title>
        <Comment>
          어디로 떠나는지 알려주시면, 그 지역에 꼭 필요한 준비물을 알려드릴게요!
        </Comment>
        <ContentBox>
          <DestinationInput
            placeholder="ex) 서울, 도쿄"
            placeholderTextColor={colors.textGray}
            value={destination}
            onChangeText={setDestination}
            onSubmitEditing={validateLocation}
          />
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={colors.blue}
              style={{ marginTop: 20 }}
            />
          ) : locationData ? (
            <LocationName>목적지: {locationData.fullAddress}</LocationName>
          ) : null}
        </ContentBox>
        <NextButton onPress={onPressNext}>
          <NextButtonText>다음</NextButtonText>
        </NextButton>
      </Container>
    </SafeAreaView>
  );
};

export default WriteDestinationScreen;
