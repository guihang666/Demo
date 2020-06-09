var dustObj = function(){
	this.x =[];
	this.y = [];
	this.amp = [];
	this.NO = [];
	this.alpha;
}

dustObj.prototype.num = 30;

dustObj.prototype.init= function(){
	for (let i = 0; i < this.num; i++) {
		this.x[i] = Math.random() * can_one.width;
		this.y[i] = Math.random() * can_one.height;
		this.amp[i] = 20 + Math.random() * 25;
		this.NO[i] = Math.floor(Math.random() * 7);
	}
	this.alpha= 0;
}

dustObj.prototype.draw= function(){
	this.alpha += deltaTime * 0.0008;
	let l = Math.sin(this.alpha);//正弦值
	for (let i = 0; i < this.num; i++) {
		ctx_one.drawImage(dustPic[this.NO[i]] ,this.x[i] + this.amp[i] * l,this.y[i] )
	}
}