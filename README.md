# Backend-Developer-Assignment-I
# Vaccine Registration Backend API

This project is a backend solution for a vaccine registration system. It allows users to register, book vaccine slots, and for admins to manage users and view available slots. The API is built using **Node.js**, **Express**, and **MongoDB Atlas**.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
  - [Admin Endpoints](#admin-endpoints)
- [Data Flow Diagram](#data-flow-diagram)
- [Contact](#contact)

## Project Overview

This API simulates the vaccine registration system similar to the **CoWIN** app. It allows users to register, book slots for their first and second vaccine doses, and manage their registrations. Admins can view registered users and slots.

## Tech Stack
- **Node.js**: Backend framework
- **Express**: Web framework for Node.js
- **MongoDB Atlas**: Cloud database for data storage
- **Mongoose**: ODM for MongoDB
- **Postman**: For API testing

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your MongoDB URI:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>?retryWrites=true&w=majority
   PORT=3000
   JWT_SECRET=your-secret-key
   ```
   username : omkaromkar721
   password:Omkar@187(use %40 when included in the string as password includes '@' which is a special character)

5. **Start the server:**
   > npm start
   The API will run on `http://localhost:3000`.

## API Documentation

### User Endpoints

#### 1. **Register a User**
   - **URL**: `/api/user/register`
   - **Method**: `POST`
   - **Description**: Registers a new user with mandatory details.
   - **Request** Body:
     json
     {
       "name": "John Doe",
       "phoneNumber": "1234567890",
       "age": 25,
       "pincode": "500001",
       "aadharNo": "123412341234",
       "password": "password123"
     }

   - **Response**: 
     ```json
     {
       "message": "User registered successfully"
     }
     ```

#### 2. **Login a User**
   - **URL**: `/api/user/login`
   - **Method**: `POST`
   - **Description**: Logs in a user using phone number and password.
   - **Request Body**:
     ```json
     {
       "phoneNumber": "1234567890",
       "password": "password123"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "<jwt-token>"
     }
     ```

#### 3. **Book a Slot**
   - **URL**: `/api/slot/bookSlot`
   - **Method**: `POST`
   - **Description**: Books a vaccination slot for first or second dose.
   - **Request Body**:
     ```json
     {
       "userId": "user-id",
       "date": "2024-11-01",
       "time": "10:00",
       "dose": "first"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Slot booked for first dose"
     }
     ```

### Admin Endpoints

#### 1. **Get Registered Users**
   - **URL**: `/api/admin/users`
   - **Method**: `GET`
   - **Description**: Fetches users based on filters for age, pincode, or vaccination status.
   - **Query Params**:
     - `age`: Optional. Filter by age.
     - `pincode`: Optional. Filter by pincode.
     - `vaccinated`: Optional. Filter by vaccination status (`none`, `first`, `second`).
   - **Response**:
      json
     {
       "total": 10,
       "users": [
         {
           "_id": "64f723c5d9fd0419ef9a2b1c",
           "name": "John Doe",
           "age": 25,
           "pincode": "500001",
           "vaccinated": "none"
         }
       ]
     }
    

#### 2. **Get Available Slots**
   - **URL**: `/api/admin/slots`
   - **Method**: `GET`
   - **Description**: Retrieves all available slots for a given date.
   - **Query Params**:
     - `date`: Optional. Fetch slots for a specific date.
   - **Response**:
     ```json
     [
       {
         "_id": "64f723c5d9fd0419ef9a2b2c",
         "date": "2024-11-01",
         "time": "10:00",
         "availableDoses": 5
       }
     ]
     ```

## Data Flow Diagram


This flow diagram illustrates:
1. The **User** registers and the API stores the data in **MongoDB**.
2. The **User** books a slot, and the API updates the slot data in **MongoDB**.
3. The **Admin** fetches user and slot data through the API, which reads from **MongoDB**.
