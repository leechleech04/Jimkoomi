import styled from 'styled-components/native';
import { colors } from '../colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import ActivityButton from '../components/ActivityButton';
import { useState } from 'react';
import { activities } from '../data';
import { useDispatch } from 'react-redux';
import { setActivityReducer } from '../tripDataSlice';

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
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const [selectedActivity, setSelectedActivity] = useState<number[]>([]);

  const dispatch = useDispatch();

  const onPressNext = () => {
    dispatch(setActivityReducer(selectedActivity));
    navigation.navigate('SelectActivity');
  };

  return (
    <SafeAreaView>
      <Container>
        <Title>여행 시 활동을 선택해주세요</Title>
        <Comment>
          어떤 활동을 계획하고 계신가요? 활동에 딱 맞는 준비물을 추천해 드릴 수
          있어요.
        </Comment>
        <ActivityScrollView
          onScrollBeginDrag={() => setIsScrolling(true)}
          onScrollEndDrag={() => setIsScrolling(false)}
          onMomentumScrollBegin={() => setIsScrolling(true)}
          onMomentumScrollEnd={() => setIsScrolling(false)}
        >
          <ActivityList>
            {activities.map((activity) => (
              <ActivityButton
                key={activity.id}
                id={activity.id}
                name={activity.name}
                isScrolling={isScrolling}
                onSelected={(id: number) => {
                  setSelectedActivity((prev) => {
                    return [...prev, id];
                  });
                }}
                onUnselected={(id: number) => {
                  setSelectedActivity((prev) => {
                    return prev.filter((activityId) => activityId !== id);
                  });
                }}
              />
            ))}
          </ActivityList>
        </ActivityScrollView>
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

export default SelectActivityScreen;
