import React from 'react';
import PropTypes from 'prop-types';
import { CardTitle } from 'material-ui/Card';
import Authors from './authors';

const CardDetails = (props) => (
  <CardTitle
    title={props.title}
    titleStyle={styles.title}
    subtitle={<Authors {...props} />}
  />
);

CardDetails.propTypes = {
  title: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string),
};

const styles = {
  title: {
    fontSize: '2rem',
  },
};

export default CardDetails;
