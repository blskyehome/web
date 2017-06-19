new Vue({
    el: '#app',
    data () {
        return {
            user_name: 'wht',
            password: 'wht1234'
        }
    },
    methods: {
        userLogin(){
            axios.post(api + '/token/user',
                {user_name: this.user_name, password: this.password}
            )
                .then(function (response) {
                    console.log(response.data.token);
                    saveToken(response.data.token)
                    if (getToken() != '') {
                        /*跳转*/
                      location.href='navigation.php'
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})
