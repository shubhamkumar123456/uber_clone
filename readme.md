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

// ...additional documentation if needed...
