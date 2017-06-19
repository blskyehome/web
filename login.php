<?php require_once ("public/header.php"); ?>
    <link rel="stylesheet" href="assets/css/login.css">
</head>

<body data-type="login">
    <script src="assets/js/theme.js"></script>
    <div class="am-g tpl-g">
        <!-- 风格切换 -->
        <div class="tpl-skiner">
            <div class="tpl-skiner-toggle am-icon-cog">
            </div>
            <div class="tpl-skiner-content">
                <div class="tpl-skiner-content-title">
                    选择主题
                </div>
                <div class="tpl-skiner-content-bar">
                    <span class="skiner-color skiner-white" data-color="theme-white"></span>
                    <span class="skiner-color skiner-black" data-color="theme-black"></span>
                </div>
            </div>
        </div>
        <div class="tpl-login" id="app">
            <div class="tpl-login-content">
                <div class="tpl-login-logo">

                </div>
                <form class="am-form tpl-form-line-form">
                    <div class="am-form-group">
                        <input type="text" class="tpl-form-input" v-model="user_name" placeholder="请输入账号">

                    </div>

                    <div class="am-form-group">
                        <input type="password" class="tpl-form-input" v-model="password" placeholder="请输入密码">

                    </div>
                    <div class="am-form-group tpl-login-remember-me">
                        <input id="remember-me" type="checkbox">
                        <label for="remember-me">

                            记住密码
                        </label>
                        <span class="am-fr">没有账号？<a href="sign-up.html">立即注册</a></span>

                    </div>

                    <div class="am-form-group">

                        <button type="button" v-on:click="userLogin"
                                class="am-btn am-btn-primary  am-btn-block tpl-btn-bg-color-success  tpl-login-btn">
                            登录
                        </button>

                    </div>
                </form>
            </div>
        </div>
    </div>


    <script src="base/vue/vue.js"></script>
    <script src="base/vue/vue-router.js"></script>
    <script src="base/vue/axios.min.js"></script>
    <script src="base/js/common.js"></script>

    <script src="base/js/login.js"></script>


    <script src="assets/js/amazeui.min.js"></script>
    <script src="assets/js/app.js"></script>

</body>

</html>