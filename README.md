# Monorepo App

This is a monorepo containing a frontend and backend app. The frontend is a React app and the backend is a Node.js app using Express and Sequelize.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn (v1.22 or higher)
- Docker (v20.10 or higher)
- Docker Compose (v1.29 or higher)

### Installation

1. Clone the repository
2. Install dependencies by running `yarn install-all` in the root directory
3. Start the Docker containers by running `docker-compose up -d`
4. Start the frontend by running `yarn start` in the frontend directory
5. Start the backend by running `yarn start` in the backend directory

### Usage

1. Open a web browser and navigate to `http://localhost:4173`
2. You should see a simple web page with list of boxes and disabled buttons"

### Development

1. Make changes to the code in the frontend or backend directory
2. Run `yarn build` in the frontend directory to rebuild the frontend
3. Run `yarn build` in the backend directory to rebuild the backend
4. Restart the Docker containers by running `docker-compose up -d`
5. Restart the frontend and backend by running `yarn start` in their respective directories

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
