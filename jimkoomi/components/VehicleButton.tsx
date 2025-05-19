import styled from 'styled-components/native';
import { colors } from '../colors';
import { Image } from 'expo-image';
import { VehicleItem } from '../types';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled(Animated.View)``;

const Vehicle = styled.Pressable<{
  isPressed: boolean;
}>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  padding: 5px;
  background-color: ${(props: { isPressed: boolean }) =>
    props.isPressed ? colors.blue : colors.skyBlue};
  border-width: 2px;
  border-color: ${(props: { isPressed: boolean }) =>
    props.isPressed ? colors.skyBlue : colors.blue};
`;

const VehicleImage = styled(Image)`
  width: 100px;
  height: 100px;
`;

const VehicleText = styled.Text`
  font-size: 24px;
  color: ${colors.textBlack};
  font-weight: bold;
  margin-left: 40px;
  flex-grow: 1;
`;

const VehicleButton = ({
  vehicle,
  isScrolling,
  onSelected,
  onUnselected,
}: {
  vehicle: VehicleItem;
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
      onSelected(vehicle.id);
    } else {
      onUnselected(vehicle.id);
    }
  }, [isPressed]);

  return (
    <Container style={{ transform: [{ scale: ButtonScale }] }}>
      <Vehicle
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        isPressed={isPressed}
      >
        <VehicleImage source={vehicle.image} />
        <VehicleText>{vehicle.name}</VehicleText>
        {isPressed && (
          <Ionicons
            name="checkmark-circle"
            size={36}
            color={colors.white}
            style={{ marginRight: 20 }}
          />
        )}
      </Vehicle>
    </Container>
  );
};

export default VehicleButton;
