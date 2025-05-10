import styled from 'styled-components/native';
import { colors } from '../colors';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.skyBlue};
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 20px;
`;

const ContentBox = styled.View`
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const LogoImage = styled.Image`
  width: ${width / 3}px;
  height: ${width / 3}px;
  margin-bottom: 30px;
`;

const TextImage = styled.Image`
  width: ${width / 2.5}px;
  height: ${(width / 2.5) * (242 / 678)}px;
  margin-bottom: 30px;
`;

const Comment = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
`;

const StartButton = styled.Pressable`
  align-self: stretch;
  background-color: ${colors.blue};
  border-radius: 16px;
  padding: 20px 0;
`;

const StartButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  text-align: center;
`;

const StartScreen = () => {
  return (
    <SafeAreaView>
      <Container>
        <ContentBox>
          <LogoImage source={require('../assets/splash-logo.png')} />
          <TextImage source={require('../assets/text-logo.png')} />
          <Comment>여행 전, 짐 걱정 끝!</Comment>
          <Comment>체크리스트로 완벽하게 준비하세요!</Comment>
        </ContentBox>
        <StartButton>
          <StartButtonText>시작하기</StartButtonText>
        </StartButton>
      </Container>
    </SafeAreaView>
  );
};

export default StartScreen;
