var Element = function(opts) {
    var opts = opts || {};
    this.x = opts.x;
    this.y = opts.y;
    this.width = opts.width;
    this.height = opts.height;
    this.speed = opts.speed;
};

Element.prototype = {
    move: function(x,y) {
        this.x += x;
        this.y += y;
    }
};