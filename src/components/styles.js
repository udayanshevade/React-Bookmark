import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';

export const EmptyShelf = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const EmptyShelfText = styled.p`
  margin-top: ${props => (props.spaced ? '2rem' : 0)};
  font-size: 1.5rem;
  color: ${props => (props.lighten ? '#666' : '#333')};
`;

export const Loading = styled(CircularProgress)`
  margin: 5rem 0;
`;
