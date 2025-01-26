# Upraised Backend Challenge

## Gadget APIs

## Project Description

This API serves as the backbone for the Impossible Missions Force (IMF) gadget management system. Built with Node.js, Express, and PostgreSQL, it allows secure management of gadgets, including adding new items, retrieving the inventory, updating gadget details, and decommissioning obsolete gadgets. Each gadget is assigned a unique codename and a "mission success probability." Additionally, it features a self-destruct sequence that requires a confirmation code to trigger. The API ensures the gadgets' integrity and readiness for any high-stakes missions.

[Deployed Link](https://upraised-challenge-backend.onrender.com)

---

## API Endpoints

### 1. Register API

- **Method:** POST
- **URL:** `https://upraised-challenge-backend.onrender.com/register`
- **Request Body:**
  ```json
  {
    "username": "akash008",
    "password": "trees"
  }
  ```
- **Description:** This endpoint is responsible for registering a new user. During registration, the user's password is securely hashed using bcryptjs before being stored in the PostgreSQL database. All gadget-related requests pass through an authentication middleware that requires users to be logged in.

---

### 2. Login API

- **Method:** POST
- **URL:** `https://upraised-challenge-backend.onrender.com/login`
- **Request Body:**
  ```json
  {
    "username": "akash007",
    "password": "trees"
  }
  ```
- **Description:** This endpoint allows users to log into the system. Upon successful authentication, a JSON Web Token (JWT) is generated. This token should then be included in the request headers for all subsequent requests, enabling secure access to the system's features.

---

### 3. Add Gadget API

- **Method:** POST
- **URL:** `https://upraised-challenge-backend.onrender.com/gadgets/post`
- **Request Body:**
  ```json
  {
    "name": "stim beacon",
    "status": "Deployed"
  }
  ```
- **Authorization Header:**
  ```json
  {
    "authorization": "Bearer <JWT>"
  }
  ```
- **Description:** Adds a gadget to the list of gadgets. The gadget has parameters like `name`, `status`, and `codename`. The status can be one of the following: `Available`, `Deployed`, `Destroyed`, or `Decommissioned`. The `status` parameter defaults to `Available`.

---

### 4. Retrieve Gadgets

- **Method:** GET
- **URL:** `https://upraised-challenge-backend.onrender.com/gadgets/get?Available`
- **Authorization Header:**
  ```json
  {
    "authorization": "Bearer <JWT>"
  }
  ```
- **Description:** Fetches the list of gadgets with the status denoted in the URL. If no status is given, all gadgets are fetched by default. The request also returns the success probability of each gadget.

---

### 5. Update Gadget

- **Method:** PATCH
- **URL:** `https://upraised-challenge-backend.onrender.com/gadgets/patch/<gadget_id>?codename=<new_codename>`
- **Authorization Header:**
  ```json
  {
    "authorization": "Bearer <JWT>"
  }
  ```
- **Description:** Updates details of a gadget such as `name`, `status`, and `codename`. The gadget ID is passed in the URL parameters.

---

### 6. Delete Gadget

- **Method:** DELETE
- **URL:** `https://upraised-challenge-backend.onrender.com/gadgets/delete/<gadget_id>`
- **Authorization Header:**
  ```json
  {
    "authorization": "Bearer <JWT>"
  }
  ```
- **Description:** Deletes a gadget by updating its `status` to 'Decommissioned'. The gadget ID is passed in the URL parameters.

---

### 7. Self-destruct API

- **Method:** POST
- **URL:** `https://upraised-challenge-backend.onrender.com/gadgets/<gadget_id>/self-destruct`
- **Request Body:**
  ```json
  {
    "confirmCode": "70"
  }
  ```
- **Authorization Header:**
  ```json
  {
    "authorization": "Bearer <JWT>"
  }
  ```
- **Description:** This API triggers the self-destruct sequence of a gadget. A confirmation code is required to initiate the self-destruct sequence. The gadget ID is passed in the URL.

---

## How to Use

1. **Registration:** Start by registering a new user using the `Register API`.
2. **Login:** Log in with the registered credentials to receive a JWT.
3. **Use JWT:** Include the JWT in the authorization header for all subsequent API requests (IMPORTANT).
4. **Test Gadget Management:** Use the `Add Gadget API`, `Retrieve Gadgets`, `Update Gadget`, `Delete Gadget`, and `Self-destruct API` to manage gadgets.

---

## Technologies Used

- Node.js
- Express
- PostgreSQL
- JSON Web Token (JWT)
- bcryptjs
