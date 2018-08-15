//资源管理器
var resourceHelper = {
  enableMusic: true,
  //加载图片
  imageLoader: function(src, callback) {
    var image = new Image();
    image.addEventListener('load', callback);
    image.addEventListener('error', function() {
      alert('iamgerror');
    });
    image.src = src;
    return image;
  },

  getImage: function(imageName) {
    return this.resources.images[imageName];
  },
  //加载声音
  soundLoader: function(src, callback) {
    var sound = new Audio();
    sound.addEventListener('canplaythrough', function() {

    });
    sound.volume = 0.5;
    sound.src = src;
    callback();
    return sound;
  },
  //播放音乐/音效
  playSound: function(sound, config) { 
    var soundObj = this.resources.sounds[sound];
    if (!soundObj || !this.enableMusic){
      return;
    }
    config = config || {};
    // 是否设置循环
    if(config.loop){
      soundObj.loop = 'loop';
    } 
    soundObj.currentTime = 0;  
    soundObj.play();
    return soundObj;
  },
  //暂停音乐
  pauseSound: function(sound) { 
    var soundObj = this.resources.sounds[sound];
    soundObj.pause();
  },
  //资源加载
  load: function(resources, callback) {
    var images = resources.images;
    var sounds = resources.sounds;
    var total = images.length + sounds.length;
    var finish = 0; // 已完成的个数
    // 保存加载后的图片对象和声音对象
    this.resources = {
      images: {},
      sounds: {}
    };
    var self = this;

    // 遍历加载图片
    for(var i = 0 ; i < images.length; i++) {
      var name = images[i].name;
      var src = images[i].src;
      self.resources.images[name] = self.imageLoader(src, function() {
        // 加载完成
        finish++;
        if( finish == total){
          //全部加载完成
          callback(self.resources);
        }
      });
    }

    // 遍历加载声音
    for(var i = 0 ; i < sounds.length; i++) {
      var name = sounds[i].name;
      var src = sounds[i].src;
      self.resources.sounds[name] = self.soundLoader(src, function() {
        // 加载完成
        finish++;
        if( finish == total){
          //全部加载完成
          callback(self.resources);
        }
      });
    }
  }
}