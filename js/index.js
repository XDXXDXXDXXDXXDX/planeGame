function bindEvent() {
    //点击首页按钮，切换到对应页面
    document.getElementById("startGame").addEventListener("click",function() {
        document.getElementById("uiIndex").style.display= "none";
        GAME.start();
    }, false);

    document.getElementById("gameSetting").addEventListener("click",function() {
        document.getElementById("uiIndex").style.display= "none";
        document.getElementById("uiSetting").style.display= "block";
    }, false);

    document.getElementById("gameRule").addEventListener("click",function() {
        document.getElementById("uiIndex").style.display= "none";
        document.getElementById("uiRule").style.display= "block";
    }, false);

    //点击确认按钮回到首页
    document.getElementById("confirmSetting").addEventListener("click",function() {
        document.getElementById("uiIndex").style.display= "block";
        document.getElementById("uiSetting").style.display= "none";
        //设置背景
        var bgSelect = document.getElementById("backgroundSetting");
        var bgIndex = bgSelect.selectedIndex;
        var url = "./img/bg_" + bgSelect.options[bgIndex].value + ".jpg";
        document.body.style.backgroundImage = "url("+url+")";
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
        }
    }, false);
        
    document.getElementById("confirmRule").addEventListener("click",function() {
        document.getElementById("uiIndex").style.display= "block";
        document.getElementById("uiRule").style.display= "none";
    }, false);

    //结束页面
    document.getElementById("confirmResult").addEventListener("click",function() {
        document.getElementById("uiIndex").style.display= "block";
        document.getElementById("uiResult").style.display= "none";
    }, false);

    document.getElementById("again").addEventListener("click",function() {
        document.getElementById("uiResult").style.display= "none";
        GAME.start();
    }, false);
};

function init() {
    resourceHelper.load(CONFIG.resources, function(resources) {
        GAME.init();
        bindEvent();
    });
    
};

init();

