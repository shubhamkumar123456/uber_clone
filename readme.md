# API Documentation

## POST /users/register

### Description

Registers a new user by validating the provided email, password, and fullname.

### Request Data

- **fullname**: an object containing:
  - **firstname** (string, required, minimum 3 characters)
  - **lastname** (string, optional, minimum 3 characters if provided)
- **email**: string, required, in a valid email format
- **password**: string, required, minimum 6 characters

### Responses

**Success (201 Created)**

- Returns the created user object and an authentication token.

```
{
  "user": { /* user data */ },
  "token": "jwt_token"
}
```

**Validation Error (400 Bad Request)**

- Returns errors if request validation fails.

```
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
    // ...more errors
  ]
}
```

**Server Error (500 Internal Server Error)**

- Returns an error message if the operation fails unexpectedly.

```
{
  "error": "Error message"
}
```

## POST /users/login

### Description

Authenticates a user with email and password, returning an authentication token if credentials are valid.

### HTTP Method

POST

### Request Data

- **email**: string, required, in a valid email format
- **password**: string, required, minimum 6 characters

### Responses

**Success (200 OK)**

- Returns the user object and an authentication token.

```
{
  "user": { /* user data */ },
  "token": "jwt_token"
}
```

**Validation Error (400 Bad Request)**

- Returns errors if request validation fails.

```
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
    // ...more errors
  ]
}
```

**Unauthorized (401 Unauthorized)**

- Returned when credentials are invalid.

```
{
  "message": "Invalid email or password"
}
```

**Server Error (500 Internal Server Error)**

- Returns an error message if an unexpected error occurs.

```
{
  "error": "Error message"
}
```

## GET /users/profile

### Description

Retrieves the profile of the authenticated user. Requires a valid token via cookies or Authorization header.

### HTTP Method

GET

### Request Data

Headers:

- Authorization: Bearer <token>
- Cookie: token=<token>

### Responses

**Success (200 OK)**

```
{
  "user": { /* user profile data */ }
}
```

**Unauthorized (401 Unauthorized)**

```
{
  "message": "Unauthorized"
}
```

## GET /users/logout

### Description

Logs out the current user by clearing the authentication token cookie and blacklisting the token. Requires a valid token via cookies or Authorization header.

### HTTP Method

GET

### Request Data

Headers:

- Authorization: Bearer <token>
- Cookie: token=<token>

### Responses

**Success (200 OK)**

```
{
  "message": "Logged out successfully"
}
```

**Unauthorized (401 Unauthorized)**

```
{
  "message": "Unauthorized"
}
```

// ...additional documentation if needed...
