# HEY COLLABORATOR, HERE IS OUR API DOC
### Author: Otsur Pegu



## BASE URL
- [baselink](http://localhost:3000/api/v1)
- Customer: http://localhost:3000/api/v1/customers
- Store: http://localhost:3000/api/v1/stores


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

