import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChecklistItem, RootStackParamList } from '../types';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { useEffect, useState } from 'react';
import { createNewChecklist } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addChecklistItem } from '../redux/checklistSlice';
import { ActivityIndicator, Text, View } from 'react-native';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.skyBlue};
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

const CheckList = styled.FlatList`
  flex-grow: 1;
  align-self: stretch;
  margin: 40px 0;
`;

const Comment = styled.Text`
  text-align: left;
  font-size: 20px;
  color: ${colors.textGray};
  font-weight: bold;
  line-height: 30px;
  margin-top: 10px;
  align-self: stretch;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'CreateChecklist'>;

const CreateChecklistScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const [listItems, setListItems] = useState<ChecklistItem[]>([]);

  const tripData = useSelector((state: RootState) => state.tripData);

  useEffect(() => {
    (async () => {
      try {
        const result = await createNewChecklist(tripData);

        setListItems(result);
      } catch (error) {
        console.error('체크리스트 생성 오류:', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (listItems.length > 0) {
      listItems.forEach((item) => {
        dispatch(addChecklistItem(item));
      });
    }
  }, [listItems]);

  const checklist = useSelector((state: RootState) => state.checklist.list);

  if (checklist.length === 0) {
    return (
      <SafeAreaView>
        <Container>
          <Comment>체크리스트를 생성 중입니다...</Comment>
          <ActivityIndicator
            size="large"
            color={colors.blue}
            style={{
              marginTop: 20,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
        </Container>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Container>
        <Comment>
          날씨, 이동 수단 등을 고려하여 체크리스트를 생성했습니다.
        </Comment>
        <CheckList
          data={checklist}
          renderItem={({ item }: { item: ChecklistItem }) => (
            <Text>
              {item.name} - {item.quantity}개 - id: {item.id}
            </Text>
          )}
          keyExtractor={(item: ChecklistItem) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      </Container>
    </SafeAreaView>
  );
};

export default CreateChecklistScreen;
