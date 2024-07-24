# Docker Notes

## Main points
- Image -> Container -> Volume 
- Maintains Isolation
- Docker Network -> Multiple containers
- Docker Compose -> Automates the process by using .yaml file

## DOCKER Workflow
1. Docker Client -> User interface (CLI, GUI)
2. Docker Host (Docker Daemon) -> Creates and manages containers -> Builds Images 
3. Docker Registry (Docker Hub) -> Similar to GitHub

## Docker Keywords
1. `FROM image[:tag] [AS name]` -> Specifies base Image
2. `WORKDIR /path/to/workdir` -> Sets the working directory
3. `COPY [--chown=<user>:<group>] <src>... <dest>` -> Copies files and directories from the build context to the image
4. `RUN <command>` -> Executes command in the shell during image build
5. `EXPOSE <port> [<port>/<protocol>]` -> Informs Docker that the container will listen on specified network ports at runtime
6. `ENV KEY=VALUE` -> Sets environment variables
7. `ARG <name>[=<default value>]` -> Defines build time variable
8. `VOLUME ["/data"]` -> Creates a mount point for externally mounted volumes
9. `CMD ["executable", "param1", "param2"]` -> Provides default commands to execute when the container starts
10. `ENTRYPOINT` != `CMD` -> Cannot be overridden

## Docker Commands

Here are some useful Docker commands for working with this project:


## Dockerfile Example
```dockerfile
FROM node:latest
WORKDIR /app
COPY package*.json .
COPY . /app
RUN npm run dev  
EXPOSE 3000
ENV NODE_ENV=production
ARG NODE_VERSION=20
VOLUME /myvol
CMD ["npm", "start"]
```

### Build the Docker image
```bash
docker build -t [image_name]
```  

### View Docker images
```bash
docker images
```  

### Run the Docker container with Port Mapping
```bash
docker run -p 5173:5173 [image_name]
```  

### Get all containers
```bash
docker ps
```  

### Stop a running container
```bash
docker stop [container_id/name]
```  

### Get rid of all running container
```bash
docker container prune
```  

### Remove a specific container
```bash
docker rm [container_id/name] --force 
```  

### Run with hot reloading
```bash
docker run -p 5173:5173 -v "$(pwd):/app" -v /app/node_modules [image_name]
```  

## Publish a Docker Image
```bash
docker login 
docker tag [image_name] docker_username/image_name
docker push docker_username/image_name
```

## Docker Compose

## compose.yaml file structure
```bash
services:
  web:
    build:
      context: .
    ports:
      - 5173:5173
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
    command: npm run dev
    develop:
      watch:
        - action: sync
          path: .
          target: /app
          ignore:
            - node_modules/
        - action: rebuild
          path: package.json
```

### Start the containers in watch mode:
```bash
docker compose up --watch
```  

