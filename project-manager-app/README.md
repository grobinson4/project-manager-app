# Project Manager

Project Manager is a full-stack web application designed to help users efficiently manage projects and tasks. Built with modern technologies, it offers a seamless experience for project tracking and task management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Set Up Environment Variables](#3-set-up-environment-variables)
  - [4. Set Up the Database](#4-set-up-the-database)
  - [5. Run Database Migrations](#5-run-database-migrations)
  - [6. Start the Development Server](#6-start-the-development-server)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure login and registration using NextAuth.js.
- **Project Management:** Create, update, delete, and view projects.
- **Task Management:** Add, edit, delete, and track tasks within projects.
- **Dashboard:** Overview of all projects and tasks.
- **Responsive Design:** Accessible on both desktop and mobile devices.

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/)
- **Backend:** [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v18 or higher)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/getting-started/install)
- [PostgreSQL](https://www.postgresql.org/download/) (local installation or a cloud-based instance)

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/project-manager.git
cd project-manager
```
### 2. Install Dependencies

Using npm:
```bash
npm install
```
Or Using Yarn:
```bash
yarn install
```
### 3. Set Up Environment Variables
1. Rename the ```bash .env.example ``` file to ```bash .env ```
2. Open the ```.env ``` file and configure the following variables:
```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
``` 
- ```DATABASE URL```: Your PostgreSQL connection string. Replace ```USER```,```PASSWORD```,```HOST```,```PORT```, and 
```DATABASE``` with your PostgreSQL credentials.
- ```NEXTAUTH_URL```: The base URL of your application.
- ```NEXTAUTH_SECRET```: A secret key for NextAuth.js. You can generate one using the command:
```bash
openssl rand -base64 32
```
### 4. Set Up the Database
Ensure your PostgreSQL server is running. If you haven't created a database for this project, do so now.

### 5. Run Database Migrations
Use Prisma to set up the database schema:
```bash
npx prisma migrate dev --name init
```
This command will apply the migrations and set up the necessary tables in your database.
### 6. Start the Development Server
Launch the development server:
Using npm:
```bash
npm run dev
```
Or using Yarn:
```bash
yarn dev
```
Open your browser and navigate to ```http://localhost:3000``` to see the application in action.

## Available Scripts
- ```dev```: Starts the development server.
- ```build```: Builds the application for production.
- ```start```: Starts the production server.
- ```prisma:migrate```: Runs database migrations using Prisma.

## Deployment

To deploy the application: 
1. Environment Variables: Ensure all necessary environment variables are set in your hosting environment.
2. Database: Ensure the production database is set up and accessible 
3. **Build the Application**:
```bash
npm run start
```
For cloud deployments, consider platforms like [Vercel](https://vercel.com/new) or [Netlify](https://www.netlify.com/).

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.
