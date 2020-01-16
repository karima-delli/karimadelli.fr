import styled from 'styled-components';

const HrStyled = styled.hr`
  margin: auto;
  width: 90%;
  height: 7px;
  background: ${({ theme, color }) => color || theme.officeGreen};

  &.is-small {
    width: 3rem;
    height: 7px;
    background: ${({ theme, color }) => color || theme.licorice};
    transform: rotate(-${({ theme }) => theme.angle}deg);
  }
`;

export default HrStyled;
