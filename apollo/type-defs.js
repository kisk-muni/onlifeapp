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

  type Quiz {
    gFormURL: String!
    display: Boolean!
    id: ID!
  }

  type SubTopic {
    id: ID!
    name: String!
    quiz: String
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
    isInGroup: Boolean!
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

  type QuizDetailItems {
    question: String
    answer: String
  }

  type QuizAttempt {
    result: Int
    time: String
    detail: [QuizDetailItems]
  } 

  type StudentSubtopicsResult {
    name: String
    quizAttempts: [QuizAttempt]
  }

  type StudentTopicsResult {
    name: String
    subtopics: [StudentSubtopicsResult]
  }

  type Query {
		user: User
    viewer: User
    groups: [Group]
    groupsSelect: [GroupsSelectItem]
    group(id: ID!): Group
    studentTopicsResults(id: ID!): [StudentTopicsResult]
    quiz(id: ID!): Quiz
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
