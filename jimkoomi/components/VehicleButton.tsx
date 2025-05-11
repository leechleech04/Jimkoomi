import styled from 'styled-components/native';
import { colors } from '../colors';
import { Image } from 'expo-image';
import { VehicleItem } from '../types';
import { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Container = styled(Animated.View)``;

const Vehicle = styled.Pressable`
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  padding: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
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
}: {
  vehicle: VehicleItem;
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
      <Vehicle onPressIn={handlePressIn} onPressOut={handlePressOut}>
        {isPressed ? (
          <GradientBackground
            colors={['white', colors.lightBlue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ) : null}
        <VehicleImage source={vehicle.image} />
        <VehicleText>{vehicle.name}</VehicleText>
      </Vehicle>
    </Container>
  );
};

export default VehicleButton;
