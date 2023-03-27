[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10553759&assignment_repo_type=AssignmentRepo)
# P3-Challenge-2

UI Library: React Paper

Struktur Folder:

- client-mobile
- server
  - orchestrator (port: 4000)
  - orchestrator-express (port: 4000)
  - services
    - users - mongodb (port: 4001)
    - app - postgres (port: 4002)

## W2D2

Target:

- [x] Memahami `react-native` dan `expo`
- [x] Install `expo-cli` & `expo init` & setup project mobile
- [x] Mencoba component Text, View, Image, StyleSheet, Button, ScrollView, FlatList
- [x] Mencoba useState, useEffect dalam react-native
- [x] Hit API server yang sudah dibuat untuk mendapatkan data
- [x] Mengetahui bahwa redux & redux-thunk bisa diimplementasi di react-native
- [x] Memahami `react-native-navigation`
- [x] Memahami Stack Navigation & Tab Navigation
- [x] Membuat min 2 Screen (Home, Detail)

**Report:**
> Hari ini saya mempelajari react-native dan sudah berhasil membuat react expo app dan me-run aplikasi menggunakan simulator xcode. Saya juga berhasil membuat bottom navigation, halaman list movie dan detail movie.


## W2D3

Target:

- [x] Memahami React Native Gesture Handler
- [x] Memahami NoSQL: Mongodb
- [x] Membuat service users dengan Mongodb (Kerjakan di `server/services/users`)
- [x] Membuat action pada users: Read, Create & Delete (Update optional)

**Report:**

> Hari ini saya belajar tentang react native gesture handler, nosql, dan mongodb, saya juga berhasil membuat CRD pada entitas users

## W2D4

Target:

- [x] Membuat Server Baru, Microservices
- [x] Memisahkan service user dan app
- [x] Membuat Orchestrator-express yang bisa komunikasi ke service user dan app
- [x] Memahami cache dalam database
- [x] Install dataabase Redis dan menggunakan ioRedis sebagai cache
- [x] Menjaga relasi User dengan product pada microservice

**Report:**

> Hari ini saya belajar tentang microservices, dan berhasil membuat orchestrator express yang memanggil 2 services, yaitu app dan users. Saya juga berhasil menerapkan redis pada orchestrator dan membuat relasi antara user dan movie pada kedua services

## W2D5

Target:

- [ ] Memahami GraphQL dan tahu perbedaan dengan RESTful API
- [ ] Membuat Orchestrator dengan menggunakan GraphQL
- [ ] Memahami Typedefs, Resolvers
- [ ] Mampu membuat Query dan Mutation
- [ ] Menggunakan redis pada graphql untuk kebutuhan cache server
- [ ] Memahami Apollo-Client & Implementasi pada mobile apps
- [ ] Memahami cache pada Apollo-Client

**Report:**

...

## W3D1

Target:

- [ ] Memahami Docker
- [ ] Implementasi Docker pada aplikasi server

**Report:**

...
