var fruitObj= function(){
	this.alive = [] //果实 是否存活
	this.orange= new Image();
	this.blue = new Image();
	this.x = [];
	this.y = [];
	this.l = []; // 海葵果实的长度
	this.aneNO= [];
	this.speed = []; //果实往上飘的速度
	this.fruitType = []; // 果实类型
}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function(){
	for (let i = 0; i < this.num; i++) {
		this.alive[i] = false; // 初始化果实的任务
		this.x[i]=0;
		this.aneNO[i]=0;
		this.y[i]=0;
		this.speed[i]= (Math.random() * 0.017) + 0.003; //  随机海葵票的速度
		this.fruitType[i] ="";
	}
	this.orange.src = "./src/fruit.png"
	this.blue.src= "./src/blue.png"
}
fruitObj.prototype.draw = function(){
	for (let i = 0; i < this.num; i++) {
		//console.info(this.y[i],this.x[i])
		if(this.alive[i]){
			let pic = null;
			if(this.fruitType[i] == "blue"){
				pic = this.blue;
			}else{
				pic = this.orange;
			}
			if(this.l[i] <= 14){//限制图片的大小
				this.x[i] = ane.headx[this.aneNO[i]]
				this.y[i] = ane.heady[this.aneNO[i]]
				this.l[i]+=this.speed[i] * deltaTime;	//果实会随着时间的关系不停的增长
			}else{ // 长大的果实可以飘了
				this.y[i] -= this.speed[i] * 7 * deltaTime;
			}
			ctx_two.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] -  this.l[i] * 0.5, this.l[i], this.l[i]);
			if(this.y[i]<10)this.alive[i]=false; //果实未完全长大 任务状态为待机状态
		}
	}
}
fruitObj.prototype.born = function(i){//随机找个海葵
	// this.x[i] = ane.headx[aneId];//果实随机出来的位置x轴
	// this.y[i] = ane.heady[aneId] ;//果实随机出来的位置y轴
	this.aneNO[i] = Math.floor(Math.random() * ane.num);
	this.l[i]=0;
	this.alive[i] = true;
	let ran = Math.random(); // 随机 果实颜色
	if(ran < 0.2){
		this.fruitType[i] = "blue"
	}else{
		this.fruitType[i] = "orange"
	}
	
}

fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}

/* fruitObj.prototype.update = function(){
	let num =0;
	for(let i = 0;i<this.num;i++){
		if(this.alive[i]){
			num++;
		}
	}
} */
function fruitMonitor(){ // 监视果实个数
	let num =0;
	for(let i = 0;i<fruit.num;i++){
		if(fruit.alive[i]){
			num++;
		}
	}
	if(num < 15){
		sendFruit()
		return;
	}
}
function sendFruit(){ // 当果实任务完成后调用该方法 生成一个果实
	for(let i = 0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}