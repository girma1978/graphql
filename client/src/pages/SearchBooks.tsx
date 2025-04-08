// import { useState, useEffect } from 'react';
// import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
// import { useMutation } from '@apollo/client';
// import { SEARCH_GOOGLE_BOOKS } from '../graphql/queries';
// import { SAVE_BOOK } from '../graphql/mutations';
// import Auth from '../utils/auth';
// import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
// import type { Book } from '../models/Book';

// const SearchBooks = () => {
//   // create state for holding returned google API data
//   const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
//   // create state for holding our search field data
//   const [searchInput, setSearchInput] = useState('');
//   // create state to hold saved bookId values
//   const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

//   // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
//   useEffect(() => {
//     return () => saveBookIds(savedBookIds);
//   }, [savedBookIds]);

//   // Apollo mutation for saving a book
//   const [saveBook] = useMutation(SAVE_BOOK);

//   // create method to search for books and set state on form submit
//   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!searchInput) {
//       return false;
//     }

//     try {
//       const { data } = await client.query({
//         query: SEARCH_GOOGLE_BOOKS,
//         variables: { searchTerm: searchInput },
//       });

//       const bookData = data.searchGoogleBooks.items.map((book: any) => ({
//         bookId: book.id,
//         authors: book.volumeInfo.authors || ['No author to display'],
//         title: book.volumeInfo.title,
//         description: book.volumeInfo.description,
//         image: book.volumeInfo.imageLinks?.thumbnail || '',
//       }));

//       setSearchedBooks(bookData);
//       setSearchInput('');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // create function to handle saving a book to our database
//   const handleSaveBook = async (bookId: string) => {
//     // find the book in `searchedBooks` state by the matching id
//     const bookToSave: Book = searchedBooks.find((book) => book.bookId === bookId)!;

//     // get token
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const response = await saveBook({
//         variables: {
//           bookId: bookToSave.bookId,
//           title: bookToSave.title,
//           authors: bookToSave.authors,
//           description: bookToSave.description,
//           image: bookToSave.image,
//         },
//       });

//       if (!response.data) {
//         throw new Error('something went wrong!');
//       }

//       // if book successfully saves to user's account, save book id to state
//       setSavedBookIds([...savedBookIds, bookToSave.bookId]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <div className="text-light bg-dark p-5">
//         <Container>
//           <h1>Search for Books!</h1>
//           <Form onSubmit={handleFormSubmit}>
//             <Row>
//               <Col xs={12} md={8}>
//                 <Form.Control
//                   name="searchInput"
//                   value={searchInput}
//                   onChange={(e) => setSearchInput(e.target.value)}
//                   type="text"
//                   size="lg"
//                   placeholder="Search for a book"
//                 />
//               </Col>
//               <Col xs={12} md={4}>
//                 <Button type="submit" variant="success" size="lg">
//                   Submit Search
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </Container>
//       </div>

//       <Container>
//         <h2 className="pt-5">
//           {searchedBooks.length
//             ? `Viewing ${searchedBooks.length} results:`
//             : 'Search for a book to begin'}
//         </h2>
//         <Row>
//           {searchedBooks.map((book) => {
//             return (
//               <Col md="4" key={book.bookId}>
//                 <Card border="dark">
//                   {book.image ? (
//                     <Card.Img
//                       src={book.image}
//                       alt={`The cover for ${book.title}`}
//                       variant="top"
//                     />
//                   ) : null}
//                   <Card.Body>
//                     <Card.Title>{book.title}</Card.Title>
//                     <p className="small">Authors: {book.authors}</p>
//                     <Card.Text>{book.description}</Card.Text>
//                     {Auth.loggedIn() && (
//                       <Button
//                         disabled={savedBookIds?.some(
//                           (savedBookId: string) => savedBookId === book.bookId
//                         )}
//                         className="btn-block btn-info"
//                         onClick={() => handleSaveBook(book.bookId)}
//                       >
//                         {savedBookIds?.some(
//                           (savedBookId: string) => savedBookId === book.bookId
//                         )
//                           ? 'This book has already been saved!'
//                           : 'Save this Book!'}
//                       </Button>
//                     )}
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SearchBooks;


// import { useState, useEffect } from 'react';
// import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
// import { useMutation, useApolloClient } from '@apollo/client'; // import useApolloClient
// import { SEARCH_GOOGLE_BOOKS } from '../graphql/queries';
// import { SAVE_BOOK } from '../graphql/mutations';
// import Auth from '../utils/auth';
// import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
// import type { Book } from '../models/Book';

// const SearchBooks = () => {
//   const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

//   useEffect(() => {
//     return () => saveBookIds(savedBookIds);
//   }, [savedBookIds]);

//   const [saveBook] = useMutation(SAVE_BOOK);

//   // Get the Apollo Client instance using the useApolloClient hook
//   const client = useApolloClient(); // Get Apollo Client instance

//   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!searchInput) {
//       return false;
//     }

//     try {
//       // Now you can use client.query() to perform the query
//       const { data } = await client.query({
//         query: SEARCH_GOOGLE_BOOKS,
//         variables: { searchTerm: searchInput },
//       });

//       const bookData = data.searchGoogleBooks.items.map((book: any) => ({
//         bookId: book.id,
//         authors: book.volumeInfo.authors || ['No author to display'],
//         title: book.volumeInfo.title,
//         description: book.volumeInfo.description,
//         image: book.volumeInfo.imageLinks?.thumbnail || '',
//       }));

//       setSearchedBooks(bookData);
//       setSearchInput('');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSaveBook = async (bookId: string) => {
//     const bookToSave: Book = searchedBooks.find((book) => book.bookId === bookId)!;

//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const response = await saveBook({
//         variables: {
//           bookId: bookToSave.bookId,
//           title: bookToSave.title,
//           authors: bookToSave.authors,
//           description: bookToSave.description,
//           image: bookToSave.image,
//         },
//       });

//       if (!response.data) {
//         throw new Error('something went wrong!');
//       }

//       setSavedBookIds([...savedBookIds, bookToSave.bookId]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <div className="text-light bg-dark p-5">
//         <Container>
//           <h1>Search for Books!</h1>
//           <Form onSubmit={handleFormSubmit}>
//             <Row>
//               <Col xs={12} md={8}>
//                 <Form.Control
//                   name="searchInput"
//                   value={searchInput}
//                   onChange={(e) => setSearchInput(e.target.value)}
//                   type="text"
//                   size="lg"
//                   placeholder="Search for a book"
//                 />
//               </Col>
//               <Col xs={12} md={4}>
//                 <Button type="submit" variant="success" size="lg">
//                   Submit Search
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </Container>
//       </div>

//       <Container>
//         <h2 className="pt-5">
//           {searchedBooks.length
//             ? `Viewing ${searchedBooks.length} results:`
//             : 'Search for a book to begin'}
//         </h2>
//         <Row>
//           {searchedBooks.map((book) => {
//             return (
//               <Col md="4" key={book.bookId}>
//                 <Card border="dark">
//                   {book.image ? (
//                     <Card.Img
//                       src={book.image}
//                       alt={`The cover for ${book.title}`}
//                       variant="top"
//                     />
//                   ) : null}
//                   <Card.Body>
//                     <Card.Title>{book.title}</Card.Title>
//                     <p className="small">Authors: {book.authors}</p>
//                     <Card.Text>{book.description}</Card.Text>
//                     {Auth.loggedIn() && (
//                       <Button
//                         disabled={savedBookIds?.some(
//                           (savedBookId: string) => savedBookId === book.bookId
//                         )}
//                         className="btn-block btn-info"
//                         onClick={() => handleSaveBook(book.bookId)}
//                       >
//                         {savedBookIds?.some(
//                           (savedBookId: string) => savedBookId === book.bookId
//                         )
//                           ? 'This book has already been saved!'
//                           : 'Save this Book!'}
//                       </Button>
//                     )}
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SearchBooks;



import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import { useMutation, useApolloClient } from '@apollo/client';
import { SEARCH_GOOGLE_BOOKS } from '../graphql/queries';
import { SAVE_BOOK } from '../graphql/mutations';
import Auth from '../utils/auth';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import type { Book } from '../models/Book';

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  }, [savedBookIds]);

  const [saveBook] = useMutation(SAVE_BOOK);
  const client = useApolloClient();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const { data } = await client.query({
        query: SEARCH_GOOGLE_BOOKS,
        variables: { searchTerm: searchInput },
      });

      const bookData = data.searchGoogleBooks.items.map((book: any) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || 'No description available',
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId: string) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId)!;

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveBook({
        variables: {
          input: {  // Wrap book data in input object to match schema
            bookId: bookToSave.bookId,
            title: bookToSave.title,
            authors: bookToSave.authors,
            description: bookToSave.description,
            image: bookToSave.image,
          },
        },
      });

      if (!response.data) {
        throw new Error('something went wrong!');
      }

      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a book"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some(
                          (savedBookId: string) => savedBookId === book.bookId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveBook(book.bookId)}
                      >
                        {savedBookIds?.some(
                          (savedBookId: string) => savedBookId === book.bookId
                        )
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;