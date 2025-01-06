# API
User Management API
This project is a simple Node.js and Express.js REST API for managing users. It uses MOCK_DATA.json as a mock database to perform CRUD (Create, Read, Update, Delete) operations on user data. The API includes endpoints to fetch, create, update, and delete users, along with an HTML page to display the list of users.

Features
Display Users as HTML: View a list of users in a simple HTML format.
REST API Endpoints:
Fetch all users.
Fetch a user by ID.
Add a new user.
Update user details by ID.
Delete a user by ID.
File-Based Persistence: Changes to user data are saved to MOCK_DATA.json.

Installation
 - Clone the repository
 - Install dependencies
 - Start the server
 - Open:
    HTML View: http://localhost:8000/users
    API: http://localhost:8000/api/users


Endpoints
HTML
GET /users - List all users in HTML format.
REST API
GET /api/users - Get all users.
GET /api/users/:id - Get user by ID.
POST /api/users - Create a new user.
PATCH /api/users/:id - Update user by ID.
DELETE /api/users/:id - Delete user by ID.


