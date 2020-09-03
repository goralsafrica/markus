# Gorals User Hierachy System

A location based real estate solution

**Base URL** : https://aqueous-reef-54770.herokuapp.com/api

# **Endpoints**

### **POST** /auth/login- log user in

##### Request

```
{
  "email": String,
  "password": String,
}
```

##### Response

```
{
  "message": String,
  "token": Token
}
```

### **POST** /admin/user - creates a user

#### returns a cookie

##### Request

```
{
  "email": String,
  "firstName": String,
  "lastName": String,
  "role": "user" || "sub-admin",
  "password": String
}
```

##### Response

```
{
  "message": String,
  data: Object
}
```
