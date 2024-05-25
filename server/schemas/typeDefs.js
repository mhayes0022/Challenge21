const typeDefs = `
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(content: BookContent!): User
        removeBook(bookId: ID!, content: BookContent!): User
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: 
        savedBooks: [Book]!
    }

    type Book {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: 
        link:
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookContent {
        authors: [String]
        description: String
        title: String
        bookId: ID
        image: [MediaDetails]
        link:
    }

    input MediaDetails {
        format: MediaFormat!
        url: String!
    }

    enum MediaFormat {
        IMAGE
    }
`;

module.exports = typeDefs;

//saveBook: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. 
//(Look into creating what's known as an input type to handle all of these parameters!)

//Above, Do I still need the Book object if I have the BookContent input?

//in input BookContent, do I need both image and link if they're bundled together in MediaDetails?

//should I keep 'MediaDetails' or go to 'ImageDetails'? is MediaDetails the required naming convention?

//How do I get the book count in User?