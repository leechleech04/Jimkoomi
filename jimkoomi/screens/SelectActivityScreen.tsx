import styled from 'styled-components/native';
import { colors } from '../colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

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

const ActivityScrollView = styled.ScrollView`
  flex-grow: 1;
  align-self: stretch;
  margin: 40px 0;
`;

const ActivityList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ActivityItem = styled.Pressable`
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  margin: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  elevation: 4;
`;

const ActivityText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
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

type Props = NativeStackScreenProps<RootStackParamList, 'SelectActivity'>;

const SelectActivityScreen = ({ navigation }: Props) => {
  const activities = [
    { id: '1', name: '등산' },
    { id: '2', name: '캠핑' },
    { id: '3', name: '낚시' },
    { id: '4', name: '천체 관측' },
    { id: '5', name: '자전거' },
    { id: '6', name: '피크닉' },
    { id: '7', name: '수영' },
    { id: '8', name: '수상 스포츠' },
    { id: '9', name: '겨울 스포츠' },
    { id: '10', name: '관광지' },
    { id: '11', name: '맛집' },
    { id: '12', name: '쇼핑' },
    { id: '13', name: '축제' },
    { id: '14', name: '공연 관람' },
    { id: '15', name: '사진 촬영' },
    { id: '16', name: '마사지' },
    { id: '17', name: '온천/찜질방' },
    { id: '18', name: '리조트' },
    { id: '19', name: '스포츠 관람' },
    { id: '20', name: '봉사활동' },
    { id: '21', name: '유학' },
    { id: '22', name: '가족 여행' },
    { id: '23', name: '크루즈' },
  ];

  return (
    <SafeAreaView>
      <Container>
        <Title>여행 시 활동을 선택해주세요</Title>
        <Comment>
          어떤 활동을 계획하고 계신가요? 활동에 딱 맞는 준비물을 추천해 드릴 수
          있어요.
        </Comment>
        <ActivityScrollView>
          <ActivityList>
            {activities.map((activity) => (
              <ActivityItem key={activity.id}>
                <ActivityText>{activity.name}</ActivityText>
              </ActivityItem>
            ))}
          </ActivityList>
        </ActivityScrollView>
        <ButtonBox>
          <BackButton onPress={() => navigation.goBack()}>
            <BackButtonText>이전</BackButtonText>
          </BackButton>
          <NextButton onPress={() => navigation.navigate('Start')}>
            <NextButtonText>다음</NextButtonText>
          </NextButton>
        </ButtonBox>
      </Container>
    </SafeAreaView>
  );
};

export default SelectActivityScreen;
