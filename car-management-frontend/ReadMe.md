# Car Management Application - Frontend

A React-based frontend application for managing car listings with features like authentication, CRUD operations for car listings, image management, and search functionality.

## 🚀 Features

- **User Authentication**
  - Sign up for new users
  - Login for existing users
  - Protected routes for authenticated users

- **Car Management**
  - Create new car listings with up to 10 images
  - View all cars created by the user
  - Update car details (title, description, tags, images)
  - Delete car listings
  - Detailed view for each car

- **Search Functionality**
  - Global search across user's cars
  - Search through titles, descriptions, and tags
  - Real-time search results

- **Tag Management**
  - Add multiple tags to cars (car_type, company, dealer, etc.)
  - Filter cars based on tags

## 🛠️ Tech Stack

- **React.js** - Frontend framework
- **React Router** - Navigation and routing
- **Axios** - API requests
- **Material UI** - Styling

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or above)
- npm or yarn package manager
- Backend API running (refer to backend README)

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/car-management-app.git
cd car-management-app/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the frontend root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
# or
yarn start
```
## 📱 Pages

1. **Authentication Pages**
   - `/login` - User login
   - `/signup` - User registration

2. **Car Management Pages**
   - `/` - Dashboard/Home page with car listings
   - `/add-car` - Create new car listing
   - `/cars/:id` - View car details
   - `/edit-car/:id` - Edit car details

## 🔒 Environment Variables

Create a `.env` file with the following variables:

```env
REACT_APP_API_URL=your_backend_api_url
```

## 🚀 Deployment

To deploy the frontend:

1. Build the project:
```bash
npm run build
# or
yarn build
```

2. Deploy to your preferred hosting service (e.g., Vercel, Netlify)

## 📝 Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.