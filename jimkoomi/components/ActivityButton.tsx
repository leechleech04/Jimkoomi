import styled from 'styled-components/native';
import { colors } from '../colors';
import { Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';

const Container = styled(Animated.View)``;

const ActivityItem = styled.Pressable`
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  margin: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  elevation: 4;
`;

const ActivityText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
`;

const ActivityButton = ({
  id,
  name,
  isScrolling,
}: {
  id: number;
  name: string;
  isScrolling: boolean;
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

  return (
    <Container style={{ transform: [{ scale: ButtonScale }] }}>
      <ActivityItem
        key={id}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ backgroundColor: isPressed ? colors.lightBlue : 'white' }}
      >
        <ActivityText>{name}</ActivityText>
      </ActivityItem>
    </Container>
  );
};

export default ActivityButton;
