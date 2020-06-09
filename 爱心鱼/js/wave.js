var waveObj = function(){
	this.x =[];
	this.y =[];
	this.alive = [];
	this.r = [];
	
}

waveObj.prototype.num = 10;

waveObj.prototype.init=function(){
	for (let i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.r[i]= 0;
	}
}

waveObj.prototype.draw=function(){
	ctx_one.save()
	ctx_one.lineWidth = 2;
	ctx_one.shadowBlur = 10;
	ctx_one.shadowColor = "while"
	for (let i = 0; i < this.num; i++) {
		if(this.alive[i]){
			this.r[i]+=deltaTime * 0.04;
			if(this.r[i]> 50){
				this.alive[i] =false
				break; 
			};
			let alpha= 1 - this.r[i] /50;
			ctx_one.beginPath();
			ctx_one.arc(this.x[i],this.y[i],this.r[i],0,Math.PI *2)
			ctx_one.closePath();
			ctx_one.strokeStyle = "rgba(255,255,255,"+alpha+")";
			ctx_one.stroke()
		}
	}
	ctx_one.restore();
}

waveObj.prototype.born=function(x,y){
	for (let i = 0; i < this.num; i++) {
		if(!this.alive[i]){
			this.alive[i] = true;
			this.r[i]= 10;
			this.x[i]=x;
			this.y[i]=y;
			return;
		}
	}
}