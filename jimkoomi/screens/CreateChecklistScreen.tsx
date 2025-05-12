import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { useEffect } from 'react';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.skyBlue};
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

const ContentBox = styled.View`
  flex-grow: 1;
  align-self: stretch;
  padding: 40px 0;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'CreateChecklist'>;

const CreateChecklistScreen = ({ navigation }: Props) => {
  useEffect(() => {
    
  }, []);

  return (
    <SafeAreaView>
      <Container>
        <ContentBox></ContentBox>
      </Container>
    </SafeAreaView>
  );
};

export default CreateChecklistScreen;
