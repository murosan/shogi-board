FROM node:10-slim

WORKDIR /src/shogi-board
COPY . .

ENV TZ=Asia/Tokyo

RUN yarn --pure-lockfile

CMD ["yarn", "start"]

EXPOSE 3000
