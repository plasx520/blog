<?php 
$url=$_GET['url'];
?>
<?php
$orginal_url = "$url";
$safe_key = "108531725d";
$current_time = time(); //当前时间
$allow_seconds = 120; //允许链接生成后120秒内可进行下载
$expire_time = $current_time + $allow_seconds; //失效时间，这个时间以后，链接失效
$security_key = md5($safe_key . $expire_time);  //对失效时间和您的密钥进行合并加密。
$urlxz = $orginal_url . "?ct_t={$expire_time}&ct_k={$security_key}"; //最终的链接地址
/* ---PHP示例代码----*/
?>
<html>
<head>
<meta http-equiv="Content-Type"content="text/html; charset=UTF-8">
<style type="text/css">body{margin:0;padding:0px;font-family:"Microsoft YaHei",YaHei,"微软雅黑",SimHei,"黑体";font-size:14px}</style>
<title>第十二网</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
   <main>
        <form class="form">
            <div class="form__cover"></div>
            <div class="form__loader">
                <div class="spinner active">
                    <svg class="spinner__circular" viewBox="25 25 50 50">
                        <circle class="spinner__path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle>
                    </svg>
                </div>
            </div>
            <div class="form__content">
                <h1>VIP用户下载通道</h1>
				<a href="<?=$urlxz?>">
                <button type="button" class="styled-button">
                    <span class="styled-button__real-text-holder">
                        <span class="styled-button__real-text">高速下载</span>
                        <span class="styled-button__moving-block face">
                            <span class="styled-button__text-holder">
                                <span class="styled-button__text">高速下载</span>
                            </span>
                        </span>
						<span class="styled-button__moving-block back">
                            <span class="styled-button__text-holder">
                                <span class="styled-button__text">高速下载</span>
							</span>
                        </span>
                    </span>
                </button></a>
            </div>

        </form>
    </main>
  
    <script  src="js/index.js"></script>
</body>
</html>

