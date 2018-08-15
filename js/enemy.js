//敌人对象
var Enemy = function(opts) {
    var opts = opts || {};
    Element.call(this, opts);
    this.status = "normal";
    this.icon = opts.icon;
    this.live = opts.live;
    this.type = opts.type;
    this.boomIcon = opts.boomIcon;
    this.boomCount = 0;
};

Enemy.prototype = new Element();

Enemy.prototype.down = function() {
    this.move(0, this.speed);
    return this;
}

Enemy.prototype.booming = function() {
    this.status = "booming";
    this.boomCount += 1;
    if(this.boomCount > 8) {
        this.status = "boomed";
    }
    return this;
}

Enemy.prototype.draw = function() {
    switch(this.status) {
        case "normal":
            context.drawImage(this.icon, this.x, this.y, this.width, this.height);
            break;
        case "booming":
            context.drawImage(this.boomIcon, this.x, this.y, this.width, this.height);
            break;
    }
    return this;
};