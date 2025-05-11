import styled from 'styled-components/native';
import { colors } from '../colors';
import { Image } from 'expo-image';
import { VehicleItem } from '../types';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Container = styled(Animated.View)``;

const Vehicle = styled.Pressable`
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  padding: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: ${colors.white};
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

const GradientBackground = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 16px;
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
      <Vehicle onPressIn={handlePressIn} onPressOut={handlePressOut}>
        {isPressed ? (
          <GradientBackground
            colors={[colors.white, colors.lightBlue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ) : null}
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
