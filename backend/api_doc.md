# HEY COLLABORATOR, HERE IS OUR API DOC
### Author: Otsur Pegu



## BASE URL
- [baselink](http://localhost:3000/api/v1)
- Customer: http://localhost:3000/api/v1/customers
- Store: http://localhost:3000/api/v1/stores

### Abbreviation: RV = requires verification (user must be logged in)
### For now everything RV


<br>
<br>
## USER FEATURES
<br>
## 1. REGISTRATIONS

### A.Customer 
- POST/customers/register

### Form data

- Customer
    
    | Field         | Type   | Required |
    |---------------|--------|----------|
    |username       | String | yes      |
    |phoneNumber    | String | yes      |
    |email          | String | yes      |
    |fullName       | String | yes      |
    |avatar         | File   | no       |
    |password       | String | yes      |
    |---------------|--------|----------|



### B.Store
- POST/stores/register

### Form data

- Store

    | Field         | Type   | Required |
    |---------------|--------|----------|
    |username       | String | yes      |
    |phoneNumber    | String | yes      |
    |email          | String | yes      |
    |ownername      | String | yes      |
    |avatar         | String | yes      |
    |password       | File   | yes      |
    |doctors        | Array  | no       |
    |openTime       | Date   | yes      |
    |closeTime      | Date   | yes      |
    |location       | Object | yes      |
    |password       | String | yes      |
    |---------------|--------|----------|


<br>
<br>

## 2. LOGIN

## A. Customer
- POST/customers/login
- use email or username
- fields : username, email, password

## B. Store
- POST/stores/login
- use email or username
- fields : username, email, password

<br>
<br>

## 3. LOGOUT

## A. Customer
- POST/customers/logout

## B. Store
- POST/stores/logout

<br>
<br>

## 4. REFRESH ACCESS TOKEN

## A. Customer
- POST/customers/refresh-token

## B. Store
- POST/stores/refresh-token

<br>
<br>


## 5. CHANGE PASSWORD

- fields: oldPassword, newPassword

## A. Customer
- POST/customers/change-password

## B. Store
- POST/stores/change-password



<br>
<br>

# STORE FEATURES


### base: http://localhost:3000/api/v1/stores


## 1. Get current store
-  1. For corresponding store: 
-     GET: /current-store 
-  2. For customers: 
-     GET: /:storeId    

## 2. Update avatar
-  POST: /update-avatar
-  required "avatar" file

## 3. Update contact
-  POST: /update-contact
-  required "email" or "phoneNumber"

## 4. Update username
-  POST: /update-username
-  required "username"

## 5. Update store
-  POST: /update-store
-  required "ownerName", "openTime", "closeTime", "location"
-  for now "All those fields are required"

## 6. Get doctors
-  GET: /:storeId/doctors
-  requires "storeId"

## 7. Get tests
-  GET: /:storeId/tests
-  requires "storeId"

<br>

## IN STORE: 

## A. DOCTORS

### base: http://localhost:3000/api/v1/doctors

## 1. Create a doctor
- POST: "/create-doctors"

-   | Field         | Type   | Required |
    |---------------|--------|----------|
    |fullName       | String | yes      |
    |phoneNumber    | String | yes      |
    |email          | String | yes      |
    |ownername      | String | yes      |
    |avatar         | String | yes      |
    |password       | File   | yes      |
    |doctors        | Array  | no       |
    |openTime       | Date   | yes      |
    |closeTime      | Date   | yes      |
    |location       | Object | yes      |
    |password       | String | yes      |
    |---------------|--------|----------|






# CUSTOMER FEATURES


### base: http://localhost:3000/api/v1/customers


## 1. Get current user
- Returns the user, therefore only for the corresponding customer
- GET: /current-user

## 2. Update Account Details
- POST: /update-account
- requires "fullName" or "email" or "phoneNumber"

## 3. Update avatar
- POST: /update-avatar
- requires "avatar" file



