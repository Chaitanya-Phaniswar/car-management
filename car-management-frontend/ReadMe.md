🚗 Car Management Application - Frontend

Welcome to the frontend of the Car Management Application, a MERN stack project designed to help users manage their car inventory effortlessly. This React application offers features like adding, viewing, editing, and deleting cars, along with user authentication.
🌟 Features

    User Authentication: Login and signup functionality.
    Add New Cars: Easily add new cars to the inventory.
    View and Edit Car Details: Browse all cars and update their details.
    Responsive Design: Optimized for various devices using Material UI.
    User Context: Maintains user state throughout the application.

🛠️ Technology Stack

    Frontend: React, Material UI
    Routing: React Router
    State Management: React Context API
    API Requests: Axios
    Styling: Material UI

📂 Project Structure

frontend/
├── public/
│   ├── index.html          # Main HTML file
│   └── favicon.ico         # Favicon
├── src/
│   ├── assets/             # Static assets (images, icons)
│   ├── components/         # Reusable components (Navbar, Footer, etc.)
│   ├── context/            # UserContext for managing user state
│   ├── pages/              # Main pages (Home, LoginPage, SignupPage, etc.)
│   ├── services/           # API call functions using Axios
│   ├── App.js              # Main App component
│   └── index.js            # Entry point of the React app
├── .env                    # Environment variables
├── .gitignore              # Files and directories to ignore in Git
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation

🚀 Getting Started

Follow these instructions to set up and run the frontend locally.
Prerequisites

Make sure you have the following installed:

    Node.js (version 14 or higher)
    npm (comes with Node.js)
    Git

Installation

    Clone the repository:

git clone https://github.com/your-username/car-management.git
cd car-management/frontend

Install the dependencies:

npm install

Set up environment variables:

Create a .env file in the frontend folder with the following:

REACT_APP_API_URL=http://localhost:5000/api

    Replace http://localhost:5000 with your backend URL if needed.

Start the development server:

    npm start

    The application should now be running on http://localhost:3000.

📦 Build for Production

To build the frontend for production:

npm run build

The optimized build will be stored in the build/ directory.
🔧 Deployment

To deploy the frontend using Render:

    Set up a new Static Site on Render.
    Configure the following settings:
        Build Command: npm install && npm run build
        Publish Directory: build/
    Set the REACT_APP_API_URL environment variable to your deployed backend URL.

📄 Environment Variables

The frontend requires the following environment variables:

    REACT_APP_API_URL: URL of the backend API (e.g., https://your-backend-url/api).

⚙️ API Integration

The frontend communicates with the backend using Axios. Ensure your backend API is live and accessible at the REACT_APP_API_URL set in your .env file.
Example API Request

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchCars = async () => {
  try {
    const response = await axios.get(`${API_URL}/cars`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

🧪 Testing

To run tests (if any):

npm test

💬 Usage

    Login: Navigate to the /login page and enter your credentials to log in.
    Signup: Register as a new user via the /signup page.
    Browse Cars: Visit the homepage to view your car inventory.
    Add Car: Use the "Add New Car" button to add a new entry.
    Edit Car: Click on a car from the list to view and edit its details.

🤝 Contributing

Contributions are welcome! Please follow these steps:

    Fork the repository.
    Create a new branch (git checkout -b feature-name).
    Commit your changes (git commit -m 'Add new feature').
    Push the branch (git push origin feature-name).
    Create a Pull Request.

🐛 Issues

If you encounter any issues, please open a GitHub issue.
📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
📞 Contact

For any questions or feedback, feel free to contact me:

    GitHub: Chaitanya Phaniswar
    LinkedIn: Chaitanya Phaniswar
