
# Ihsan Project

## Overview

The Ihsan Project is a comprehensive web application that includes both frontend and backend components. The frontend is built with React and Tailwind CSS, while the backend is powered by Node.js and Express. 

## Project Structure

### Frontend

The frontend is located in the `frontend` directory and includes the following key components:

- **Pages**: Contains the main pages of the application.
- **Components**: Reusable UI components.
- **Features**: Main folder where all page logic resides, with subfolders for different functionalities.
- **Routes**: All settings related to routes.
- **Public**: Static assets like images and icons.

### Backend

The backend is located in the `backend` directory and includes the following key components:

- **Controllers**: Handles the business logic.
- **Models**: Defines the data models.
- **Routes**: API endpoints.
- **Middleware**: Custom middleware functions.


## Installation

To get started with the project, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/ihsan.git
    ```

2. Navigate to the frontend directory and install dependencies:
    ```sh
    cd frontend
    npm install
    ```

3. Navigate to the backend directory and install dependencies:
    ```sh
    cd ../backend
    npm install
    ```



## Running the Project

### Frontend

To start the frontend development server, run:
```sh
cd frontend
npm start
```

### Backend

To start the backend server, run:
```sh
cd backend
node index.js
```




## Features

- Theme mode toggle
- Token-based user authentication
- Submenu support in sidebar
- Store management using Redux Toolkit
- Daisy UI components
- Right and left sidebar, universal loader, notifications, and other components
- React Chart.js 2 examples

## Contributing

Contributions are always welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Feedback

For feedback, please open an issue in the repository or contact me directly.

## Live Preview

🚀 [Live preview](https://ihsan-beta.vercel.app/app/dashboard)

## Roadmap

- Addition of users, chat/inbox page
- Calendar improvements
- Separate templates based on business functions like CRM, Sales, Project Management
