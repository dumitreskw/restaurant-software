# Restaurant Food Order Software
Web application to streamline restaurant food ordering

# General Info
The main goal of this project was to create a web application that enhances the online food ordering experience for both customers and restaurants.  For customers, it offers a convenient way to browse menus, order food, and manage their experience. For restaurant owners, it provides tools to manage user accounts, orders and menus ultimately streamlining their operations.

# Technologies
- Frontend
  - ```Angular```
  - NPM
  - Typescript
  - Angular Material
- Backend
  - ```Node.js```
  - ```Express```
  - ```MongoDB Atlas(mongoose)```
  - JSON Web Tokens
  - BCrypt
  - Nodemailer
 
# Application Structure
```
backend
├── config
│   └── database.js
│   └── config.env
├── controllers
│   └── cart.js
│   └── invoice.js
│   └── product.js
│   └── user.js
├── middleware
│   └── auth.js
├── models
│   └── address.js
│   └── cart.js
│   └── category.js
│   └── invoice.js
│   └── product.js
│   └── users.js
├── routes
│   └── cart.js
│   └── invoice.js
│   └── user.js
└── server.js
```
- **config/ -** Mongoose config to connect with MongoDB.
- - **config.env -** Environment Variables
- **controllers/ -** Serves the responses along with business logic.
- **middleware/ -** Verifies JWT Token.
- **models/ -** Schema definitions for mongoose models.
- **routes/ -** Routes for API.
- **server.js -** Entry point of application.

# Set Up

## **Backend**
- Clone this repo 
- Install Dependencies
    ```
    cd backend
    npm install
    ```
- Open config.env file and insert mongodb uri and replace TOKEN_KEY with a random string.
    > TOKEN_KEY is used to create JWT Auth.
    ```
    MONGO_URI="mongodb+srv://username:password@databasename.bmpbw.mongodb.net/?retryWrites=true&w=majority"
    TOKEN_KEY="RANDOMSTRING"
    ```
- How to Run \
  ```npm run dev```

## **Frontend**
- Clone this repo 
- Install Dependencies
    ```
    cd frontend
    npm install
    ```
- Open env.ts and update API_URL if changed.
- How to Run \
  ```ng serve --open```

# Status and Bugs
* There is a possibility that nodemailer won't always send a mail after registration, so I created a bypass code for verifying OTP: 787878
* UI Design needs improvement.
