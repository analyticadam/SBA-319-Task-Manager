# Task Manager Application

A simple task management system that allows users to create, view, edit, and delete tasks. Built with Node.js, Express, and MongoDB.

## Features

- Create, Read, Update, and Delete (CRUD) tasks
- User-friendly interface with EJS templates
- MongoDB validation for data consistency
- Sample data for quick testing
- Indexing for optimized query performance

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/repository-name.git
   ```
2. Navigate into the project directory:;
   cd repository-name
3. Install dependencies:
   npm install
4. Set Up Environment Variables Create a .env file in the root directory and add your MongoDB connection string:
   MONGO_URI=your-mongodb-connection-string
5. Run the Application:
   npm start
6. Open your browser and navigate to http://localhost:4242.
   Populate Sample Data Run the seed script to add sample data:
   node seed.js

---

### API Documentation

List the available API routes, their HTTP methods, and their purposes.

Example:

## API Endpoints

### Tasks

- `GET /`: Fetch all tasks.
- `POST /tasks`: Create a new task.
  - **Request Body Example**:
    ```json
    {
    	"title": "New Task",
    	"description": "Task description",
    	"status": "Pending",
    	"user": "User1",
    	"dueDate": "2024-12-15",
    	"category": "Work"
    }
    ```
- `PUT /tasks/:id`: Update a task by ID.
- `PATCH /tasks/:id`: Partially update a task by ID (optional if implemented).
- `DELETE /tasks/:id`: Delete a task by ID.

### Users

- `GET /users`: Fetch all users (if implemented).
- `POST /users`: Add a new user.

Example:

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- EJS (Embedded JavaScript templates)
- HTML, CSS (for the front end)

5. Known Issues (Optional)
   If there are any incomplete features or bugs, mention them here for transparency.

Example:

## Known Issues

- PATCH route for partial updates is under development.
- The delete route currently requires manual verification for sample data population.

---

## Future Enhancements

- Implement user authentication and authorization.
- Add task filtering and search functionality.
- Create a mobile-responsive front-end design.

Example:

## License

This project is licensed under the MIT License.
