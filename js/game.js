// 获取画布
var canvas = document.getElementById('game');
var context = canvas.getContext("2d");
// 设置画布的宽和高为窗口大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// 获取画布可视的宽和高
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;

// 判断是否有 requestAnimationFrame 方法，如果有则模拟实现
window.requestAnimFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
    window.setTimeout(callback, 1000 / 30);
};

//主游戏
var GAME = {
  //游戏初始化
  init: function() {
    //传入配置信息
    var opts = CONFIG;
    this.opts = opts;
    // 飞机对象初始横坐标
    this.planePosX = canvasWidth / 2 - opts.planeSize.width / 2;
    this.planePosY = canvasHeight - opts.planeSize.height - 50;
    //获取飞机的图像，若没有进行设置则默认为蓝色战机图像
    this.planeIcon = this.planeIcon || resourceHelper.getImage("plane1");
  },
  //游戏开始
  start: function () {
    var self = this;
    var opts = this.opts;
    this.score = 0;//分数清零
    this.timeCount = 60;//倒计时从头开始
    this.winOlose = false;//默认状态为失败
    this.enemies = []; //敌人数组清零
    // 创建主角英雄
    this.plane = new Plane({
      x: this.planePosX,
      y: this.planePosY,
      icon: this.planeIcon,
      width: opts.planeSize.width,
      height: opts.planeSize.height,
      bulletSize: opts.bulletSize, // 默认子弹长度
      bulletSpeed: opts.bulletSpeed, // 默认子弹的移动速度
      bulletIcon: resourceHelper.getImage("fireIcon"),
      boomIcon: resourceHelper.getImage("enemyBigBoomIcon")
    });
    // 飞机开始射击
    this.plane.startShoot();

    //绑定鼠标与触控
    this.bindTouchAction();
    this.bindClickAction();
  
    // 随机生成大小敌机
    this.createSmallEnemyInterval = setInterval(function () {
      self.createEnemy('normal');
    }, 500);
    this.createBigEnemyInterval = setInterval(function () {
      self.createEnemy('big');
    }, 1500);
    
    // 开始动画循环
    this.update();
    this.countDown60s();
    // 播放背景音乐
    resourceHelper.playSound('gameSound', {loop: true});

    //显示左上角的即时得分
    document.getElementById("uiScore").style.display = "block";
    document.getElementById("uiCountDown").style.display = "block";
  },
  //生成怪兽
  createEnemy: function(type) {
    var enemies = this.enemies;
    var opts = this.opts;
    var enemySize = opts.enemySmallSize;
    var enemySpeed = opts.enemySpeed;
    var enemyIcon = resourceHelper.getImage("enemySmallIcon");
    var enemyBoomIcon = resourceHelper.getImage("enemySmallBoomIcon");
    var live = 1;
    // 大型敌机参数
    if (type === 'big') {
      enemySize = opts.enemyBigSize;
      enemyIcon = resourceHelper.getImage("enemyBigIcon");
      enemyBoomIcon = resourceHelper.getImage("enemyBigBoomIcon");
      enemySpeed = opts.enemySpeed * 0.6;
      live = 10;
    } 
    // 每个元素的
    var initOpt = {
      x: Math.floor(Math.random() * (canvasWidth - enemySize.width)), 
      y: -enemySize.height,
      type: type,
      live: live,
      width: enemySize.width,
      height: enemySize.height,
      speed: enemySpeed,
      icon: enemyIcon,
      boomIcon: enemyBoomIcon
    }
    if (enemies.length < 5) {
      enemies.push(new Enemy(initOpt));
    }
  },
  //更新游戏
  update: function (params) {
    var self = this;

    // 先清理画布
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // 更新飞机、敌人
    this.updateElement();
    // 绘制画布
    this.draw();

    // 如果飞机死了游戏就结束
    if (this.plane.status === 'boomed') {
      this.end();
      return;
    }

    //60s后游戏结束
    if(this.timeCount == 0) {
      this.winOlose = true;
      this.end();
      resourceHelper.playSound('win');
      return;
    }

    //获取即时得分
    document.getElementById("gamingScore").innerHTML=this.score;

    //获得剩余时间
    document.getElementById("remainingTime").innerHTML=this.timeCount;

    // 不断循环 update
    requestAnimFrame(function() {
      self.update()
    });
  },
  //绑定外部事件
  bindTouchAction: function () {
    var opts = this.opts;
    var planeMinX = 0;
    var planeMinY = 0;
    var planeMaxX = canvasWidth - opts.planeSize.width;
    var planeMaxY = canvasHeight - opts.planeSize.height;
    var self = this;
    
    canvas.addEventListener('touchstart', function (e) {
      var plane = self.plane;
      var oldTouchX = e.touches[0].clientX;
      var oldTouchY = e.touches[0].clientY;
      var oldPlaneX = plane.x;
      var oldPlaneY = plane.y;

      e.preventDefault();
      canvas.addEventListener('touchmove', function (e) {
        var newTouchX = e.touches[0].clientX;
        var newTouchY = e.touches[0].clientY;
        var newPlaneX = oldPlaneX + newTouchX - oldTouchX;
        var newPlaneY = oldPlaneY + newTouchY - oldTouchY;
        // 判断极限
        if(newPlaneX < planeMinX){
          newPlaneX = planeMinX;
        }
        if(newPlaneX > planeMaxX){
          newPlaneX = planeMaxX;
        }
        if(newPlaneY < planeMinY){
          newPlaneY = planeMinY;
        }
        if(newPlaneY > planeMaxY){
          newPlaneY = planeMaxY;
        }
        
        e.preventDefault();
        // 更新飞机的位置
        plane.setPosition(newPlaneX, newPlaneY);
      }, false);
    }, false);
  },
  bindClickAction: function () {
    var opts = this.opts;
    var planeMinX = 0;
    var planeMinY = 0;
    var planeMaxX = canvasWidth - opts.planeSize.width;
    var planeMaxY = canvasHeight - opts.planeSize.height;
    var self = this;
    
    canvas.addEventListener('click', function (e) {
      var plane = self.plane;
      var oldClickX = e.clientX;
      var oldClickY = e.clientY;
      var oldPlaneX = plane.x;
      var oldPlaneY = plane.y;

      canvas.addEventListener('mousemove', function (e) {
        var newMouseX = e.clientX;
        var newMouseY = e.clientY;
        var newPlaneX = oldPlaneX + newMouseX - oldClickX;
        var newPlaneY = oldPlaneY + newMouseY - oldClickY;
        // 判断极限
        if(newPlaneX < planeMinX){
          newPlaneX = planeMinX;
        }
        if(newPlaneX > planeMaxX){
          newPlaneX = planeMaxX;
        }
        if(newPlaneY < planeMinY){
          newPlaneY = planeMinY;
        }
        if(newPlaneY > planeMaxY){
          newPlaneY = planeMaxY;
        }
        
        // 更新飞机的位置
        plane.setPosition(newPlaneX, newPlaneY);
      }, false);
    }, false);
  },
  //更新元素相关信息
  updateElement: function() {
    var enemies = this.enemies;
    var plane = this.plane;
    var i = enemies.length;

    if (plane.status === 'booming') {
      plane.booming();
    }
    // 循环更新怪兽
    while (i--) {
      var enemy = enemies[i];
      enemy.down();
      if (enemy.y >= canvasHeight) {
        this.enemies.splice(i, 1);
      } else {
        if (plane.status === 'normal' && plane.hasCrash(enemy)) {
          plane.booming();
          resourceHelper.playSound('dieSound');
        }
        // 根据怪兽状态判断是否被击中
        switch(enemy.status) {
          case 'normal':
            // 判断是否击中未爆炸的敌人
            if (plane.hasHit(enemy)) {
              // 设置爆炸时长展示第一帧
              enemy.live --;
              resourceHelper.playSound('hitSound');
              if (enemy.live === 0) {
                enemy.booming();
              }
            }
            break;
          case 'booming':
            enemy.booming();
            break;
          case 'boomed':
            var point = enemy.type === 'big' ? 1000 : 90;
            this.enemies.splice(i, 1);
            this.score += point;
            resourceHelper.playSound('boomSound');
        }
      }
    }
  },
  //绘制战机与敌机
  draw: function() {
    this.plane.draw();
    // 更新敌人
    this.enemies.forEach(function(enemy) {
      enemy.draw();
    });
  },
  //60s倒计时
  countDown60s: function() {
    var i = 60;
    var self = this;
    this.countDown = setInterval(function(){
      if (i>0) {
        i--;
        if (i<10) {
          self.timeCount = "0" + i;
        }
        else {
          self.timeCount = i;
        }
      }
    },1000);
  },
   //游戏结束
   end: function() {
    // 先清理画布
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    // 清除声音
    resourceHelper.pauseSound('gameSound');
    // 清除定时器
    clearInterval(this.createBigEnemyInterval);
    clearInterval(this.createSmallEnemyInterval);
    clearInterval(this.countDown);
    //游戏结束相关ui展示
    document.getElementById("uiScore").style.display = "none";
    document.getElementById("uiCountDown").style.display = "none";
    document.getElementById("uiResult").style.display= "block";
    document.getElementById("score").innerHTML=this.score;
    document.getElementById("keepTime").innerHTML= 60 - this.timeCount;
    if (this.winOlose) {
      document.getElementById("win").style.display= "block";
    }
    else {
      document.getElementById("lose").style.display= "block";
    }
  }
};





