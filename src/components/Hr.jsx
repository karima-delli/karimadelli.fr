import styled from 'styled-components';

const HrStyled = styled.hr`
  margin: 2rem auto;
  width: 90%;
  height: 7px;
  background: ${({ theme }) => theme.officeGreen};
`;

export default HrStyled;
