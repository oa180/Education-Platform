# Educational Platform Web Application - Backend

## Overview

Welcome to the backend repository of our Educational Platform Web Application! This project is designed to serve as the backbone of an advanced educational platform, catering to the diverse needs of students and administrators alike. Built using NodeJS, NestJS, PostgreSQL, Prisma, and TypeScript, it provides a robust and secure foundation for your e-learning ambitions.

## Features

Our web application offers an array of powerful features to make the educational experience seamless and efficient:

- **User Authentication**: Utilizing JWT Strategy and Auth Guards, we've implemented a robust user authentication and authorization system, ensuring the security and privacy of user accounts and data.

- **Email Confirmation**: Users can enjoy a smooth onboarding experience through email confirmation, bolstering the security of their accounts.

- **External Login**: We've integrated external login options, making it easier for users to access the platform using their preferred third-party accounts.

- **Admin and Student Management**: This platform caters to both administrators and students, allowing for comprehensive management of user roles and permissions.

- **CRUD Operations**: You can easily manage levels, courses, subjects, lessons, quizzes, questions, and answers with our intuitive CRUD functionality.

- **Upload Lectures and PDF Materials**: Instructors can seamlessly upload video lectures and PDF materials to enrich the learning experience.

- **Stripe Payment Gateway**: Enabling users to pay for courses using the Stripe payment gateway ensures secure and hassle-free transactions.

## Technologies Used

- **NodeJS**: The core technology that powers our application, providing a robust and efficient server environment.

- **NestJS**: This framework helps structure the codebase, making it maintainable and scalable, while adhering to best practices.

- **PostgreSQL Database**: We've chosen PostgreSQL as our database system for its reliability and data integrity.

- **Prisma**: As an Object-Relational Mapping (ORM) tool, Prisma streamlines database operations and ensures data consistency.

- **TypeScript**: By using TypeScript, we enhance the application's type safety and maintainability.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**: Begin by cloning this repository to your local machine.

2. **Install Dependencies**: Run `npm install` to install the required dependencies.

3. **Database Setup**: Configure your PostgreSQL database and update the connection settings in the project.

4. **Environment Variables**: Set up your environment variables for configurations like database connection, JWT secret, and Stripe API keys.

5. **Start the Application**: Launch the application using `npm run start`. You can also run it in development mode with `npm run start:dev`.

6. **API Documentation**: Detailed API documentation can be found in the `/docs` directory. Refer to this for a better understanding of the available endpoints


```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Omar Abd El-Rahman Ali]
- LinkedIn - [linkedin.com/in/omarabdel-rahman](https://www.linkedin.com/in/omarabdel-rahman/)
- Twitter - (https://www.twitter.com/OmarAbdo___)

## License

This project is licensed under the [MIT License](LICENSE.md).

Thank you for your interest in our Educational Platform Web Application backend. We look forward to collaborating and making education accessible and convenient for all.
