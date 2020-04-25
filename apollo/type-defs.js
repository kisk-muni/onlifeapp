import gql from 'graphql-tag'

export const typeDefs = gql`	
	type Student {
		id: ID!
		name: String
		email: String!
		picture: String
	}

	type Group {
		id: ID!
		invitationCode: String
		students: [Student]
    name: String!
    color: String!
  }

  type GroupsSelectItem {
    id: ID!
    link: String!
    name: String!
  }

  type Quizz {
    link: String!
    display: Boolean!
    id: ID!
  }

  type SubTopic {
    gFormURL: String!
    display: Boolean!
    id: ID!
    name: String!
  }

  type Topic {
    id: ID!
    picture: String!
    thumbnail: String!
    name: String!
    subtopics: [SubTopic]
  }

  type User {
    id: ID!
    isTeacher: Boolean!
    email: String!
    name: String
    photoURL: String
  }

  input AddGroupInput {
    name: String!
  }

  type AddGroupPayload {
    name: String!
    id: String!
    color: String!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

	type JoinGroupPayload {
    joined: Boolean!
  }

	type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  input JoinGroupAttemptInput {
    code: String!
  }

  type JoinGroupAttemptPayload {
    name: String
  }

  type Query {
		user: User
    viewer: User
    groups: [Group]
    groupsSelect: [GroupsSelectItem]
    group(id: ID!): Group
    quizz: Quizz
    topics: [Topic]
    topic(id: ID!): Topic
  }

  type Mutation {
    joinGroupAttempt(input: JoinGroupAttemptInput!): JoinGroupAttemptPayload!
		joinGroup: JoinGroupPayload!
		addGroup(input: AddGroupInput!): AddGroupPayload!
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
  }
`
