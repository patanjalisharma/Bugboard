# BugBoard

**BugBoard** is an issue tracking application built with **Next.js** and **Prisma**, using **shadcn/ui** components for a modern interface and **Clerk** for authentication.

## Features

- Assignee-based issues  
- Restricted access: only authorized users can update issue status, edit, or delete issues  
- Secure and user-friendly interface
- User profiles to view issues created by you or assigned to you
- Dashboard visualization for tracking issue progress (Open / In Progress / Closed)

## Tech Stack

- **Next.js** – frontend and server-side rendering  
- **Prisma** – database ORM  
- **Shadcn/ui** – UI components  
- **Clerk** – user authentication and management  
- **PostgreSQL (Neon DB)** – database
- **SQLite** – development database

## Setup

- Clone the repository
  
- Run
  ```
  npm install
  ```
- Setup .env file

  
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
```

Made with ❤️ by **Patanjali Sharma**
