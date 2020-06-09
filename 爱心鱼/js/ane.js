 var aneObj = function(){
	this.rootx = [];
	this.headx=[];
	this.heady=[];
	this.amp=[];
	this.alpha=0;
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
	for (let i = 0; i < this.num; i++) {
		this.rootx[i] = i * 16 + (Math.random()*20);
		this.headx[i] = this.rootx[i];
		this.heady[i]=can_one.height -250+ Math.random()*50;
		this.amp[i] = Math.random() *50 +50;
	}
}
aneObj.prototype.draw = function(){
	//开始路径 beginPath
	//起始点  moveTo
	//从这个起始点到例一个点 lineTo
	//绘制线条颜色 strokeStyle    lineWidth 线条宽度 lineCap 线条样式
	//透明度 globalalpha 
	this.alpha +=deltaTime * 0.0008;
	let length = Math.sin(this.alpha)
	ctx_two.save();
	ctx_two.globalAlpha = 0.6; 
	ctx_two.lineWidth= 20;
	ctx_two.lineCap ="round";
	ctx_two.strokeStyle= "#3b154e";
	for (let i = 0; i < this.num; i++) {
		ctx_two.beginPath();
		ctx_two.moveTo(this.rootx[i],can_one.height);
		this.headx[i] = this.rootx[i] + length * this.amp[i];
		ctx_two.quadraticCurveTo(this.rootx[i],can_one.height - 100,this.headx[i],this.heady[i]);
		ctx_two.stroke();
	}
	ctx_two.restore();
}