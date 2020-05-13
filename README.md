# Onlife

[![Build Status](https://travis-ci.com/dalibor-123/onlifeapp.svg?token=zUWUg69HVpzxKsrVxM7s&branch=master)](https://travis-ci.com/dalibor-123/onlifeapp)

## Design decisions

- TypeScript for any new code
- Apollo graphql server and client, with generated TS types
- Firebase auth and database for its free plan
- Theme-ui styling options utilized to develop layouts and styles asap

## Get started

Setup local environment

```bash
cp .env .env.local
```

Set up Firebase:

- Create a project at the [Firebase console](https://console.firebase.google.com/).
- Get your account credentials from the Firebase console at _Project settings > Service accounts_, where you can click on _Generate new private key_ and download the credentials as a json file. It will contain keys such as `project_id`, `client_email` and `client_id`. Set them as environment variables in the `.env.local` file at the root of this project.
- Get your authentication credentials from the Firebase console under _Project settings > General> Your apps_ Add a new web app if you don't already have one. Under _Firebase SDK snippet_ choose _Config_ to get the configuration as JSON. It will include keys like `apiKey`, `authDomain` and `databaseUrl`. Set the appropriate environment variables in the `.env.local` file at the root of this project.

Install it and run:

```bash
yarn
yarn dev
```

## Other

Illustrations are from https://undraw.co/illustrations
