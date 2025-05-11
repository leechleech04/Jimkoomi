import styled from 'styled-components/native';
import { colors } from '../colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, VehicleItem } from '../types';
import { ActivityIndicator } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import { View } from 'react-native';
import VehicleButton from '../components/VehicleButton';
import { useDispatch } from 'react-redux';
import { setVehicleReducer } from '../tripDataSlice';
import { vehicleArray } from '../data';
import ProgressBar from '../components/ProgessBar';

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
  color: ${colors.white};
`;

const NextButtonText = styled(ButtonText)`
  color: ${colors.textBlack};
`;

type Props = NativeStackScreenProps<RootStackParamList, 'SelectVehicle'>;

const SelectVehicleScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<number[]>([]);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        await Promise.all(
          vehicleArray.map((item) =>
            Asset.fromModule(item.image).downloadAsync()
          )
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error(error);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  const onPressNext = useCallback(() => {
    dispatch(setVehicleReducer(selectedVehicle));
    navigation.navigate('SelectActivity');
  }, [dispatch, navigation, selectedVehicle]);

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
        <ProgressBar step={3} />
        <Title>여행 시 이동 수단을 선택해주세요</Title>
        <Comment>
          어떤 방식으로 이동하실지 알려주시면, 놓치기 쉬운 준비물도 빠짐없이
          챙겨드릴게요!
        </Comment>
        <VehicleList
          data={vehicleArray}
          renderItem={({ item }: { item: VehicleItem }) => (
            <VehicleButton
              vehicle={item}
              isScrolling={isScrolling}
              onSelected={(id: number) => {
                setSelectedVehicle((prev) => {
                  return [...prev, id];
                });
              }}
              onUnselected={(id: number) => {
                setSelectedVehicle((prev) => {
                  return prev.filter((vehicleId) => vehicleId !== id);
                });
              }}
            />
          )}
          keyExtractor={(item: VehicleItem) => item.id}
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
          <NextButton onPress={onPressNext}>
            <NextButtonText>다음</NextButtonText>
          </NextButton>
        </ButtonBox>
      </Container>
    </SafeAreaView>
  );
};

export default SelectVehicleScreen;
