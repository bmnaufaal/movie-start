FROM node:lts-hydrogen

ENV PORT=4002
ENV DATABASE_URL=postgresql://postgres:OwGQHvZPgXk0tslY@db.kxhlgwyezbfcbkftsvsf.supabase.co:5432/postgres
ENV NODE_ENV=production
ENV JWT_SECRET=secret

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY . .

CMD [ "npm", "start" ]