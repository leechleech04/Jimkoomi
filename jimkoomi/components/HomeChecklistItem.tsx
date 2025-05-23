import styled from 'styled-components/native';
import { ChecklistItemType, StoredChecklistType } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../colors';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCheckItem, toggleReminderItem } from '../redux/checklistSlice';
import { useEffect } from 'react';
import { RootState } from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;

const CheckButton = styled.Pressable``;

const ItemName = styled.Text`
  font-size: 24px;
  color: black;
  font-weight: bold;
  margin-left: 10px;
`;

const ItemQuantity = styled.Text`
  font-size: 24px;
  color: black;
  font-weight: bold;
  flex-grow: 1;
  text-align: right;
  margin-right: 10px;
`;

const ReminderButton = styled.Pressable``;

const HomeChecklistItem = ({ item }: { item: ChecklistItemType }) => {
  const dispatch = useDispatch();
  const handleCheck = () => {
    dispatch(toggleCheckItem(item.id));
  };

  const handleReminder = () => {
    dispatch(toggleReminderItem(item.id));
  };

  return (
    <Container>
      <CheckButton onPress={handleCheck}>
        <Ionicons
          name={item.isChecked ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={item.isChecked ? colors.blue : 'black'}
        />
      </CheckButton>
      <ItemName numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </ItemName>
      <ItemQuantity>{item.quantity}</ItemQuantity>
      <ReminderButton onPress={handleReminder}>
        <Ionicons
          name={
            item.hasReminder ? 'notifications' : 'notifications-off-outline'
          }
          size={24}
          color={item.hasReminder ? colors.blue : 'black'}
        />
      </ReminderButton>
    </Container>
  );
};

export default HomeChecklistItem;
