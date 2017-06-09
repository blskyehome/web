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
        <div class="tpl-login">
            <div class="tpl-login-content">
                <div class="tpl-login-title">注册用户</div>
                <span class="tpl-login-content-info">
                  创建一个新的用户
              </span>


                <form class="am-form tpl-form-line-form">
                    <div class="am-form-group zh-po-r">
                        <input type="text" class="tpl-form-input" id="user-name" placeholder="邮箱">
                        <button class="am-btn login-yan">获取验证码</button>
                    </div>

                    <div class="am-form-group">
                        <input type="text" class="tpl-form-input" id="user-name" placeholder="验证码">
                    </div>

                    <div class="am-form-group">
                        <input type="text" class="tpl-form-input" id="user-name" placeholder="用户名">
                    </div>

                    <div class="am-form-group">
                        <input type="password" class="tpl-form-input" id="user-name" placeholder="请输入密码">
                    </div>

                    <div class="am-form-group">
                        <input type="password" class="tpl-form-input" id="user-name" placeholder="再次输入密码">
                    </div>

                    <div class="am-form-group tpl-login-remember-me am-pagination-right">
                        已有账号 <a href="login.html">返回登录</a> 
                    </div>






                    <div class="am-form-group">

                        <button type="button" class="am-btn am-btn-primary  am-btn-block tpl-btn-bg-color-success  tpl-login-btn">提交</button>

                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="assets/js/amazeui.min.js"></script>
    <script src="assets/js/app.js"></script>

</body>

</html>