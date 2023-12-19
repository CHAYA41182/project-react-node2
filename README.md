# Project Managment data

In this project, we are developing a full-stack application that combines a client and a server. The client is developed with React and the server is developed with Node.js and Express. The application allows users to view and create photos, posts, and tasks.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [License](#license)


## Installation

To install the project, run the following commands:

```bash
# Clone the repository
git clone https://github.com/username/repository.git

# Navigate to the project directory
cd project-directory

# Install dependencies for the server
cd server
npm install

# Install dependencies for the client
cd ../client
npm install
```

## Usage

To run the project, run the following commands:

```bash
# Run the client & server with concurrently
cd client
npm run dev

# Run the Express server only
cd server
npm run server

# Run the React client only
cd client
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

## Technologies

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [React Router](https://reactrouter.com/)

the project interface includes the following pages:
- [X] Home page - the main page of the project
- [X] Photos page - the page that displays all the photos, and allows the user to add, edit, and delete photos
- [X] Posts page - the page that displays all the posts, and allows the user to add, edit, and delete posts
- [X] Tasks page - the page that displays all the tasks, and allows the user to add, edit, and delete tasks. it also allows the user to mark a task as completed
- [X] Users page - the page that displays all the users, and allows the user to add, edit, and delete users
- [X] Add photo page - the page that allows the user to add a new photo
- [X] Add post page - the page that allows the user to add a new post
- [X] Add task page - the page that allows the user to add a new task
- [X] Add user page - the page that allows the user to add a new user
- [X] Edit photo page - the page that allows the user to edit a photo
- [X] Edit post page - the page that allows the user to edit a post
- [X] Edit task page - the page that allows the user to edit a task
- [X] Edit user page - the page that allows the user to edit a user

the server includes the following routes:
- [X] GET /api/photos - returns all the photos
- [X] GET /api/photos/:id - returns a photo by id
- [X] POST /api/photos - adds a new photo
- [X] PUT /api/photos/:id - updates a photo by id
- [X] DELETE /api/photos/:id - deletes a photo by id
- [X] GET /api/posts - returns all the posts
- [X] GET /api/posts/:id - returns a post by id
- [X] POST /api/posts - adds a new post
- [X] PUT /api/posts/:id - updates a post by id
- [X] DELETE /api/posts/:id - deletes a post by id
- [X] GET /api/tasks - returns all the tasks
- [X] GET /api/tasks/:id - returns a task by id
- [X] POST /api/tasks - adds a new task
- [X] PUT /api/tasks/:id - updates a task by id
- [X] DELETE /api/tasks/:id - deletes a task by id
- [X] GET /api/users - returns all the users
- [X] GET /api/users/:id - returns a user by id
- [X] POST /api/users - adds a new user
- [X] PUT /api/users/:id - updates a user by id
- [X] DELETE /api/users/:id - deletes a user by id

the schema of the data is as follows:
- [X] Photo
    - [X] id - string
    - [X] title - string
    - [X] link - string
    - [X] album - string
- [X] Post
    - [X] id - string
    - [X] title - string
    - [X] body - string
    - [X] author - string
    - [X] tags - array of strings
- [X] Task
    - [X] id - string
    - [X] title - string
    - [X] tags - array of strings
    - [X] importante - boolean
    - [X] range - number between 1 and 5
    - [X] description - string
    - [X] status - boolean
    - [X] date - date
    - [X] icon - string
- [X] User
    - [X] id - string
    - [X] name - string
    - [X] email - string
    - [X] password - string
    - [X] roles - array of strings


## License

[MIT](https://choosealicense.com/licenses/mit/)

