/**
 * Created by wang on 2017/6/8.
 */
const api = 'http://api.blskye.dev/v1';
function saveToken(token) {
    return localStorage.token = token;
}
function getToken() {
    console.log(localStorage.token)
    return localStorage.token;
}
function getCaptcha(email) {
    axios.post(api + '/user/captcha',
        {email: email}
    )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error.response);
        });
}

function isLogin() {
    if (localStorage.token==null){
        return false;
    }else {
        return true;
    }
}

function getCategoryItems(_this) {
    axios({
        method: 'get',
        url: api + '/user/category',
        params: {
            token: getToken(),
        }
    })

        .then(function (response) {
            _this.loading = false
            console.log(response.data);
            _this.categoryItems = response.data.data
            console.log(_this.categoryItems)
        })
        .catch(function (error) {
            _this.loading = false
            _this.error = error.response.data.msg
            console.log(error.response.data.msg);
        });
}