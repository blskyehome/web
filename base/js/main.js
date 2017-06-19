/**
 * Created by wang on 2017/6/7.
 */
const Login = {
    template: '#login',
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
                        router.push('/user');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};
const Register = {
    template: '#register',
    data () {
        return {
            email: '',
            captcha: '',
            user_name: '',
            password: ''
        }
    },
    methods: {
        getCaptcha(){
            getCaptcha(this.email)
        },
        userRegister(){
            axios.post(api + '/user',
                {
                    email: this.email,
                    user_name: this.user_name,
                    password: this.password,
                    captcha: this.captcha,
                }
            )
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error.response.data.msg);
                });
        }
    }
}
const UserCenter = {
    template: '#user-center',
    created: function () {
        isLogin()
    }
}
const UserCenterLink = {
    template: '#link',
    data () {
        return {
            loading: false,
            error: null,
            deleteLink: null,//要删除的link
            alertFlag: false,//弹窗是否显示
            linkItems: {},
            forModify: 1,//要修改的link
            modifyFlag:null,
            categoryItems:null
        }
    },
    created: function () {
        this.getLinkItem()
    },
    methods: {
        getCategoryItem(){
            let _this = this
            getCategoryItems(_this)
        },
        getLinkItem(){
            let _this = this
            this.error = this.linkItems = null
            this.loading = true
            let token = getToken()
            /* axios.get(api + '/user/link',
             {
             params: {
             token: getToken(),
             }
             }
             )
             .then(function (response) {
             _this.loading = false
             console.log(response.data);
             _this.linkItems = response.data.data
             })
             .catch(function (error) {
             _this.loading = false
             _this.error = error.response.data.msg
             console.log(error.response.data.msg);
             });
             */
            axios({
                method: 'get',
                url: api + '/user/link',
                params: {
                    token: token,
                }
            })

                .then(function (response) {
                    _this.loading = false
                    console.log(response.data);
                    _this.linkItems = response.data.data
                    console.log(_this.linkItems)
                })
                .catch(function (error) {
                    _this.loading = false
                    _this.error = error.response.data.msg
                    console.log(error.response.data.msg);
                });
        },
        deleteConfirm: function (link) {
            this.alertFlag = true;
            console.log(link)
            this.deleteLink = link
        },
        deleteLinkFun: function () {
            let _this = this
            this.error = null
            this.loading = true
            let token = getToken()
            let link_id = this.deleteLink.id
            axios({
                method: 'delete',
                url: api + '/link/' + link_id,
                params: {
                    token: token,
                }
            })
                .then(function (response) {
                    _this.loading = false
                    let index = _this.linkItems.indexOf(_this.deleteLink)
                    _this.linkItems.splice(index, 1)
                    _this.alertFlag = false
                    console.log(response.data);
                })
                .catch(function (error) {
                    _this.loading = false
                    _this.error = error
                    console.log(error);
                });
        },
        clickLink:function (link) {
            axios({
                method: 'put',
                url: api + '/link/'+link.id+'/clicks',
            })

                .then(function (response) {
                    link.clicks++
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error.response.data.msg);
                });

        },
        modifyForm:function (item) {
            this.forModify = item
            this.modifyFlag=true
        //    获取分类
            this.getCategoryItem()
        },
        modify:function () {
            let _this = this
            axios({
                method: 'put',
                url: api + '/link/' + _this.forModify.id,
                data: {
                    token: getToken(),
                    openness: 1,
                    category_id: _this.forModify.category_id,
                    title:  _this.forModify.title,
                    url:  _this.forModify.url,
                    comment:  _this.forModify.comment
                }
            })

                .then(function (response) {
                    _this.loading = false
                    console.log(response.data);
                })
                .catch(function (error) {
                    _this.loading = false
                    _this.error = error.response.data.msg
                    console.log(error.response.data.msg);
                });
        },
        //修改用户链接的分类
        setCategory:function (id) {
            this.forModify.category_id=id;
            console.log(this.forModify.category_id)
        }
    }
}
const UserCenterProfile = {
    template: '#profile',
    data () {
        return {
            user_name: '',
            loading: false,
            error: null,

        }
    },
    methods: {
        updateProfile(){
            let _this = this
            this.error = null
            this.loading = true
            let token = getToken()
            /*       axios.put(api + '/user/profile',
             {
             params: {
             token: getToken(),
             user_name:_this.user_name

             }
             }
             )
             .then(function (response) {
             _this.loading = false
             console.log(response.data);
             _this.linkItems = response.data.data
             })
             .catch(function (error) {
             _this.loading = false
             _this.error = error.response.data.msg
             console.log(error.response.data.msg);
             });*/
            axios({
                method: 'put',
                url: api + '/user/profile',
                data: {
                    token: token,
                    user_name: _this.user_name
                }
            })

                .then(function (response) {
                    _this.loading = false
                    console.log(response.data);
                })
                .catch(function (error) {
                    _this.loading = false
                    _this.error = error.response.data.msg
                    console.log(error.response.data.msg);
                });
        }
    }
}
const UserCenterAvatar = {
    template: '#avatar',

}
const UserCenterCategory = {
    template: '#category',
    data () {
        return {
            loading: false,
            error: null,
            deleteCategory: null,//要删除的link
            alertFlag: false,//弹窗是否显示
            categoryItems: {},
            categoryForUpdate: 1,//要修改的分类
            categoryName:null,
            updateFlag:null
        }
    },
    created: function () {
        this.getItem()
    },
    methods: {
        getItem(){
            let _this = this
            this.error = this.linkItems = null
            this.loading = true
            let token = getToken()
            getCategoryItems(_this)
        },
        deleteConfirm: function (item) {
            this.alertFlag = true;
            console.log(item)
            this.deleteCategory = item
        },
        deleteLinkFun: function () {
            let _this = this
            this.error = null
            this.loading = true
            let token = getToken()
            let category_id = this.deleteCategory.id
            axios({
                method: 'delete',
                url: api + '/category/' + category_id,
                params: {
                    token: token,
                }
            })
                .then(function (response) {
                    _this.loading = false
                    let index = _this.categoryItems.indexOf(_this.deleteCategory)
                    _this.categoryItems.splice(index, 1)
                    _this.alertFlag = false
                    console.log(response.data);
                })
                .catch(function (error) {
                    _this.loading = false
                    _this.error = error
                    console.log(error);
                });
        },
        update: function (item) {
            this.categoryForUpdate = item
            this.updateFlag=true
            /* let _this = this
             axios({
             method: 'put',
             url: api + '/category/'+category_id,
             data: {
             token: getToken(),
             name: _this.categoryName
             }
             })

             .then(function (response) {
             _this.loading = false
             console.log(response.data);
             })
             .catch(function (error) {
             _this.loading = false
             _this.error = error.response.data.msg
             console.log(error.response.data.msg);
             });*/
        },
        modifyCategory: function () {
            let _this = this
            axios({
                method: 'put',
                url: api + '/category/' + _this.categoryForUpdate.id,
                data: {
                    token: getToken(),
                    name: _this.categoryName
                }
            })

                .then(function (response) {
                    _this.loading = false
                    console.log(response.data);
                })
                .catch(function (error) {
                    _this.loading = false
                    _this.error = error.response.data.msg
                    console.log(error.response.data.msg);
                });
        }
    }
}
const PublicLink = {}
const NewLink = {
    template: '#new-link',
    data(){
        return {
            loading: false,
            error: null,
            categoryItems: {
                name: 1
            },
            url: '',
            title: '',
            openness: 1,
            category_id: null,
            comment: 'default'
        }
    },
    created: function () {
        isLogin();
        this.getCategoryItems();
    },
    methods: {
        getCategoryItems: function () {
            let _this = this
            this.error = null
            this.loading = true
            getCategoryItems(_this)
        },
        createLink: function () {
            this.loading = true

            let _this = this

            axios.post(api + '/link',
                {
                    token: getToken(),
                    url: this.url,
                    title: this.title,
                    openness: this.openness,
                    category_id: this.category_id,
                    comment: this.comment
                }
            )
                .then(function (response) {
                    _this.loading = false
                    _this.error = response.data.msg
                    console.log(response.data);
                })
                .catch(function (error) {
                    _this.loading = false

                    _this.error = response.data.msg
                    console.log(error.response.data.msg);
                });
        }
    }
}

const NewCategory = {
    template: '#new-category',
    data(){
        return {
            loading: false,
            error: null,
            name: null
        }
    },
    created: function () {
        isLogin();
    },
    methods: {
        createCategory: function () {
            this.loading = true
            let _this = this
            axios.post(api + '/category',
                {
                    token: getToken(),
                    name: _this.name
                }
            )
                .then(function (response) {
                    _this.loading = false
                    _this.error = response.data.msg
                    console.log(response.data);
                })
                .catch(function (error) {
                    _this.loading = false

                    _this.error = response.data.msg
                    console.log(error.response.data.msg);
                });
        }
    }
}
const routes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/link', component: PublicLink},
    {path: '/newlink', component: NewLink},

    {
        path: '/user', component: UserCenter,
        children: [
            {
                path: 'category',
                component: UserCenterCategory
            },
            {
                path: 'new-category',
                component: NewCategory
            },
            {
                path: 'link',
                component: UserCenterLink
            },
            {
                path: 'profile',
                component: UserCenterProfile
            },
            {
                path: 'avatar',
                component: UserCenterAvatar
            },
        ]
    }
]
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})
const app = new Vue({
    router
}).$mount('#app')
