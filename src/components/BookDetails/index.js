import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { get } from '../../BooksAPI';
import { EmptyShelf, EmptyShelfText, Loading } from '../styles';

class BookDetailsView extends Component {
  state = {
    data: null,
    loading: true,
  }

  async componentDidMount() {
    const data = await get(this.props.match.params.id);
    this.setState({
      data,
      loading: false,
    });
  }

  render() {
    const { loading, data } = this.state;
    let content;
    if (loading && !data) {
      content = <EmptyShelf><Loading /></EmptyShelf>;
    } else if (!this.state.data) {
      content = (
        <EmptyShelf>
          <EmptyShelfText>Details about this book are unavailable at this time.</EmptyShelfText>
          <EmptyShelfText spaced>Try again later.</EmptyShelfText>
        </EmptyShelf>
      );
    }
    else {
      const { title, subtitle, authors, description, infoLink, previewLink, imageLinks } = data;
      content = (
        <Card>
          <CardHeader
            title={title}
            subtitle={subtitle || null}
          />
          {
            (imageLinks && (imageLinks.thumbnail || imageLinks.smallThumbnail))
              && <img
                src={imageLinks.thumbnail || imageLinks.smallThumbnail}
                alt={`Cover preview for a book titled: ${title}`}
                style={{ padding: '1.6rem' }}
              />
          }
          {
            (authors && authors.length)
              && <CardText>
                  <span>Authors:</span>
                  <ul className="authors-list">
                    {
                      authors.map((author, i) => <li key={`${title}-author-${i}`}>{author}</li>)
                    }
                  </ul>
                </CardText>
          }
          {
            description && <CardText>{description}</CardText>
          }
          <CardActions>
            <FlatButton label="More" href={infoLink || previewLink} />
          </CardActions>
        </Card>
      );
    }
    return (
      <div>
        <Link to="/"><IconButton><ArrowBack color="#00bcd4" /></IconButton></Link>
        {content}
      </div>
    );
  }
};

BookDetailsView.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default BookDetailsView;
