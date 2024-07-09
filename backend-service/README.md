# Express API Backend Service For My Journal Project

How to setup the service:

```sh
git clone https://github.com/ndambodavid/journal-moblie-app.git
```

## Change Directory to backend-service

```sh
cd backend-service
```
## Copy the environment variables from ```.env.example``` to ```env``` file

- Set the ```DATABASE_URL``` to your mysql connection url

## Install Dependecies

```sh
npm install
```

## Lint

```sh
npm run lint
```

## Test

```sh
npm run test
```

## Development

```sh
npm run dev
```


# API Documentation

- Endpoints are secured using JWT passed in the request header (cookies)

## User Endpoints

## Register User
- **URL:** `http://{host}:5000/api/user/register`
- **Method:** `POST`
- **Description:** API for creating a user account.
- **Payload:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

## Login User
- **URL:** `http://{host}:5000/api/user/login`
- **Method:** `POST`
- **Description:** API for login.
- **Payload:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

## Update User Details
- **URL:** `http://{host}:5000/api/user/update`
- **Method:** `PUT`
- **Description:** API for updating user details.
- **Payload:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

## Create Journal
- **URL:** `http://{host}:5000/api/journal`
- **Method:** `POST`
- **Description:** API for creating Journal.
- **Payload:**
  ```json
  {
    "title": "string",
    "content": "string",
    "categoryName": "string",
    "date": "Date"
  }
  ```

  ## Update Journal
- **URL:** `http://{host}:5000/api/journal`
- **Method:** `PUT`
- **Description:** API for updating Journal.
- **Payload:**
  ```json
  {
    "title": "string",
    "content": "string",
  }
  ```

  ## All Journals
- **URL:** `http://{host}:5000/api/journal`
- **Method:** `GET`
- **Description:** API for retrieving all Journals.
