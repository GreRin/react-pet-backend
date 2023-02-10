const { buildSchema } = require('graphql');

export const schema = buildSchema(`
    type Query {
        getAllCourses: [Course!]
        course(id: Int!): Course
        courses(topic: String): [Course!]
    }
    type Mutation {
        createCourse(
          id: Int
          title: String
          author: String
          description: String
          topic: String
          url: String
        ): Course
        updateCourseTopic(id: Int!, topic: String!): Course
        getAllAlbums(userId: String): [Album!]
        createAlbum(userId: String!, title: String): Album
        updateAlbum(_id: String!, title: String!): Album
        deleteAlbum(_id: String!): Album
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
    type Album {
        _id: String!
        userId: String
        title: String
        foto: [Foto]
        createdAt: String
    }
    type Foto {
        _id: String
        title: String
        ref: String
    }
    input AlbumInput {
        userId: String
        title: String
    }
    input FotoInput {
        _id: String
        title: String
        ref: String
    }
`);
