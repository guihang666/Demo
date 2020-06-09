var momObj = function(){ // 大鱼的对象
	this.x;
	this.y;
	this.angle; //角度(根据角度旋转身体)
	
	this.momTailTimer=0;
	this.momTailCount = 0;
	
	this.momEyeTimer=0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;
	
	this.momBodyTimer = 0;
	this.momBodyCount = 0;
	this.momBodyInterval = 1000;
}

momObj.prototype.init = function(){
	this.x = can_one.width * 0.5;
	this.y = can_one.height * 0.5;
	
	this.angle = 0;
}
momObj.prototype.draw=function(){
	this.x = lerpDistance(mx,this.x,0.98);
	this.y = lerpDistance(my,this.y,0.99);
	
	//计算角度差
	let deltaY = my - this.y;
	let deltaX = mx -this.x;
	let beta = Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle = lerpAngle(beta,this.angle,0.6); //迷之算法  
	
	this.momTailTimer +=deltaTime;
	if(this.momTailTimer >50){
		this.momTailCount = (this.momTailCount + 1) % 8 ;
		this.momTailTimer %= 50;
	}
	
	this.momEyeTimer += deltaTime
	if(this.momEyeTimer > this.momEyeInterval){
		this.momEyeCount = (this.momEyeCount +1)%2;
		this.momEyeTimer %= this.momEyeInterval;
		
		if(this.momEyeCount == 0){
			this.momEyeInterval = Math.random() * 1500 +2000;
		}else{
			this.momEyeInterval =200;
		}			

	}
	
	
	ctx_one.save();
	ctx_one.translate(this.x,this.y);
	
	ctx_one.rotate(this.angle);//旋转鱼
	
	let momBodyCount = this.momBodyCount;
	if(data.double == 1){ // 判断吃到的果实
		ctx_one.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width * 0.5,-momBodyOra[momBodyCount].height*0.5);
	}else{
		ctx_one.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width * 0.5,-momBodyBlue[momBodyCount].height*0.5);
	}
	
	let momTailCount= this.momTailCount;
	ctx_one.drawImage(momTail[momTailCount],-momTail[momTailCount].width * 0.5+30,-momTail[momTailCount].height*0.5);
	
	let momEyeCount = this.momEyeCount
	ctx_one.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width * 0.5,-momEye[momEyeCount].height*0.5);
	
	ctx_one.restore();
}