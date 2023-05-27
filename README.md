# React Dish Form

This project is a React application that allows users to fill out a form to create a dish. The form includes various fields such as name, preparation time, type, and specific details based on the selected type (e.g., pizza, soup, sandwich). The form incorporates validation using Yup and Formik libraries and communicates with an API using Axios for submitting the form data.

## Features

- Dynamic form fields based on the selected dish type (pizza, soup, sandwich).
- Input validation to ensure the correctness and completeness of the form data.
- Real-time error feedback for invalid fields.
- Submission of form data to an API endpoint.
- Display of success notification using react-toastify library.
- Error handling for API responses, displaying server-side validation errors.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v12 or above)
- npm (v6 or above)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-dish-form.git

2. Navigate to the project directory:

    ```bash
    cd react-dish-form

3. Install the dependencies:

    ```bash
    npm install

## Usage

1. Start the development server:

    ```bash
    npm start

2. Open your browser and visit http://localhost:3000 to access the form.

3. Fill in the form fields and submit the data. Success notification will be displayed upon successful submission.

4. If there are any validation errors or API errors, they will be shown in the form.

## Demo

Check out the live demo of the Dish Form:

[Live Demo](https://your-demo-url.com)

## License
This project is licensed under the MIT License.

## Acknowledgements
- React
- Formik
- Yup
- Axios
- Material-UI
- react-toastify