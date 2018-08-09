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
        var planeSelect = document.getElementById("backgroundSetting");
        var planeIndex = planeSelect.selectedIndex;

    }, false);

    document.getElementById("confirmRule").addEventListener("click",function() {
        document.getElementById("uiIndex").style.display= "block";
        document.getElementById("uiRule").style.display= "none";
    }, false);

    document.getElementById("confirmResult").addEventListener("click",function() {
        document.getElementById("uiIndex").style.display= "block";
        document.getElementById("uiResult").style.display= "none";
    }, false);
};

function init() {
    resourceHelper.load(CONFIG.resources, function(resources) {
        GAME.init();
        bindEvent();
    });
    
};

init();

