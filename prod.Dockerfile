# Step 1: Build frontend (React app)
FROM node:20 as frontend-build

WORKDIR /app/frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend ./ 
RUN npm run build

# Step 2: Build backend (Express app)
FROM node:20 as backend-build

WORKDIR /app/backend
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm ci
COPY ./backend ./

# Step 3: Final production image
FROM node:20 as production

WORKDIR /app

# Copy the frontend build output (dist) into the backend's build folder
COPY --from=frontend-build /app/frontend/dist /app/backend/build/dist

# Copy the backend build output (compiled code) into the final image
COPY --from=backend-build /app/backend/build /app/backend/build

# Explicitly copy the README.md to the backend directory
COPY ./backend/README.md ./backend/README.md

# Copy backend's package.json and package-lock.json into the production image
COPY ./backend/package.json ./backend/package-lock.json ./backend/

WORKDIR /app/backend

# Install only production dependencies for the backend
RUN npm ci --production

# Set the environment variable for debugging (optional)
ENV DEBUG=backend:*

# Expose the port the app will run on
EXPOSE 3001

# Set the user to 'node' for running the app
USER node

# Command to run the backend app
CMD ["npm", "start"]
