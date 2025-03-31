# DT207-moment1-backend

For this project, I wanted the backend to work completely on its own, without relying on any frontend, even though the assignment allowed using static files with a view engine: EJS or Pug. I saw it as a chance to push myself and try building something that felt closer to real-world, production-level software (not that I’m saying this is quite there yet, but I figured it was time to start shaping up). That’s why I went with an MVC-style backend using Node.js and Express.

I made a bunch of design choices that might seem a bit overkill for the size of the assignment, but I really wanted to experiment, learn new things, and bring in some of the stuff I’ve picked up over the years.

My solution, although very modular, is quite simple.

---

## 🧱 Project Structure

📦 project-root

├── server.ts         → Entry point: boots the server

├── app.ts            → App setup: middleware, routes, DB connection

├── config/           → env & DB configuration

├── models/           → Shared interfaces and type aliases (e.g. ICourses)

├── middlewares/      → express-validator chains for input validation

├── routes/           → Route definitions + service injection

├── controllers/      → Request handlers that delegate to the service layer

├── service/          → Business logic layer (uses dependency injection)

├── dataAccess/       → Raw DB communication via stored procedures

---

## 📦 Deployment

Deployed on **Azure App Service**  
👉 [https://dt207g-moment1-backend.azurewebsites.net](https://dt207g-moment1-backend.azurewebsites.net)

---

## 🛠 Tech Stack

- **Node.js** / **Express**
- **TypeScript**
- **SQL Server**
- **express-validator**
- **Azure App Service** (deployment target)
- **GitHub Actions** (CI/CD pipeline)

---

## 📡 API Endpoints

### `GET /courses`
Returns all courses from the database.

#### Response:
- Status code: `200 OK`
- Body:
```json
[
  {
    "id": 1,
    "courseCode": "DT162G",
    "courseName": "JavaScript Backend Development",
    "syllabus": "https://example.com/syllabus",
    "progression": "B"
  }
]
```
### `POST /courses/insert`

- Adds a new course.
- **Request Body** (must include a validated `courseCode`, `courseName`, `syllabus`, and `progression`)

Request body example:
```json
{
  "courseCode": "DT162G",
  "courseName": "JavaScript Backend Development",
  "syllabus": "https://example.com/syllabus",
  "progression": "B"
}
```
#### Response:
- Response: `201 Created`
- Body:
```json
{
  "message": "Course inserted successfully"
}
```
### `DELETE /courses/delete`

- Deletes a course by Id.
- **Request Body** (must include a validated numeric `id`)

Request body example:
```json
{
  "id": 1
}
```
#### Response:
- Response: `200 OK`
- Body:
```json
{
  "message": "Course deleted successfully"
}
```

---

## 🧪 Running Locally

### 1. Clone the repo
```bash
git clone https://github.com/RobinHawiz/DT207G-moment1-backend.git
```
### 2. Navigate to the cloned repo folder
```bash
cd DT207G-moment1-backend
```
### 3. Create .env file
Copy this structure into a .env file at the root:
```bash
DB_USER=your_sql_user
DB_PASSWORD=your_sql_password
DB_HOST=your_sql_host
DB_NAME=your_database_name
APP_PORT=4000
```
### 4. Install dependencies
```bash
npm install
```
### 5. Build the project
```bash
npm run build
```
### 6. Start the server
```bash
npm start
```
Now your server will be live at http://localhost:4000
