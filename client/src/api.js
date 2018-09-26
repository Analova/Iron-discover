import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,

  getActivities() {
    return service
      .get("/activities")
      .then(res => res.data)
      .catch(errHandler)

  },

  postActivity(data) {
    return service
      .post("/activities", data)
      .then(res => res.data)
      .catch(errHandler)

  },

  profileActivity(id) {
    console.log("called from console")
    return service
      .get(`/activities/${id}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  postComment(id, description) {
    return service
      .post(`/activities/${id}/comments`, { description: description })
      .then(res => res.data)
      .catch(errHandler)
  },

  editActivity(id, data) {
    return service
      .patch(`/activities/${id}`, data)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteActivity(id) {
    return service
      .delete("/activities/" + id)
      .then(res => res.data)
      .catch(errHandler);
  },
  deleteComment(id) {
    return service
      .delete("/comments/" + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  // Sing up Log in
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password,
      })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  // loadUser() {
  //   const userData = localStorage.getItem('user');
  //   if (!userData) return false;
  //   const user = JSON.parse(userData);
  //   if (user.token) {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
  //     return user;
  //   }
  //   return false;
  // },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },


  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file)
    return service
      .post('/users/first-user/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  },
};
