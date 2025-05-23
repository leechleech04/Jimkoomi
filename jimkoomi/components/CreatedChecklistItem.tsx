import styled from 'styled-components/native';
import { ChecklistItemType } from '../types';
import { colors } from '../colors';
import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import {
  deCreaseQuantity,
  inCreaseQuantity,
  removeChecklistItem,
  setItemName,
} from '../redux/checklistSlice';
import { TextInput } from 'react-native';

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

const NameContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const DeleteButton = styled.Pressable``;

const NameInput = styled.TextInput`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
`;

const ReviseButton = styled.Pressable`
  margin-left: 5px;
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

const CreatedChecklistItem = ({ item }: { item: ChecklistItemType }) => {
  const dispatch = useDispatch();

  const [isEditable, setIsEditable] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const handleReviseButtonPress = () => {
    setIsEditable(!isEditable);
    if (inputRef.current) {
      setTimeout(() => {
        if (isEditable) {
          inputRef.current?.blur();
        } else {
          inputRef.current?.focus();
        }
      }, 0);
    }
  };

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
        <NameContainer>
          <NameInput
            ref={inputRef}
            value={item.name}
            onChangeText={(text: string) => {
              if (text.length === 0) {
                return;
              }
              dispatch(
                setItemName({
                  id: item.id,
                  name: text,
                })
              );
            }}
            placeholder="입력"
            editable={isEditable}
            onBlur={() => setIsEditable(false)}
          />
          {!isEditable && (
            <ReviseButton onPress={handleReviseButtonPress}>
              <Ionicons name="pencil" size={20} color={colors.textGray} />
            </ReviseButton>
          )}
        </NameContainer>
        <QuantityContainer>
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
        </QuantityContainer>
      </ContentBox>
    </Container>
  );
};

export default CreatedChecklistItem;
