import styled from 'styled-components/native';
import { colors } from '../colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';

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

const DateBox = styled.View`
  align-self: stretch;
  padding: 20px 10px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  elevation: 4;
`;

const DateButton = styled.Pressable``;

const DateText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
`;

const DurationBox = styled.View`
  align-self: stretch;
  flex-direction: row;
  margin-bottom: 20px;
`;

const DurationButton = styled.Pressable`
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  elevation: 4;
`;

const DurationAddButton = styled(DurationButton)`
  background-color: ${colors.lightBlue};
`;

const DurationSubtractButton = styled(DurationButton)`
  background-color: ${colors.btnRed};
`;

const DurationText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  padding: 20px 10px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  elevation: 4;
  flex-grow: 1;
  text-align: center;
  margin: 0 10px;
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
  font-weight: bold;
  text-align: center;
`;

const BackButtonText = styled(ButtonText)`
  color: white;
`;

const NextButtonText = styled(ButtonText)`
  color: ${colors.textBlack};
`;

type Props = NativeStackScreenProps<RootStackParamList, 'WriteDate'>;

const WriteDateScreen = ({ navigation }: Props) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const [duration, setDuration] = useState<number>(1);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startIncrement = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 100);
  };

  const startDecrement = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setDuration((prev) => Math.max(prev - 1, 0));
    }, 100);
  };

  const stopContinuousChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <Title>여행의 출발 날짜, 기간을 입력해주세요</Title>
        <Comment>
          언제 떠나는 여행인가요? 계절과 날씨에 맞게 챙길 것들을 골라볼게요.
        </Comment>
        <ContentBox>
          <DurationBox>
            <DurationSubtractButton
              onPress={() => setDuration((prev) => Math.max(prev - 1, 0))}
              onLongPress={startDecrement}
              onPressOut={stopContinuousChange}
              delayLongPress={500}
            >
              <Ionicons name="remove" size={24} color={colors.textBlack} />
            </DurationSubtractButton>
            {duration === 0 ? (
              <DurationText>당일치기</DurationText>
            ) : (
              <DurationText>
                {duration}박 {duration + 1}일
              </DurationText>
            )}
            <DurationAddButton
              onPress={() => setDuration((prev) => prev + 1)}
              onLongPress={startIncrement}
              onPressOut={stopContinuousChange}
              delayLongPress={500}
            >
              <Ionicons name="add" size={24} color={colors.textBlack} />
            </DurationAddButton>
          </DurationBox>
          <DateBox>
            <DateButton onPress={() => setShowPicker((prev) => !prev)}>
              <DateText>
                {Platform.OS === 'android'
                  ? date.toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                  : date.toLocaleDateString('ko-KR')}
              </DateText>
            </DateButton>
          </DateBox>
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              display="spinner"
              onChange={onChange}
              minimumDate={new Date()}
              locale="ko-KR"
              themeVariant="light"
            />
          )}
        </ContentBox>
        <ButtonBox>
          <BackButton onPress={() => navigation.goBack()}>
            <BackButtonText>이전</BackButtonText>
          </BackButton>
          <NextButton onPress={() => navigation.navigate('SelectVehicle')}>
            <NextButtonText>다음</NextButtonText>
          </NextButton>
        </ButtonBox>
      </Container>
    </SafeAreaView>
  );
};

export default WriteDateScreen;
