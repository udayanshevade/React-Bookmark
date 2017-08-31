import styled from 'styled-components';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

export const PaddedGrid = styled(Grid)`
    margin: 1em 0 !important;
    width: 100% !important;
`;

export const SearchButton = styled(Button)`
    position: fixed !important;
    right: 1em;
    bottom: 1em;
`;