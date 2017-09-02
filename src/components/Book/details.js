import React from 'react';
import PropTypes from 'prop-types';
import { CardTitle } from 'material-ui/Card';

const CardDetails = ({ title, authors }) => (
  <CardTitle
    title={title}
    titleStyle={styles.title}
    subtitle={
      !authors || !authors.length
        ? null
        : (
          <ul className="authors-list">
            {
              authors.map((author, i) => <li key={`${title}-author-${i}`}>{author}</li>)
            }
          </ul>
        )
    }
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
