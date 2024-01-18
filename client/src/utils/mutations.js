import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        role
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation(
    $name: String!
    $email: String!
    $password: String!
    $occupation: String!
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      occupation: $occupation
    ) {
      token
      user {
        name
        email
        password
        occupation
      }
    }
  }
`;
