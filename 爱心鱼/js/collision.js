function momFruitsCollision(){ // 判断大鱼和果实的距离
	if(data.gameOver == false){
		for (let i = 0; i < fruit.num; i++) {
			if(fruit.alive[i]){
				let length = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y) // 求平方的谜之算法
				if(length < 900){ //判断 鱼的距离 和 果实距离是否接近 
					fruit.dead(i)
					data.fruitNum++;
					mom.momBodyCount++;
					if(mom.momBodyCount>7) mom.momBodyCount = 7;
					if(fruit.fruitType[i] == "blue"){
						data.double = 2;
					}
					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		}
	}
}

function momBabyCollision(){
	if(data.fruitNum> 0 && data.gameOver == false){
		let length = calLength2(mom.x,mom.y,baby.x,baby.y)
		if(length < 900){ //判断 鱼的距离 和 果实距离是否接近
			baby.babyBodyCount = 0;
			mom.momBodyCount=0;
			data.addScore();
			halo.born(baby.x,baby.y)
		}
	}
}