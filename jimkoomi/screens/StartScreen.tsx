import styled from 'styled-components/native';
import { colors } from '../colors';
import { ActivityIndicator, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';

const { width } = Dimensions.get('window');

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
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const LogoImage = styled(Image)`
  width: ${width / 3}px;
  height: ${width / 3}px;
  margin-bottom: 30px;
`;

const TextImage = styled(Image)`
  width: ${width / 2.5}px;
  height: ${(width / 2.5) * (242 / 678)}px;
  margin-bottom: 30px;
`;

const Comment = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  line-height: 36px;
`;

const StartButton = styled.Pressable`
  align-self: stretch;
  background-color: ${colors.blue};
  border-radius: 16px;
  padding: 20px 10px;
`;

const StartButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  text-align: center;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;

const StartScreen = ({ navigation }: Props) => {
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
        <ContentBox>
          <LogoImage
            source={require('../assets/logo/splash-logo.png')}
            contentFit="content"
          />
          <TextImage
            source={require('../assets/logo/text-logo.png')}
            contentFit="content"
          />
          <Comment>여행 전, 짐 걱정 끝!</Comment>
          <Comment>체크리스트로 완벽하게 준비하세요!</Comment>
        </ContentBox>
        <StartButton
          onPress={() => {
            navigation.navigate('WriteDestination');
          }}
        >
          <StartButtonText>시작하기</StartButtonText>
        </StartButton>
      </Container>
    </SafeAreaView>
  );
};

export default StartScreen;
