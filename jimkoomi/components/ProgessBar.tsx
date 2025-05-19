import styled from 'styled-components/native';
import { colors } from '../colors';

const Container = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  border-radius: 3px;
`;

const StepBar = styled.View<{ isCurrentStep: boolean }>`
  height: 3px;
  flex-grow: 1;
  background-color: ${(props: { isCurrentStep: boolean }) =>
    props.isCurrentStep ? colors.blue : colors.btnGray};
`;

const ProgressBar = ({ step }: { step: number }) => {
  return (
    <Container>
      <StepBar isCurrentStep={step === 1 ? true : false} />
      <StepBar isCurrentStep={step === 2 ? true : false} />
      <StepBar isCurrentStep={step === 3 ? true : false} />
      <StepBar isCurrentStep={step === 4 ? true : false} />
    </Container>
  );
};

export default ProgressBar;
