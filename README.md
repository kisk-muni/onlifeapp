# Onlife app

## How to use

Set up Firebase:

- Create a project at the [Firebase console](https://console.firebase.google.com/).
- Get your account credentials from the Firebase console at _Project settings > Service accounts_, where you can click on _Generate new private key_ and download the credentials as a json file. It will contain keys such as `project_id`, `client_email` and `client_id`. Set them as environment variables in the `.env` file at the root of this project.
- Get your authentication credentials from the Firebase console under _Project settings > General> Your apps_ Add a new web app if you don't already have one. Under _Firebase SDK snippet_ choose _Config_ to get the configuration as JSON. It will include keys like `apiKey`, `authDomain` and `databaseUrl`. Set the appropriate environment variables in the `.env` file at the root of this project.

Install it and run:

```bash
npm install
npm run dev
```

## Todo

- [ ] fix withApollo usage
- [ ] setup and try firestore connection: apollo-link-cloud-firestore
- [ ] add example env to git

## Other

Illustrations are from https://undraw.co/illustrations

Firebase tricks

```bash
firebase deploy --only functions:
```

Patching tricks

```bash
yarn patch-package --exclude ^$ --include package.json react-firebaseui
```
