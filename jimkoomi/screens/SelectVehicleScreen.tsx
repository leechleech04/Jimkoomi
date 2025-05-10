import styled from 'styled-components/native';
import { colors } from '../colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, VehicleItem } from '../types';
import { ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import { View } from 'react-native';
import VehicleButton from '../components/VehicleButton';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.skyBlue};
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
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

const VehicleList = styled.FlatList`
  flex-grow: 1;
  align-self: stretch;
  margin: 40px 0;
`;

const ButtonBox = styled.View`
  align-self: stretch;
  flex-direction: row;
`;

const Button = styled.Pressable`
  flex-grow: 1;
  border-radius: 16px;
  padding: 20px 10px;
`;

const BackButton = styled(Button)`
  background-color: ${colors.btnGray};
  margin-right: 10px;
`;

const NextButton = styled(Button)`
  background-color: ${colors.blue};
`;

const ButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  text-align: center;
`;

const BackButtonText = styled(ButtonText)`
  color: white;
`;

const NextButtonText = styled(ButtonText)`
  color: ${colors.textBlack};
`;

type Props = NativeStackScreenProps<RootStackParamList, 'SelectVehicle'>;

const SelectVehicleScreen = ({ navigation }: Props) => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  const images = [
    { image: require('../assets/img/airplane.png'), name: '비행기' },
    { image: require('../assets/img/bicycle.png'), name: '자전거' },
    { image: require('../assets/img/bus.png'), name: '버스' },
    { image: require('../assets/img/car.png'), name: '차' },
    { image: require('../assets/img/cruise.png'), name: '크루즈' },
    { image: require('../assets/img/ship.png'), name: '여객선' },
    { image: require('../assets/img/subway.png'), name: '지하철' },
    { image: require('../assets/img/train.png'), name: '기차' },
    { image: require('../assets/img/walk.png'), name: '도보' },
  ];

  useEffect(() => {
    const preloadImages = async () => {
      await Promise.all(
        images.map((item) => Asset.fromModule(item.image).downloadAsync())
      );
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  if (!imagesLoaded) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color={colors.blue} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Container>
        <Title>여행 시 이동 수단을 선택해주세요</Title>
        <Comment>
          어떤 방식으로 이동하실지 알려주시면, 놓치기 쉬운 준비물도 빠짐없이
          챙겨드릴게요!
        </Comment>
        <VehicleList
          data={images}
          renderItem={({ item }: { item: VehicleItem }) => (
            <VehicleButton vehicle={item} isScrolling={isScrolling} />
          )}
          keyExtractor={(item: VehicleItem) => item.name}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          onScrollBeginDrag={() => setIsScrolling(true)}
          onScrollEndDrag={() => setIsScrolling(false)}
          onMomentumScrollBegin={() => setIsScrolling(true)}
          onMomentumScrollEnd={() => setIsScrolling(false)}
        />
        <ButtonBox>
          <BackButton onPress={() => navigation.goBack()}>
            <BackButtonText>이전</BackButtonText>
          </BackButton>
          <NextButton onPress={() => navigation.navigate('SelectActivity')}>
            <NextButtonText>다음</NextButtonText>
          </NextButton>
        </ButtonBox>
      </Container>
    </SafeAreaView>
  );
};

export default SelectVehicleScreen;
