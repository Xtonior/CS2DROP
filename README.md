# CS2DROP

A full-stack web application inspired by CS2 case-opening mechanics. Built with **ASP.NET Core**, **Entity Framework Core**, **React (Vite + TypeScript)**, and a clean monolithic architecture following the **Domain–Application–Infrastructure–WebAPI** pattern.

## Features

* User authentication and authorization via **ASP.NET Core Identity**
* Case and item management with **EF Core**
* RESTful API with **DTOs** and **AutoMapper**
* Frontend built with **React**, **TypeScript**, and **Vite**
* Modular MVC design for clear separation of concerns
* Scalable monolith structure suitable for future microservice split

## Architecture

```
CS2DROP/
 └──server/
    ├── Domain/          # Core entities and domain logic
    ├── Application/     # Use cases, DTOs, interfaces
    ├── Infrastructure/  # EF Core, Identity, repositories
    ├── WebAPI/          # Controllers and endpoints
 └── client/          # React + TypeScript frontend (Vite)
```

## Tech Stack

**Backend:** ASP.NET Core, EF Core, Identity, AutoMapper
**Frontend:** React, TypeScript, Vite, Axios
**Other:** LINQ, Dependency Injection, REST API, MVC pattern

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Xtonior/CS2DROP.git
   cd CS2DROP/server
   ```
2. Configure connection strings and app settings in `appsettings.json`.
3. Apply migrations:

   ```bash
   dotnet ef database update
   ```
4. Run the API:

   ```bash
   dotnet run --project WebAPI
   ```
5. Start the frontend:

   ```bash
   cd client
   npm install
   npm run dev
   ```