import React from 'react';
import { Route, Link } from 'react-router-dom';
import Subheader from 'material-ui/Subheader';
import { GridList, GridTile } from 'material-ui/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Navbar from './components/Navbar';
import Book from './components/Book';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Navbar />
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <div className="bookshelf-books">
                    <GridList cellHeight="auto">
                      <Subheader className="bookshelf-title">Currently Reading</Subheader>
                      <GridTile>
                        <Book
                          title="To Kill a Mockingbird"
                          author="Harper Lee" 
                          image="http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
                        />
                      </GridTile>
                      <GridTile>
                        <Book
                          title="Ender's Game"
                          author="Orson Scott Card"
                          image="http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
                        />
                      </GridTile>
                    </GridList>
                  </div>
                </div>
                <div className="bookshelf">
                  <div className="bookshelf-books">
                    <GridList cellHeight="auto">
                      <Subheader className="bookshelf-title">Want to Read</Subheader>
                      <GridTile>
                        <Book
                          image="http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"
                          title="1776"
                          author="David McCullough"
                        />
                      </GridTile>
                      <GridTile>
                        <Book
                          image="http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"
                          title="Harry Potter and the Sorcerer's Stone"
                          author="J.K. Rowling"
                        />
                      </GridTile>
                    </GridList>
                  </div>
                </div>
                <div className="bookshelf">
                  <div className="bookshelf-books">
                    <GridList cellHeight="auto">
                      <Subheader className="bookshelf-title">Read</Subheader>
                      <GridTile>
                        <Book
                          image="http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
                          title="The Hobbit"
                          author="J.R.R. Tolkien"
                        />
                      </GridTile>
                      <GridTile>
                        <Book
                          image="http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"
                          title="Oh, the Places You'll Go!"
                          author="Seuss"
                        />
                      </GridTile>
                      <GridTile>
                        <Book
                          image="http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api"
                          title="The Adventures of Tom Sawyer"
                          author="Mark Twain"
                        />
                      </GridTile>
                    </GridList>
                  </div>
                </div>
              </div>
            </div>
            <FloatingActionButton style={styles.searchLink} href="/search">
              <ContentAdd />
            </FloatingActionButton>
          </div>
        )} />
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

const styles = {
  searchLink: {
    position: 'fixed',
    right: 10,
    bottom: 10,
    zIndex: 10,
  },
};

export default BooksApp
