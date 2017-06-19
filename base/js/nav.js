/**
 * Created by wang on 2017/6/19.
 */
new Vue({
    el: '#app',
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
            axios({
                method: 'get',
                url: api + '/user/link/by_category',
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
})
