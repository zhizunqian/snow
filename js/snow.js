window.onload=function(){
	var canvas=document.querySelector("#canvas");
	var ctx=canvas.getContext("2d");
	var snowNum=50;
	var width=canvas.width;
	var height=canvas.height;

	
	

	function initSnow(width,height,snowNum){
		var options={
			minOpacity:0.5,maxOpacity:1,
			minRadius:3,maxRadius:10,
			minMoveX:3,maxMoveX:10,
			minSpeedY:0.5,maxSpeedY:2,SpeedX:0.05,
			maxX:width,maxY:height,
		}
		var snowArr=[];
		for(var i=0;i<snowNum;i++){
			snowArr[i]= new snow(options);
		}
		return snowArr;
	}

	function snow(options){
		this.options=options;
		this.opacitys=random(options.minOpacity,options.maxOpacity);
		this.radius=random(options.minRadius,options.maxRadius);
		this.SpeedY=random(options.minSpeedY,options.maxSpeedY);
		this.SpeedX=options.SpeedX;
		this.moveX=random(options.minMoveX,options.maxMoveX);
		this.initialX=Math.random()*options.maxX;
		this.angle=Math.random()*(Math.PI*2);
		this.x=this.initialX+Math.sin(this.angle);
		this.y=(Math.random()*options.maxY);
		// this.render();
	}
	snow.prototype.render=function(ctx){
		ctx.beginPath();
		ctx.fillStyle="rgba(255,255,255,"+this.opacitys+")";
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	}
	snow.prototype.update=function(){
		this.y+=this.SpeedY;
		if(this.y>this.options.maxY){
			this.y-=this.options.maxY;
		}
		this.angle+=this.SpeedX;
		if(this.angle>Math.PI*2){
			this.angle-=Math.PI*2;
		}
		this.x=this.initialX+this.moveX*Math.sin(this.angle);
	}

	function random(min,max){
		return Math.random()*(max-min)+min;
	}

	var snowArr=initSnow(width,height,snowNum);
	console.log(snowArr)
	console.log(snowArr.length)
	var snowArrNum=snowArr.length;


	var render=function(){
		ctx.clearRect(0,0,width,height);
		for(var i=0;i<snowArrNum;i++){
			snowArr[i].render(ctx);
		}
	}
	var update=function(){
		for(var i=0;i<snowArrNum;i++){
			snowArr[i].update();
		}
	}
	var renderAndupdate=function(){
		render();
		update();
		requestAnimationFrame(renderAndupdate);
	}
	renderAndupdate();
	
}