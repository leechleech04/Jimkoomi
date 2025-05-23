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
import { ActivityIndicator, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreatedChecklistItem from '../components/CreatedChecklistItem';
import { Ionicons } from '@expo/vector-icons';

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
  margin-top: 20px;
`;

const AddItemButton = styled.Pressable`
  width: 100%;
  background-color: ${colors.blue};
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const AddItemButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.white};
  font-weight: bold;
  margin-left: 20px;
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
  align-self: stretch;
  margin-top: 20px;
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

const CreateChecklistScreen = ({ route, navigation }: Props) => {
  const { isNewList } = route.params;

  const dispatch = useDispatch();

  const tripData = useSelector((state: RootState) => state.tripData);
  const checklist = useSelector((state: RootState) => state.checklist.list);
  const checklistName = useSelector((state: RootState) => state.checklist.name);

  const [isLoaded, setIsLoaded] = useState<boolean>(!isNewList);

  useEffect(() => {
    if (isNewList) {
      (async () => {
        try {
          const result = await createNewChecklist(tripData);
          dispatch(clearChecklist());
          result.forEach((item: ChecklistItemType) => {
            dispatch(addChecklistItem(item));
          });
          setIsLoaded(true);
        } catch (error) {
          console.error('체크리스트 생성 오류:', error);
        }
      })();
    }
  }, []);

  const handlePressSaveButton = async () => {
    if (checklistName.length === 0) {
      Alert.alert('체크리스트 제목을 입력해주세요.', '', [
        { text: '확인', style: 'default' },
      ]);
      return;
    } else {
      try {
        const existingChecklist = await AsyncStorage.getItem(
          'jimkoomiChecklist'
        );
        const parsedExistingChecklist = existingChecklist
          ? JSON.parse(existingChecklist)
          : {};

        if (!isNewList) {
          delete parsedExistingChecklist[checklistName];
        }

        const newChecklistData = {
          tripData,
          checklist: {
            name: checklistName,
            list: checklist,
          },
        };

        if (parsedExistingChecklist[checklistName]) {
          Alert.alert('이미 존재하는 제목입니다.', '', [
            { text: '확인', style: 'default' },
          ]);
          return;
        } else {
          parsedExistingChecklist[checklistName] = newChecklistData;
        }
        await AsyncStorage.setItem(
          'jimkoomiChecklist',
          JSON.stringify(parsedExistingChecklist)
        );
        Alert.alert('체크리스트가 저장되었습니다.', '', [
          {
            text: '확인',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            },
          },
        ]);
      } catch (error) {
        Alert.alert('체크리스트 저장 중 오류가 발생했습니다.', '', [
          { text: '확인', style: 'default' },
        ]);
      }
    }
  };

  const handlePressAddButton = () => {
    const id = checklist[checklist.length - 1].id
      ? checklist[checklist.length - 1].id + 1
      : 0;
    dispatch(
      addChecklistItem({
        id,
        name: '',
        quantity: 1,
        isChecked: false,
        hasReminder: false,
      })
    );
  };

  if (!isLoaded) {
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
        {isNewList ? (
          <Comment>
            날씨, 이동 수단 등을 고려하여 체크리스트를 생성했어요. 체크리스트를
            확인하고 필요에 따라 수정해주세요.
          </Comment>
        ) : null}
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
            <CreatedChecklistItem item={item} />
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
          ListFooterComponent={() => (
            <AddItemButton>
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={colors.white}
              />
              <AddItemButtonText onPress={handlePressAddButton}>
                항목 추가
              </AddItemButtonText>
            </AddItemButton>
          )}
        />
        <SaveButton onPress={handlePressSaveButton}>
          {isNewList ? (
            <SaveButtonText>체크리스트 저장</SaveButtonText>
          ) : (
            <SaveButtonText>체크리스트 수정</SaveButtonText>
          )}
        </SaveButton>
      </Container>
    </SafeAreaView>
  );
};

export default CreateChecklistScreen;
