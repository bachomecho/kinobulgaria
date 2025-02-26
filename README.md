# KinoBulgaria

## Description

KinoBulgaria is a simple website housing a variety of portals hosting old Bulgarian classics for your enjoyment. It is built using Typescript, React and Tailwind.
SQLite is used for data storage and Vite is the build system. Official site:`kinobulgaria.com`

## Features

- Creating a watchlist for future viewing (you can access your watchlist in user settings after logging in)
- Modal for every movie that display a short description of the movie's plot (note: desktop only right now)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bachomecho/kinobulgaria.git
   ```
2. Install node modules(node required - v16.17.0 or up)
    ```bash
   npm i
    ```
3. Make sure to create following `.env` file in the root directory
    ```bash
   API_PORT="8080"
   VITE_DB_NAME="movies.db"
   VITE_USERS_DB_NAME="users.db"
   VITE_ENVIRONMENT="DEV"
   ```
   Also, please note that the movies and users databases are just samples and used for showcasing the certain functionality. I am using different databases on the official website.

4. Build the project
    ```bash
   npm run build
    ```
5. Run project in development mode
    ```bash
   npm run dev
    ```

## TODO
1. Add more movies to the library
2. Refine plot descriptions as they are automatically being pulled from imdb and translated into Bulgarian using the deepl api
## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements.
## Contact

For any inquiries, please contact mechkarov.work@gmail.com

