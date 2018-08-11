//按键绑定事件
function bindEvent() {
    //点击开始游戏按钮，开始游戏并隐藏首页
    document.getElementById("startGame").addEventListener("click",function() {
        document.getElementById("uiIndex").style.display = "none";
        GAME.start();
    }, false);
    //点击游戏设置按钮，切换到设置页面并隐藏首页
    document.getElementById("gameSetting").addEventListener("click",function() {
        document.getElementById("uiIndex").style.display = "none";//隐藏首页ui
        document.getElementById("uiSetting").style.display = "block";//显示设置ui
    }, false);
    //点击游戏说明按钮，切换到说明页面并隐藏首页
    document.getElementById("gameRule").addEventListener("click",function() {
        document.getElementById("uiIndex").style.display = "none";//隐藏首页ui
        document.getElementById("uiRule").style.display = "block";//显示规则ui
    }, false);

    //点击确认按钮回到首页并隐藏确认页
    var confirmBtn = document.getElementsByClassName("confirmBtn");
    for (var i = 0; i < confirmBtn.length; i++) {
        confirmBtn[i].addEventListener("click",function() {
            document.getElementById("uiIndex").style.display = "block";
            document.getElementById("uiSetting").style.display = "none";
            document.getElementById("uiRule").style.display = "none";
            document.getElementById("uiResult").style.display= "none";
            document.getElementById("win").style.display= "none";
            document.getElementById("lose").style.display= "none";
        },false);
    }

    //点击确认设置进行相关设置
    document.getElementById("confirmSetting").addEventListener("click",function() {
        //设置背景，先抓取选项框中选中的项的索引值，再通过索引值得到选中项的value
        var bgSelect = document.getElementById("backgroundSetting");
        var bgIndex = bgSelect.selectedIndex;
        var url = "./img/bg_" + bgSelect.options[bgIndex].value + ".jpg";
        document.getElementById("game").style.backgroundImage = "url("+url+")";
        //设置飞机
        var planeSelect = document.getElementById("planeSetting");
        var planeIndex = planeSelect.selectedIndex;
        var planeIcon = planeSelect.options[planeIndex].value;
        GAME.planeIcon = resourceHelper.getImage(planeIcon);
        //是否开启音乐
        var musicSelect = document.getElementById("musicSetting");
        var musicIndex = musicSelect.selectedIndex;
        var playMusic = musicSelect.options[musicIndex].value;
        if (playMusic=="close") {
            resourceHelper.enableMusic = false;
        }else {
            resourceHelper.enableMusic = true;
        }
    }, false);

    //点击再来一次按钮重新开始游戏
    document.getElementById("again").addEventListener("click",function() {
        document.getElementById("uiResult").style.display= "none";
        document.getElementById("win").style.display= "none";
        document.getElementById("lose").style.display= "none";
        GAME.start();
    }, false);
};

//游戏初始化
function init() {
    //加载完资源才可以进行其余操作
    resourceHelper.load(CONFIG.resources, function(resources) {
        GAME.init();
        bindEvent();
    });
    
};

init();

