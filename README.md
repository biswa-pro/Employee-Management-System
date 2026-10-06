# Employee Management API

A simple CRUD REST API built with Spring Boot, Spring Web MVC, Spring Data JPA, Hibernate, and PostgreSQL.

## Features

- Create an employee
- Get all employees
- Get employee by ID
- Update employee
- Delete employee
- Request validation
- Global exception handling
- PostgreSQL database integration

## Tech Stack

- Java 17+
- Spring Boot 4.1.1
- Spring Web MVC
- Spring Data JPA
- Hibernate
- PostgreSQL
- Maven
- Postman

## Project Structure

```text
src/main/java/com/example/employeemanagement/
├── controller/
│   └── EmployeeController.java
├── entity/
│   └── Employee.java
├── exception/
│   ├── EmployeeNotFoundException.java
│   └── GlobalExceptionHandler.java
├── repository/
│   └── EmployeeRepository.java
├── service/
│   └── EmployeeService.java
└── EmployeeManagementApplication.java
```

## Database Setup

Open PostgreSQL / pgAdmin and run:

```sql
CREATE DATABASE employee_db;
```

Then update the username and password in:

```text
src/main/resources/application.properties
```

Default example:

```properties
spring.datasource.username=postgres
spring.datasource.password=postgres
```

`spring.jpa.hibernate.ddl-auto=update` lets Hibernate create/update the `employees` table automatically when the application starts.

## Run the Project

Make sure Java and Maven are installed, then run:

```bash
mvn clean spring-boot:run
```

The API starts at:

```text
http://localhost:8080
```

## API Endpoints

### 1. Create Employee

`POST /api/employees`

Request body:

```json
{
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "department": "IT"
}
```

### 2. Get All Employees

`GET /api/employees`

### 3. Get Employee By ID

`GET /api/employees/1`

### 4. Update Employee

`PUT /api/employees/1`

Request body:

```json
{
  "name": "Rahul Sharma",
  "email": "rahul.sharma@example.com",
  "department": "Development"
}
```

### 5. Delete Employee

`DELETE /api/employees/1`

## Example Response

```json
{
  "id": 1,
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "department": "IT"
}
```

## HTTP Status Codes Used

- `201 Created` - employee created successfully
- `200 OK` - successful GET/PUT request
- `204 No Content` - employee deleted successfully
- `404 Not Found` - employee ID does not exist

## GitHub

After testing the project locally:

```bash
git init
git add .
git commit -m "Create Employee Management REST API"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/employee-management-api.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Interview Explanation

This project follows a layered architecture:

```text
Client / Postman
       ↓
Controller
       ↓
Service
       ↓
Repository
       ↓
JPA / Hibernate
       ↓
PostgreSQL
```

The controller handles HTTP requests, the service contains business logic, the repository communicates with the database through Spring Data JPA, and Hibernate maps the Employee entity to the PostgreSQL table.
