# Password Manager Web App

Main entry into our web application.

## Getting Started

To run the app, navigate to the home dir and run the following commands:

```bash
npm install
npm run dev
```


## Pages

| Wireframe Page | endpoint | sample endpoint   |
| :---:   | :---: | :---: |
| home page | / | http://127.0.0.1:5173/   |
| Login Sign Up | /login-signup | http://127.0.0.1:5173/login-signup   |
| Dashboard | /dashboard| http://127.0.0.1:5173/dashboard|
| Collections | /dashboard/collections/:collectionId | http://127.0.0.1:5173/dashboard/collections/44fc3cb7-efea-42a6-aa31-0bf06b0c9f82  |
| Vault | /dashboard/collections/:collectionId/vaultItemId/:vaultID  | http://127.0.0.1:5173/dashboard/collections/1b7c8ea1-41e6-4415-8a38-5da9f36e4255/vaultItemId/ce2e1413-4ac6-4e29-9e6d-780587f39871   |
