import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ChecklistItemType,
  RootStackParamList,
  StoredChecklistType,
} from '../types';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeChecklistItem from '../components/HomeChecklistItem';
import { Alert, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setChecklist, setChecklistName } from '../redux/checklistSlice';
import { setTripData } from '../redux/tripDataSlice';
import { RootState } from '../redux/store';
const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.skyBlue};
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const ExitButton = styled.Pressable`
  margin-right: 10px;
  transform: rotateY(180deg);
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  flex-shrink: 1;
`;

const ButtonBox = styled.View`
  flex-direction: row;
  margin-left: auto;
  align-items: center;
`;

const DeleteButton = styled.Pressable`
  background-color: ${colors.btnRed};
  padding: 10px;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

const EditButton = styled.Pressable`
  background-color: ${colors.blue};
  padding: 10px;
  border-radius: 8px;
  margin-left: 10px;
`;

const SubTitleBox = styled.View`
  width: 100%;
  margin-top: 5px;
`;

const SubTitle = styled.Text`
  font-size: 20px;
  color: ${colors.textGray};
  font-weight: 600;
  margin-top: 5px;
`;

const Checklist = styled.FlatList`
  width: 100%;
  margin-top: 20px;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'ChecklistDetail'>;

const ChecklistDetailScreen = ({ route, navigation }: Props) => {
  const dispatch = useDispatch();
  const { name } = route.params;

  useEffect(() => {
    (async () => {
      try {
        const existingChecklists = await AsyncStorage.getItem(
          'jimkoomiChecklist'
        );
        const parsedExistingChecklists = existingChecklists
          ? JSON.parse(existingChecklists)
          : {};

        if (parsedExistingChecklists[name]) {
          dispatch(setChecklist(parsedExistingChecklists[name].checklist.list));
          dispatch(
            setChecklistName(parsedExistingChecklists[name].checklist.name)
          );
          dispatch(setTripData(parsedExistingChecklists[name].tripData));
        } else {
          throw new Error('체크리스트를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const checklist = useSelector((state: RootState) => state.checklist);
  const tripData = useSelector((state: RootState) => state.tripData);

  useEffect(() => {
    (async () => {
      try {
        const existingChecklists = await AsyncStorage.getItem(
          'jimkoomiChecklist'
        );
        const parsedExistingChecklists = existingChecklists
          ? JSON.parse(existingChecklists)
          : {};

        parsedExistingChecklists[checklist.name] = {
          tripData,
          checklist,
        };
        await AsyncStorage.setItem(
          'jimkoomiChecklist',
          JSON.stringify(parsedExistingChecklists)
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, [checklist]);

  const handlePressDelete = async () => {
    Alert.alert('체크리스트를 삭제하시겠습니까?', '', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', style: 'destructive', onPress: deleteChecklist },
    ]);
  };

  const deleteChecklist = async () => {
    try {
      const existingChecklists = await AsyncStorage.getItem(
        'jimkoomiChecklist'
      );
      const parsedExistingChecklists = existingChecklists
        ? JSON.parse(existingChecklists)
        : {};

      delete parsedExistingChecklists[checklist.name];
      await AsyncStorage.setItem(
        'jimkoomiChecklist',
        JSON.stringify(parsedExistingChecklists)
      );
    } catch (error) {
      console.error(error);
    }
    navigation.goBack();
  };

  const handlePressEdit = () => {};

  return (
    <SafeAreaView>
      <Container>
        <Header>
          <ExitButton onPress={() => navigation.goBack()}>
            <Ionicons name="exit-outline" size={36} color={colors.btnRed} />
          </ExitButton>
          <Title numberOfLines={1} ellipsizeMode="tail">
            {checklist.name}
          </Title>
          <ButtonBox>
            <DeleteButton onPress={handlePressDelete}>
              <ButtonText>삭제</ButtonText>
            </DeleteButton>
            <EditButton onPress={handlePressEdit}>
              <ButtonText>편집</ButtonText>
            </EditButton>
          </ButtonBox>
        </Header>
        <SubTitleBox>
          <SubTitle numberOfLines={1} ellipsizeMode="tail">
            목적지: {tripData.fullAddress}
          </SubTitle>
          <SubTitle numberOfLines={1} ellipsizeMode="tail">
            출발일: {tripData.startDate}
          </SubTitle>
          <SubTitle numberOfLines={1} ellipsizeMode="tail">
            기간: {tripData.duration}박 {tripData.duration + 1}일
          </SubTitle>
        </SubTitleBox>
        <Checklist
          data={checklist.list}
          keyExtractor={(item: ChecklistItemType) => item.id.toString()}
          renderItem={({ item }: { item: ChecklistItemType }) => (
            <HomeChecklistItem item={item} />
          )}
        />
      </Container>
    </SafeAreaView>
  );
};

export default ChecklistDetailScreen;
