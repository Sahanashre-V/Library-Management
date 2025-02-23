-- New schema for library reports

-- Table for books
CREATE TABLE library_books (
  book_id SERIAL PRIMARY KEY,
  book_name VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL
);

-- Table for members
CREATE TABLE library_members (
  member_id SERIAL PRIMARY KEY,
  member_name VARCHAR(255) NOT NULL
);

-- Table for borrowings (issuances)
CREATE TABLE library_borrowings (
  borrowing_id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES library_books(book_id),
  member_id INTEGER NOT NULL REFERENCES library_members(member_id),
  issued_date DATE NOT NULL,
  target_return_date DATE NOT NULL,
  returned_date DATE  
);
