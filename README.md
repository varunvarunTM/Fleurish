# Fleurish

A full-stack e-commerce platform for flower delivery services, featuring a Go REST API backend and a modern React TypeScript frontend with beautiful UI components for browsing, customizing, and ordering flower bouquets.

## Features

- 🌸 **Complete E-commerce Experience** - Browse bouquets, create custom arrangements, and place orders
- ✨ **User Authentication** - Secure signup/login with JWT tokens and bcrypt password hashing
- 🎯 **Product Management** - Advanced filtering, sorting, and search functionality
- ⚡ **Responsive Design** - Beautiful, mobile-first UI with Tailwind CSS and custom animations
- 🛡️ **Secure Backend** - REST API with CORS support, SQLite database, and secure authentication

## Project Structure
```
Fleurish/
├── backend/
│ ├── go.mod # Go module definition
│ ├── models/
│ │ ├── user.go # User model with password hashing
│ │ └── product.go # Product model with rich metadata
│ ├── main.go # Server setup and routing
│ ├── auth.go # JWT token generation and parsing
│ ├── database.go # Database initialization and queries
│ ├── handlers.go # HTTP request handlers
│ └── users.db # SQLite database file
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── layout/ # Header, Footer components
│ │ │ └── bouquets/ # BouquetCard, BouquetFilter components
│ │ ├── pages/ # React page components
│ │ ├── types/ # TypeScript interfaces
│ │ ├── App.tsx # Main React app with routing
│ │ └── App.css # Custom styles and animations
│ ├── package.json # Node.js dependencies
│ └── tailwind.config.js # Tailwind CSS configuration
```

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/Fleurish.git
cd Fleurish
```

2. **Backend Setup:**
```bash
cd backend
go mod tidy
go run .
```

3. **Frontend Setup:**
```bash
cd frontend
npm install
npm start
```

## Usage

### Starting the Application

**Backend Server:**
```bash
cd backend
go run .

Server runs on http://localhost:8080
```

**Frontend Development Server:**
```bash
cd frontend
npm start

React app runs on http://localhost:3000
```

### Application Features

**User Authentication:**
- User registration and login
- JWT-based session management
- Secure password hashing

**Product Browsing:**
- Filter by occasions, flowers, colors, and price
- Sort by alphabetical, newest, price (low to high, high to low)  
- Product grid with hover effects and animations

**Order Management:**
- Add items to cart and wishlist
- Custom bouquet creation
- Order tracking with status updates
- Order confirmation with detailed receipts

### API Endpoints

**Authentication:**
```bash
POST /signup # User registration
POST /login # User authentication
GET /users # Get all users
```

**Products:**
```bash
POST /products # Create new product
GET /get-products # Get all products
```

## How It Works

1. **Frontend-Backend Communication**: React app communicates with Go API using Axios for HTTP requests
2. **Authentication Flow**: JWT tokens stored and used for authenticated requests
3. **State Management**: React hooks for managing application state and user interactions
4. **Responsive Design**: Tailwind CSS with custom color palette and animations
5. **Order Processing**: Complete checkout flow with order confirmation and tracking

## Technical Details

- **Backend**: Go 1.21+ with SQLite3 database
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: JWT tokens with HS256 signing
- **Database**: SQLite with JSON storage for product tags
- **Routing**: React Router for client-side navigation

## Dependencies

**Backend:**
- `github.com/mattn/go-sqlite3` - SQLite database driver
- `github.com/dgrijalva/jwt-go` - JWT token handling
- `golang.org/x/crypto/bcrypt` - Password hashing

**Frontend:**
- `react` & `react-dom` - Core React libraries
- `react-router-dom` - Client-side routing
- `axios` - HTTP client for API requests
- `lucide-react` - Beautiful React icons
- `tailwindcss` - Utility-first CSS framework

## Design System

**Color Palette:**
--color-primary: #F8BBD0 /* Soft pink /
--color-secondary: #C5E1A5 / Light green /
--color-accent: #D1C4E9 / Lavender /
--color-text: #37474F / Dark gray */

text

**Typography:**
- Headlines: Playfair Display (serif)
- Body text: Poppins (sans-serif)

## Page Structure

- **Home**: Hero section with featured products
- **Shop**: Product catalog with filtering and sorting
- **Custom Bouquet**: Interactive bouquet customization
- **Checkout**: Secure payment and delivery information
- **Order Confirmation**: Order details and tracking information
- **Order Tracking**: Real-time order status updates
- **Auth Pages**: Login and signup forms

## Error Handling

The application handles various scenarios:
- Network connectivity issues
- Invalid user credentials
- Form validation errors
- API request failures
- Empty product states
- Invalid order tracking numbers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Uses SQLite for lightweight, embedded database storage
- JWT implementation for stateless authentication
- React Router for seamless navigation
- Tailwind CSS for rapid UI development
- Lucide React for consistent iconography
- Custom animations for enhanced user experience
