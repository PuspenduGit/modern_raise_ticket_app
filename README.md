###
![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=modern-raise-ticket-app) 
</br>
</br>
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
	![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
 ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
 ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
 ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
# CRUD Ticket App in Next.js

This is a simple Ticket Management Application built using Next.js. The application allows users to Create, Read, Update, and Delete (CRUD) tickets. It's designed to demonstrate how to build a basic CRUD application using Next.js.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- User authentication using NextAuth with crdentials and google providers
- Create a new ticket with a title, description, category, importance, progress and status.
- Read and list all existing tickets.
- Update ticket details or status.
- Delete a ticket.

## Getting Started

### Prerequisites

To run this project, you need to have the following software installed on your machine:

- Node.js: You can download and install Node.js from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/PuspenduGit/modern_raise_ticket_app.git
```

2. Navigate to the project directory:

```bash
cd modern_raise_ticket_app
```

3. Install the project dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your web browser and access the application at [http://localhost:3000](http://localhost:3000).

## Usage

- Sign up and login using credentials or with google.
- To create a new ticket, click on the "New Ticket" button and fill in the required information.
- To view the list of existing tickets, navigate to the homepage.
- To update , click on the ticket in the list and update the information.
- To delete, click the delete icon of that ticket
>**You cannot update other's tickets, ofcourse as it is user authernticated :,)**:

## Folder Structure

The project's folder structure is organized as follows:

```
modern_raise_ticket_app/
  ├── app/
  │  ├── page.jsx
  │  ├── globals.css 
  │  ├── layout.js
  │  ├── (components)/
  │  │   ├── DeleteTicket.jsx
  │  │   ├── ImportantTicket.jsx
  │  │   ├── Nav.jsx
  │  │   ├── Status.jsx
  │  │   ├── StatusDisplay.jsx
  │  │   ├── TicketCard.jsx
  │  │   ├── TicketForm.jsx
  │  ├── (models)/
  │  │   ├── Ticket.js
  │  │   ├── User.js
  │  ├── (utils)/
  │  │   ├── constants.js
  │  │   ├── db.js
  │  │   ├── SessionProvider.js
  │  ├── api/
  │  │  ├── [Tickets]/
  │  │  │  ├── [id]/
  │  │  │  │  ├── route.js
  │  │  │  ├── route.js
  │  │  ├── auth/
  │  │  │  │  ├── [...nextauth]/
  │  │  │  │  │  ├── route.js
  │  │  ├── signup/
  │  │  │  ├── route.js
  │  ├── login/
  │  │   ├── page.jsx
  │  ├── signup/
  │  │   ├── page.jsx
  │  ├── ticket_page/
  │  │   │  ├── [id]/
  │  │   │  │  ├──page.jsx
  │  │   ├── ...
  ├── package.json
  ├── README.md
  ├── .env.example
  └── ...
```

- The `app` directory contains the Next.js pages for routing and rendering components.
- The `components` directory contains reusable React components used in the application.
- The `model` directory contains the models / formats for user and tickets to store in database.
- The `components` directory contains reusable React components used in the application.
- The `utils` directory contains utility functions or modules that are used across the application.
- The `api` directory contains all the custom apis need for the application for the calls to backend and external services


## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building server-rendered applications.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Node.js](https://nodejs.org/): A JavaScript runtime.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for simplifying the process of designing and styling web applications.
- [MongoDB](https://www.mongodb.com/): Database to store the User's data.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
