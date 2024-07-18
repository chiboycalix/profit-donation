import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button) <{ $weight?: number }>`
  font-weight: ${props => props.$weight || 'inherit'};
`;

type WeightProps = 300 | 400 | 500 | 600 | 700 | 800;
type SizeProps = 'large' | 'small'

const CustomButton: React.FC<{
  children: React.ReactNode;
  weight: WeightProps;
  loading: boolean;
  size: SizeProps;
  onClick: any;
  style: any;
}> =
  ({ children, weight, loading, size, onClick, style }) => {
    return (
      <StyledButton
        type="primary"
        $weight={weight}
        loading={loading}
        size={size}
        onClick={onClick}
        style={style}
      >
        {children}
      </StyledButton>
    );
  };

export default CustomButton;