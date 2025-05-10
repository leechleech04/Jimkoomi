import styled from 'styled-components/native';
import { colors } from '../colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../types';

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

type Props = NativeStackScreenProps<RootStackParamList, 'WriteDestination'>;

const WriteDestinationScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <Container>
        <Title>여행의 목적지를 입력해주세요.</Title>
        <Comment>
          어디로 떠나는지 알려주시면, 그 지역에 꼭 필요한 준비물을 알려드릴게요!
        </Comment>
        <ContentBox>
          <DestinationInput
            placeholder="ex) 서울, 도쿄"
            placeholderTextColor={colors.textGray}
          />
        </ContentBox>
        <StartButton onPress={() => navigation.navigate('WriteDate')}>
          <StartButtonText>다음</StartButtonText>
        </StartButton>
      </Container>
    </SafeAreaView>
  );
};

export default WriteDestinationScreen;
