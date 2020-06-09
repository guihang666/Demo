var dataObj = function(){
	this.fruitNum = 0 ;
	this.double = 1;
	this.score= 0;
	this.gameOver = false;
	this.alpha = 0;
}

dataObj.prototype.draw=function(){
	let width = can_one.width;
	let height = can_one.height;
	
	ctx_one.save();
	ctx_one.shadowBlur = 10;
	ctx_one.shadowColor = "while";
	ctx_one.fillStyle = "while"
	
	ctx_one.fillText("score:"+this.score,width * 0.5,height-20)
	if(this.gameOver == true){
		this.alpha+= deltaTime *0.0001;
		if(this.alpha>1){
			this.alpha=1;
		}
		ctx_one.fillStyle = "rgba(255,255,255," + this.alpha +")"
		ctx_one.fillText("GAME OVER",width * 0.5,height *0.5)
	}
	ctx_one.restore();
}

dataObj.prototype.addScore= function(){
	this.score += this.fruitNum * 100 * this.double;
	this.fruitNum = 0;
	this.double = 1;
}