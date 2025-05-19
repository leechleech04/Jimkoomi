import styled from 'styled-components/native';
import { colors } from '../colors';
import { Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';

const Container = styled(Animated.View)``;

const ActivityItem = styled.Pressable<{
  isPressed: boolean;
}>`
  background-color: ${(props: { isPressed: boolean }) =>
    props.isPressed ? colors.blue : colors.skyBlue};
  border-width: 2px;
  border-color: ${(props: { isPressed: boolean }) =>
    props.isPressed ? colors.skyBlue : colors.blue};
  padding: 20px;
  border-radius: 16px;
  margin: 5px;
`;

const ActivityText = styled.Text<{
  isPressed: boolean;
}>`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  color: ${(props: { isPressed: boolean }) =>
    props.isPressed ? colors.white : colors.textBlack};
`;

const ActivityButton = ({
  id,
  name,
  isScrolling,
  onSelected,
  onUnselected,
}: {
  id: number;
  name: string;
  isScrolling: boolean;
  onSelected: (id: number) => void;
  onUnselected: (id: number) => void;
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const isScrollingRef = useRef(isScrolling);

  useEffect(() => {
    isScrollingRef.current = isScrolling;
  }, [isScrolling]);

  const ButtonScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(ButtonScale, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(ButtonScale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    if (!isScrollingRef.current) {
      setIsPressed((prev) => !prev);
    }
  };

  useEffect(() => {
    if (isPressed) {
      onSelected(id);
    } else {
      onUnselected(id);
    }
  }, [isPressed]);

  return (
    <Container style={{ transform: [{ scale: ButtonScale }] }}>
      <ActivityItem
        key={id}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        isPressed={isPressed}
      >
        <ActivityText isPressed={isPressed}>{name}</ActivityText>
      </ActivityItem>
    </Container>
  );
};

export default ActivityButton;
