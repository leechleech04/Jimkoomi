import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChecklistItemType, RootStackParamList } from '../types';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { useEffect, useState } from 'react';
import { createNewChecklist } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  addChecklistItem,
  clearChecklist,
  setChecklistName,
} from '../redux/checklistSlice';
import { ActivityIndicator, Text, View } from 'react-native';
import ChecklistItem from '../components/ChecklistItem';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.skyBlue};
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const TitleInput = styled.TextInput`
  align-self: stretch;
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  padding: 20px 10px;
  border-radius: 16px;
  background-color: ${colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  elevation: 4;
  margin: 0 20px;
`;

const CheckList = styled.FlatList`
  flex-grow: 1;
  align-self: stretch;
  margin-top: 20px;
`;

const Comment = styled.Text`
  text-align: left;
  font-size: 20px;
  color: ${colors.textGray};
  font-weight: 600;
  line-height: 30px;
  margin-top: 10px;
  align-self: stretch;
  margin: 20px;
`;

const SaveButton = styled.Pressable`
  background-color: ${colors.blue};
  border-radius: 16px;
  padding: 20px 15px;
  margin-top: 10px;
`;

const SaveButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.white};
  font-weight: bold;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'CreateChecklist'>;

const CreateChecklistScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const [listItems, setListItems] = useState<ChecklistItemType[]>([]);

  const tripData = useSelector((state: RootState) => state.tripData);
  const checklist = useSelector((state: RootState) => state.checklist.list);
  const checklistName = useSelector((state: RootState) => state.checklist.name);

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
      dispatch(clearChecklist());
      listItems.forEach((item) => {
        dispatch(addChecklistItem(item));
      });
    }
  }, [listItems]);

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
          날씨, 이동 수단 등을 고려하여 체크리스트를 생성했어요. 체크리스트를
          확인하고 필요에 따라 수정해주세요.
        </Comment>
        <TitleInput
          placeholder="체크리스트 제목을 입력하세요"
          value={checklistName}
          onChangeText={(text: string) => {
            dispatch(setChecklistName(text));
          }}
        />
        <CheckList
          data={checklist}
          renderItem={({ item }: { item: ChecklistItemType }) => (
            <ChecklistItem item={item} />
          )}
          keyExtractor={(item: ChecklistItemType) => item.id}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: colors.lightGray,
              }}
            />
          )}
        />
        <SaveButton>
          <SaveButtonText>체크리스트 저장</SaveButtonText>
        </SaveButton>
      </Container>
    </SafeAreaView>
  );
};

export default CreateChecklistScreen;
