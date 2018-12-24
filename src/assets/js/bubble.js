(function(){
	var lastTime = 0;
	var vendors = ['webkit','moz'];
	for(var x = 0;x<vendors.length && !window.requestAnimationFrame;++x){
		window.requestAnimationFrame = window[vendors[x] + "requestAnimationFrame"];
		window.cancelAnimationFrame = window[vendors[x] + "cancelAnimationFrame"] || window[vendors[x] + "cancelRequestAnimationFrame"];
	}
	if(!window.requestAnimationFrame){
		window.requestAnimationFrame = function(fn,ele){
			var curTime = new Date().getTime();
			var timeTocall = Math.max(0,16-(curTime - lastTime));
			var id = window.setTimeout(function(){
				fn(curTime + timeTocall);
			},timeTocall);
			lastTime = curTime + timeTocall;
			return id;
		}
	}
	if(!window.cancelAnimationFrame){
		window.cancelAnimationFrame = function(id){
			clearTimeout(id);
		}
	}
})();
export default function bubble(){
	var canvas, ctx,
		circles, target, 
		animateHeader = true,
		width = window.innerWidth,
		height = 380;
	initHeader();
    addListeners();
	function initHeader() {
		target = {x:0,y:height};
		canvas = document.getElementById("bubbleCanvas");
		canvas.width = width;
		canvas.height = height;
		ctx = canvas.getContext('2d');
		circles = [];
		for(var i = 0;i < width*0.5; ++i){
			var c = new Circle();
			circles.push(c);
		}
		animate();
	}
	function addListeners(){
		// window.addEventListener('scroll',scrollCheck);
		window.addEventListener('resize',resize);
	}

	function scrollCheck() {
        if(document.body.scrollTop > window.innerHeight) animateHeader = false;
        else animateHeader = true;
    }
    function animate() {
    	if(animateHeader){
    		ctx.clearRect(0,0,width,height);
    		for(var i in circles){
    			circles[i].draw();
    		}
    	}
    	requestAnimationFrame(animate);
    }

    function resize() {
        width = window.innerWidth;
        canvas.width = width;
    }

	function Circle() {
		var _this = this;
		
		(function(){
			_this.pos = {};
			init();
		})();
		function init(){
			_this.pos.x = Math.random()*width;
			_this.pos.y = height + Math.random()*100;
			_this.alpha = 0.1 +Math.random()*0.3;
			_this.scale = 0.1+Math.random()*0.3;
			_this.velocity = Math.random();
		}
		this.draw = function(){
			if(_this.alpha <= 0){
				init();
			}
			_this.pos.y -= _this.velocity;
			_this.alpha -= 0.0005;
			ctx.beginPath();
			ctx.arc(_this.pos.x,_this.pos.y,_this.scale*10, 0, 2*Math.PI, false);
			ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha +')'; 
			ctx.fill();
		}
	}
}