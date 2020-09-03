# Gorals User Hierachy System

An authentication based user system

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

# Admin Routes

### **POST** /admins/users - gets all users

##### Request

```
{}
```

##### Dummy Response

```
[
  {
    "firstName": String,
    "lastName": String,
    "email" : String,
    "role": String,
    "department": [
      {
        _id: String,
        name: String
      }
    ]
  }
]
```

### **POST** /admin/user - creates a user

##### Request

```
{
  "email": String,
  "firstName": String,
  "lastName": String,
  "role": "user" || "sub-admin",
  "password": String,
  "departmentId": Department ID
}
```

##### Response

```
{
  "message": String,
  data: Object
}
```

### **POST** /admins/users/:departments - gets all departments

##### Request

```
{}
```

##### Dummy Response

```
[

  {
    _id: String,
    name: String
  }

]
```

### **POST** /admins/users/:departmentId - gets all users in a department

##### Request

```
{}
```

##### Dummy Response

```
[
  {
    "firstName": String,
    "lastName": String,
    "email" : String,
    "role": String,
    "department": [
      {
        _id: String,
        name: String
      }
    ]
  }
]
```

### **POST** /admin/department - creates a department

##### Request

```
{
  "name": String,
}
```

##### Response

```
{
  "message": String,
  data: Object
}
```
