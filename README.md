# Webingo Backend

## Project Overview
Complete backend API for the task management application "Webingo".

---

## Setup Instructions

1. Clone the repository:
```bash
git clone <repo-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` based on `.env.example`:
```bash
cp .env.example .env
```

4. Start server:
```bash
npm run dev  # if using nodemon
# OR
node server.js
```

5. Server will run on `http://localhost:8000` (or PORT in `.env`).

---

## Environment Variables (.env)
```env
# MongoDB connection
MONGODB_URI=mongodb://127.0.0.1:27017/webingo_test

# Client URL for CORS
CLIENT_URI=http://localhost:3000

# JWT Secrets
REFRESH_TOKEN_SECRET=refreshTokenSecret
ACCESS_TOKEN_SECRET=accessTokenSecret

# Password hashing salt rounds
PASSWORD_SALT_ROUND=10

# Server Port
PORT=8000
```

---

## API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/v1/auth/signup` | Create new user | `{ name, email, password }` | `{ success, message }` |
| POST | `/api/v1/auth/login` | Login user | `{ email, password }` | `{ success, data: { user, accessToken } }` |
| POST | `/api/v1/auth/logout` | Logout user | None | `{ success, message }` |
| GET | `/api/v1/authenticate` | Authenticate user | Header: Bearer Token | `{ success, data: user }` |
| GET | `/api/v1/refresh-access-token` | Refresh access token | Cookie: webingo | `{ accessToken }` |
| GET | `/api/v1/task` | Get all tasks | Query: `status`, `priority`, `search` | `{ success, count, tasks }` |
| POST | `/api/v1/task` | Create a task | `{ title, description, status?, priority?, dueDate? }` | `{ success, task }` |
| GET | `/api/v1/task/:id` | Get tasks by user ID | Header: Bearer Token | `{ success, count, tasks }` |
| PATCH | `/api/v1/task/:id` | Update task | `{ title?, description?, status?, priority?, dueDate? }` | `{ success, data }` |
| DELETE | `/api/v1/task/:id` | Delete task | Header: Bearer Token | `{ success, message }` |

---

## Database Schema

**User**

| Field | Type | Required | Notes |
|-------|------|---------|-------|
| name | String | ✅ | Max 100 chars |
| email | String | ✅ | Unique, valid email |
| password | String | ✅ | Minimum 6 chars, hashed |

**Task**

| Field | Type | Required | Notes |
|-------|------|---------|-------|
| userId | ObjectId | ✅ | Ref to User |
| title | String | ✅ | Max 200 chars |
| description | String | ✅ | Max 1000 chars |
| status | String | Default: "Todo" | Enum: ["Todo", "In Progress", "Completed"] |
| priority | String | Default: "Medium" | Enum: ["Low", "Medium", "High"] |
| dueDate | Date | ❌ | Optional |
| createdAt, updatedAt | Date | ✅ | Auto-managed |

---

## Notes

- JWT authentication implemented using access and refresh tokens.
- CORS configured to allow only `CLIENT_URI`.
- Error handling is centralized in `errorHandlerMiddleware.js`.
- Task queries are indexed on `{ status, priority, dueDate }` for performance.

