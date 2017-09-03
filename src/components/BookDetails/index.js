import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Home from 'material-ui/svg-icons/action/home';
import Authors from '../Book/authors';
import { get } from '../../BooksAPI';
import { EmptyShelf, EmptyShelfText, Loading } from '../styles';

class BookDetailsView extends Component {
  state = {
    data: null,
    loading: true,
  }

  async componentDidMount() {
    try {
      const data = await get(this.props.match.params.id);
      this.setState({ data, loading: false });
    } catch (e) {
      this.setState({ loading: false });
      this.props.openSnackbar('Book data could not be fetched.')
    }
  }

  render() {
    const { loading, data } = this.state;
    let content;
    if (loading && !data) {
      content = <EmptyShelf><Loading /></EmptyShelf>;
    } else if (!data) {
      content = (
        <EmptyShelf>
          <EmptyShelfText lighten>Details for this book are not available right now.</EmptyShelfText>
          <EmptyShelfText lighten spaced>Check your connection, refresh the app, or try again later.</EmptyShelfText>
        </EmptyShelf>
      );
    }
    else {
      const { title, subtitle, authors, description, infoLink, previewLink, imageLinks } = data;
      const imgSrc = imageLinks ? imageLinks.thumbnail || imageLinks.smallThumbnail : null;
      content = (
        <Card>
          <CardHeader
            title={title}
            subtitle={subtitle || null}
          />
          {
            imgSrc
              && <img
                src={imgSrc}
                alt={`Cover preview for a book titled: ${title}`}
                style={{ padding: '1.6rem' }}
              />
          }
          {
            <CardText>
              <span>Authors:</span>
              <Authors authors={authors} title={title} />
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
        <Link to="/"><IconButton><Home color="#00bcd4" /></IconButton></Link>
        {content}
      </div>
    );
  }
};

BookDetailsView.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string,
  }),
  openSnackbar: PropTypes.func,
};

export default BookDetailsView;
