# based image yang akan digunakan
FROM node:lts-hydrogen

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /usr/local/orchestrator

# untuk set ENV dalam aplikasi kita
ENV PORT=4000

# copy deps yang ada di apps ke WORKDIR
COPY package.json package-lock.json /usr/local/orchestrator/

# Install npm & Mengapus cache
RUN npm install && npm cache clean --force

# 2 install setup for development
RUN npm install -g nodemon

# copy semua file & folder ke WORKDIR
COPY ./ ./

CMD [ "npm", "start" ]