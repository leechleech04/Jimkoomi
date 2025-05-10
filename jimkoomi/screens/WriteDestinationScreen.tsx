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
  align-items: center;
  flex-grow: 1;
  align-self: stretch;
  padding: 40px 0;
`;

const Comment = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  line-height: 36px;
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
        <Comment>여행의 목적지를 입력해주세요.</Comment>
        <ContentBox>
          <DestinationInput
            placeholder="ex) 서울, 도쿄"
            placeholderTextColor={colors.textGray}
          />
        </ContentBox>
        <StartButton onPress={() => navigation.navigate('Start')}>
          <StartButtonText>다음</StartButtonText>
        </StartButton>
      </Container>
    </SafeAreaView>
  );
};

export default WriteDestinationScreen;
