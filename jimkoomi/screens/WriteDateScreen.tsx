import styled from 'styled-components/native';
import { colors } from '../colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useCallback, useEffect, useRef, useState } from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { setDateReducer } from '../redux/tripDataSlice';
import ProgressBar from '../components/ProgessBar';
import moment from 'moment';
import { View } from 'react-native';

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
  font-weight: 600;
  line-height: 30px;
  margin-top: 10px;
`;

const DateButton = styled.Pressable`
  align-self: stretch;
  padding: 20px 10px;
  border-radius: 16px;
  background-color: ${colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  elevation: 4;
`;

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

const DurationAddButton = styled(DurationButton)<{ disabled: boolean }>`
  background-color: ${(props: { disabled: boolean }) =>
    props.disabled ? colors.btnGray : colors.lightBlue};
`;

const DurationSubtractButton = styled(DurationButton)<{ disabled: boolean }>`
  background-color: ${(props: { disabled: boolean }) =>
    props.disabled ? colors.btnGray : colors.btnRed};
`;

const DurationText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  padding: 20px 10px;
  border-radius: 16px;
  background-color: ${colors.white};
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
  color: ${colors.white};
`;

const NextButtonText = styled(ButtonText)`
  color: ${colors.textBlack};
`;

type Props = NativeStackScreenProps<RootStackParamList, 'WriteDate'>;

const WriteDateScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [duration, setDuration] = useState<number>(1);

  const onChange = useCallback(
    (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    },
    [date]
  );

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
      setDuration((prev) => Math.min(prev + 1, 15));
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

  const onPressNext = useCallback(() => {
    dispatch(
      setDateReducer({
        startDate: moment(date).format('YYYY-MM-DD'),
        duration: duration,
      })
    );
    navigation.navigate('SelectVehicle');
  }, [date, duration, dispatch, navigation]);

  return (
    <SafeAreaView>
      <Container>
        <ProgressBar step={2} />
        <Title>여행의 기간, 출발 날짜를 입력해주세요</Title>
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
              disabled={duration === 0}
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
              onPress={() => setDuration((prev) => Math.min(prev + 1, 15))}
              onLongPress={startIncrement}
              onPressOut={stopContinuousChange}
              delayLongPress={500}
              disabled={duration === 15}
            >
              <Ionicons name="add" size={24} color={colors.textBlack} />
            </DurationAddButton>
          </DurationBox>
          <DateButton onPress={() => setShowPicker((prev) => !prev)}>
            <DateText>
              {date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </DateText>
          </DateButton>
          <View style={{ height: 20 }} />
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              display="default"
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
          <NextButton onPress={onPressNext}>
            <NextButtonText>다음</NextButtonText>
          </NextButton>
        </ButtonBox>
      </Container>
    </SafeAreaView>
  );
};

export default WriteDateScreen;
