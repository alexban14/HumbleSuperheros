# Humble Superheros App

This is a demo application for a "Humble Superheros" app, showcasing my technical knowledge developing full-stack Node.js applications using Typescript, React.js, Nest.js, Docker, Postgres, Prisma, and Docker Compose.

## Project Setup

### Pre-requisites
- Docker version 27.4.1 or higher
- Docker Compose version 2.32.4 or higher

### Environment setup steps

- build the project Docker images and run the containers by running:
```shell
docker compose up -d --build
```

- enter the server container by running:
```shell
docker compose exec -it server sh
```
- and run the following commands in the shown order
```shell
npx prisma migrate dev
npx ts-node prisma/demo.seeder.ts
```

## Login credentials

- username: admin@example.com
- password: admin123


## *The application can be now accessed at http://localhost:8762*

## Team Collaboration

When collaborating with a teammate to improve or expand this task, I would focus on clear and consistent communication to ensure that everyone is on the same page. I’d encourage frequent code reviews, where each team member provides feedback, ensuring high-quality code. For example, if a teammate is working on handling user inputs or validation, I would suggest pairing up to ensure we cover edge cases together and make the validation process more robust.

Additionally, I would actively share knowledge on tools or techniques we’re using, like Zod for input validation, or MUI for UI design, to ensure the team can make the most of these technologies. Collaboration would also involve planning and splitting the work in a manageable way, ensuring that tasks are aligned with each person’s strengths while also promoting learning and growth.

## If I had more time

If I had more time, I would focus on exploring the following:

- **OAuth Authentication:** I'd like to implement OAuth authentication to enable secure access to the application using the Passport package for the Nest.js framework.

- **Advanced Validation Techniques:** While I've used Zod for input validation, I’d like to explore deeper validation techniques such as form-level validation, dynamic form fields, and conditional validations based on other form values.

- **Error Handling & Feedback Improvements:** I would work on improving error handling by providing more detailed error messages, and possibly implementing a global error boundary to handle unexpected errors gracefully.

- **Enhanced User Interface (UI):** Although the form layout is functional, I’d like to explore ways to make it more user-friendly, perhaps using MUI's Grid system or Material-UI's Dialog component to give a more responsive, modern feel.

- **API Integration Improvements:** I'd further explore how to optimize the API calls, such as implementing caching mechanisms or retry logic to ensure a smooth experience, especially in cases of network failures.

- **Unit and Integration Testing:** I would write unit and integration tests for the form, validation logic, and API interaction, ensuring robustness and reducing the risk of regression during future development.

These areas would enhance the application's performance, usability, and maintainability while also improving my understanding of full-stack development practices.
