var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	
	this.babyTailTimer = 0;
	this.babyTailCount = 0;
	
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;
	
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
	this.babyBodyInterval = 1000;
}
babyObj.prototype.init=function(){
	this.x = can_one.width* 0.5 -50;
	this.y = can_one.height* 0.5 +50;
	this.angle = 0;
}

babyObj.prototype.draw = function(){
	this.x = lerpDistance(mom.x,this.x,0.98)
	this.y = lerpDistance(mom.y,this.y,0.98)
	
	//计算角度差
	let deltaY = mom.y - this.y;
	let deltaX = mom.x -this.x;
	let beta = Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle = lerpAngle(beta,this.angle,0.6); //迷之算法  
	
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer >50){
		this.babyTailCount= (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}
	
	this.babyEyeTimer += deltaTime
	if(this.babyEyeTimer > this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount +1)%2;
		this.babyEyeTimer %= this.babyEyeInterval;
		
		if(this.babyEyeCount == 0){
			this.babyEyeInterval = Math.random() * 1500 +2000;
		}else{
			this.babyEyeInterval =200;
		}			

	}
	
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer >300){
		this.babyBodyCount= (this.babyBodyCount + 1);
		this.babyBodyTimer = 0;
		if(this.babyBodyCount >19){
			this.babyBodyCount = 19;
			data.gameOver = true;
		}
	}
	
	ctx_one.save();
	ctx_one.translate(this.x,this.y);//将原点转移
	
	ctx_one.rotate(this.angle);//旋转鱼
	
	let babyTailCount = this.babyTailCount;
	ctx_one.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width * 0.5+24,-babyTail[babyTailCount].height*0.5);
	
	let babyBodyCount = this.babyBodyCount;
	ctx_one.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width * 0.5,-babyBody[babyBodyCount].height*0.5);
	
	let babyEyeCount = this.babyEyeCount;
	ctx_one.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width * 0.5,-babyEye[babyEyeCount].height*0.5);
	
	ctx_one.restore();
}