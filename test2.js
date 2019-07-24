const Axios = require("axios");

Axios({
  url: "https://www.ifis.airways.co.nz/secure/script/user_reg/login_proc.asp",
  method: "post",
  headers: {
    "Postman-Token": "1b98ad68-84cf-417a-8951-040d05f917a1",
    "cache-control": "no-cache",
    Referer:
      "https://www.ifis.airways.co.nz/secure/script/user_reg/login.asp?RedirectTo=%2FDefault.asp",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded",
    DNT: "1",
    "Upgrade-Insecure-Requests": "1",
    Origin: "https://www.ifis.airways.co.nz"
  },
  data: {
    RedirectTo: "%2FDefault.asp",
    RedirectMethod: "",
    UserName: "mattchapman",
    Password: "QAZplm!@#123",
    undefined: undefined
  }
}).then(response => {
  console.log("COOKIE", response.headers["set-cookie"]);
});
