# Development in container

## Building and running the image with Docker Compose

Run the following command in ./frontend:

```bash
$ docker compose -f docker-compose.dev.yml up
```

## Building and running the image without orchestration

Here are steps with explanations to achieving a similar result to the above command that uses Docker Compose:

### Build the image

```bash
$ docker build -f ./dev.Dockerfile -t note-frontend-dev .
```

### Run the container

Map the current directory to the inside of the container. This gives access to the source-files outside of the container and makes development possible:

```bash
$ echo $(pwd)
$ docker run -p 5173:5173 -v "$(pwd):/usr/src/app/" note-frontend-dev
```

If this results in error such as the one below:

```bash
Error: Cannot find module @rollup/rollup-linux-arm64-gnu
```

Start the container with bash as the command and install dependencies and try again

```bash
$ docker run -it -v "$(pwd):/usr/src/app/" note-frontend-dev bash
root@b83e9040b91d:/usr/src/app# npm install
root@b83e9040b91d:/usr/src/app# exit
$ docker run -p 5173:5173 -v "$(pwd):/usr/src/app/" note-frontend-dev
```
