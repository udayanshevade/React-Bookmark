import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';

export const EmptyShelf = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

export const EmptyShelfText = styled.p`
  margin-top: ${props => (props.spaced ? '2rem' : 0)};
  font-size: 1.5rem;
  color: #333;
`;

export const Loading = styled(CircularProgress)`
  margin: 5rem 0;
`;
