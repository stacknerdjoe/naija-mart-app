# NaijaMart App - Full Stack MERN Application

This is a **Movie Review App** I built using the **MERN stack** (MongoDB, Express, React, Node.js). The app will allow users to browse and rate movies, and provides an **admin panel** for managing movies, actors, and reviews. This project demonstrates my skills in Full Stack development and includes both the **frontend** and **backend** components integrated into a single application.

## Project Status

This project is a **work in progress**. While the core functionality has been implemented, several advanced features are still under development. Here’s an overview of the current status:

- **Movie Rating**: The feature allowing users to rate movies on a scale from 1 to 10 is planned but not yet implemented.
- **Live Search**: The live search functionality for quickly finding movies is currently in development and is not yet functional.
- **Custom Auto-scroll Slider**: A dynamic slider to display featured movies is planned and will be added soon.

I am actively working on these features and will update the project as they are completed.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [How to Contribute](#how-to-contribute)


## Project Overview

The **Movie Review App** allows users to rate movies from 1 to 10 and leave reviews. The admin panel lets authorized users upload and manage movies and actors. The app includes advanced features such as **live search**, **custom sliders**, and **complex forms** to enhance the user experience.

### Key Features:
- **Admin Panel**: Manage movies, actors, and reviews.
- **Role-Based Authentication**: Admins and regular users have different access levels.
- **Movie Ratings**: Users can rate movies from 1 to 10.
- **Cloud Integration**: Store movie images and videos using Cloudinary.
- **Email Verification**: Used for user authentication.
- **Protected Routes**: Ensure only authorized users can access certain pages.
- **Password Reset**: A route to allow users to reset their password.
- **Responsive UI**: Built with **React** and **Tailwind CSS**, providing an intuitive and mobile-friendly interface.

## Features

- **Admin Panel** to manage movies, actors, and reviews.
- **User Authentication**: Role-based access control (Admin vs. Normal User).
- **Movie Rating**: Users can rate movies on a scale from 1 to 10.
- **Live Search**: Quickly search for movies.
- **Custom Auto-scroll Slider**: Display featured movies dynamically.
- **Cloudinary Integration**: For storing and serving images and videos.
- **MongoDB Aggregation**: Used for advanced data retrieval.

## Technologies Used

- **Frontend**: React (Functional Components), Tailwind CSS, Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Role-based Access Control
- **Cloud Storage**: Cloudinary
- **Email Services**: Sendinblue (for email verification and password resets)
- **Testing**: Mailtrap (for email testing)

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/stacknerdjoe/naija-mart-app.git
    cd naija-mart-app
    ```

2. **Backend Setup**:
    - Navigate to the `backend` folder.
    - Install dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file and add your environment variables (MongoDB URI, Cloudinary credentials, etc.).
    - Start the backend server:
      ```bash
      npm start
      ```

3. **Frontend Setup**:
    - Navigate to the `frontend` folder.
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the React development server:
      ```bash
      npm start
      ```

4. Visit `http://localhost:3000` to view the app in your browser.

## How to Contribute

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.


Feel free to explore the code, contribute, or use this project as a reference for your own Full Stack development projects!

---

**License**: MIT License
