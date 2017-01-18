FROM node:6

# Create a directory for the app
RUN mkdir -p /usr/src/app

# Change to that directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

RUN npm install

#Copy the rest of the code
COPY . /usr/src/app

# Expose the port
EXPOSE 3000

# start the server
CMD ["npm", "start"]
