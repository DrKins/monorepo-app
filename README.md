# Monorepo App

This monorepo contains both a frontend and backend application.

- **Frontend**: React app
- **Backend**: Node.js app using Express and Sequelize

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v20 or higher)
- **Yarn** (v1.22 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone [<repository-url>](https://github.com/DrKins/monorepo-app.git)
   cd monorepo-app
   ```
2. Install all dependencies:
   ```bash
   yarn install-all
   ```
3. Start the Docker containers:
   ```bash
   docker-compose up --build
   ```

### Usage

1. Open your browser and navigate to:  
   `http://localhost:4173`
2. Login or register to access the home page.
3. The main page includes:
   - **Cards with infinite scroll and pagination**.
   - Options to **filter**, **like**, and **dislike** cards.
   - The ability to **create new cards**.

### User Credentials

You can use the following test accounts to log in:

| **Email**         | **Password** |
| ----------------- | ------------ |
| admin@gmail.com   | admin        |
| admin@hotmail.com | password     |

---

## Development

### Steps for Development

1. Make your changes in the **frontend** or **backend** directory.
2. Rebuild the frontend:
   ```bash
   cd frontend
   yarn build
   ```
3. Rebuild the backend:
   ```bash
   cd backend
   yarn build
   ```
4. Restart Docker containers:
   ```bash
   docker-compose up -d
   ```
5. Restart the frontend and backend servers:
   ```bash
   yarn start
   ```

---

## Main Features

- **User Authentication**: Login with JWT sessions
- **Registration**
- **Search Functionality**
- **Filter Options**
- **Like/Dislike Cards**
- **Pagination**
- **Infinite Scroll**

---

## Frontend Dependencies

- **Chakra UI**
- **Framer Motion**
- **React Query**

## Backend Dependencies

- **Express**
- **Bcrypt**
- **Jose**
- **Sequelize**
- **Zod**

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
