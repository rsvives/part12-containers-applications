# Todo App


## Running the app

### 1. Start MongoDB and Redis 
Both defined on `./todo-backend/docker-compose.dev.yaml`

On directory `./todo-backend/`:
```
docker compose -f docker-compose.dev.yaml up
```

### 2. Start backend server
Passing MongoDB and Redis urls as env variables is needed.

On directory `./todo-backend/`:
```
REDIS_URL=redis://localhost:6379 MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database npm run dev                               
```

### 3. Start frontend
Build and run docker file located on `./todo-frontend/Dockerfile`

On directory `./todo-frontend/`:

Building the image and renaming it to "nginx":
```
docker build . -t nginx
```
Running the image in a container named "frontend" on port 80:
```
docker run --name frontend -p 80:80 nginx
```