import styled from 'styled-components/native';
import { ChecklistItemType } from '../types';
import { colors } from '../colors';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import {
  deCreaseQuantity,
  inCreaseQuantity,
  removeChecklistItem,
  setItemName,
} from '../redux/checklistSlice';

const Container = styled.View`
  background-color: ${colors.white};
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const ContentBox = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
`;

const DeleteButton = styled.Pressable``;

const NameInput = styled.TextInput`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  margin-right: 20px;
  flex-grow: 1;
`;

const QuantityButton = styled.Pressable``;

const DecreaseQuantityButton = styled(QuantityButton)``;

const IncreaseQuantityButton = styled(QuantityButton)``;

const QuantityText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  margin: 0 10px;
`;

const ChecklistItem = ({ item }: { item: ChecklistItemType }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <DeleteButton
        onPress={() => {
          dispatch(removeChecklistItem(item.id));
        }}
      >
        <Ionicons name="trash-outline" size={24} color={colors.btnGray} />
      </DeleteButton>
      <ContentBox>
        <NameInput
          value={item.name}
          onChangeText={(text: string) => {
            dispatch(
              setItemName({
                id: item.id,
                name: text,
              })
            );
          }}
          placeholder="입력"
        />
        <DecreaseQuantityButton
          onPress={() => {
            dispatch(deCreaseQuantity(item.id));
          }}
        >
          <Ionicons
            name="remove-circle-outline"
            size={24}
            color={colors.btnRed}
          />
        </DecreaseQuantityButton>
        <QuantityText>{item.quantity}</QuantityText>
        <IncreaseQuantityButton
          onPress={() => {
            dispatch(inCreaseQuantity(item.id));
          }}
        >
          <Ionicons name="add-circle-outline" size={24} color={colors.blue} />
        </IncreaseQuantityButton>
      </ContentBox>
    </Container>
  );
};

export default ChecklistItem;
