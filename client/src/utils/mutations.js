import { gql } from '@apollo/client';

//Below has same issue as in the resolvers.js file: how do you make it email OR username?
export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

//Below: not sure if the parameters are correct at all
export const SAVE_BOOK = gql`
    mutation saveBook($userId: ID!, $bookId: ID!) {
        saveBook(userId: $userId, bookId: $bookId) {
            _id
            title
            books
        }
    }
`;

//Again, not sure if these are the correct parameters
export const REMOVE_BOOK = gql`
    mutation removeBook($book: String!) {
        removeBook(book: $book) {
            _id
            title
            books
        }
    }
`;