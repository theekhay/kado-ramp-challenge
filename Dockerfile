FROM node:14.17.0

RUN npm install -g -f yarn

# Create App Directory
WORKDIR /home/kado-ramp-assessment

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 7000

CMD ["yarn", "start"]
