## NOTIST API

Notist is a minimal note api with jwt authentication

---

####Routes

- **Auth**

    - register: '/api/auth/sign-up'         | POST
    - login: '/api/auth/sign-in'       | POST

- **User**

    - getProfile: '/api/user/profile'     | GET
    - updateProfile: '/api/user/profile'     | POST

- **Note**
    Protected by a middlware to ensure integrity in the api...
    - create: '/api/note' | POST
    - fetchAllNotes: '/api/note' | GET
    - fetchNote: '/api/note/id' | GET
    - updateNote: '/api/note/id' | PUT
    - deleteNote: '/api/note/id' | DELETE

##### Built With:
- **NODEJS(_Typescript_)**
- **EXPRESS**
- **SQLITE**