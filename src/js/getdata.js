var select = document.getElementById("ddlViewBy");

export class http {
  constructor(url, obj = {}) {
    this.url = url;
    this.obj = obj;
    this.convert = function (data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    };
  }

  // post method
  post() {
    var option = {
      method: "POST",
      body: JSON.stringify(this.obj),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return new Promise((resolve, reject) => {
      fetch(this.url, option)
        .then((res) => {
          res.json().then((item) => {
            if (res.status == 200) {
              return callback(item);
            } else {
              reject("error");
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  // get method
  get(callback,page='' ,str='') {
    return new Promise((resolve, reject) => {
      fetch(this.url + this.convert(this.obj) + `?_page=${page}&_limit=${str}`)
        .then((res) => {
          res.json().then((data) => {
            if (res.status == 200) {
              return callback(data);
            } else {
              reject("ko thanh cong");
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  // delete method
  delete(id, callback) {
    var option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      fetch(`${this.url}${id}` + this.convert(this.obj), option)
        .then((res) => {
          // console.log(res);

          res.json().then((item) => {
            if (res.status == 200) {
              return callback(item);
            } else {
              reject("error");
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  // put method
  update(id, data, callback) {
    var option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    return new Promise((resolve, reject) => {
      fetch(this.url + id + this.convert(data), option)
        .then((res) => {
          return res.json().then((item) => {
            if (res.status == 200) {
             callback(item);
            } else {
              reject("error");
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
}
