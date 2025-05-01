package main

import (
	"log"
	"net/http"
)

// CORS middleware to allow cross-origin requests
func withCORS(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Allow all origins
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// Allow specific headers
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		// Allow specific methods
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		// Handle preflight requests
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		handler.ServeHTTP(w, r)
	}
}

func main() {
	// Initialize the database
	initDB()

	// Set up HTTP routes with CORS middleware
	http.HandleFunc("/signup", withCORS(SignupHandler))               // Route for user signup
	http.HandleFunc("/login", withCORS(LoginHandler))                 // Route for user login
	http.HandleFunc("/users", withCORS(GetAllUsersHandler))           // Route to get all users
	http.HandleFunc("/products", withCORS(CreateProductHandler))      // Route to create products
	http.HandleFunc("/get-products", withCORS(GetAllProductsHandler)) // Route to get all products

	// Start the server on port 8080
	log.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
