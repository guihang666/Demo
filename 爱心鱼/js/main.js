let ctx_one;
let ctx_two;

let bgPic = new Image();

let ane;
let fruit;
let mom;
let baby;
let data;

let babyTail = [];
let babyEye = [];
let babyBody = [];

let momTail = []; 
let momEye = []; 
let momBodyOra =[];
let momBodyBlue =[];


let wave;//大鱼吃到东西产生的圈
let halo; //小鱼圈
let dust;//漂浮物
let dustPic  =[];

let mx;//鼠标x轴
let my;//鼠标y轴

let lastTime; //上一次被执行的时间
let deltaTime;// 当前时间和lastTime之间的时间差

document.body.onload =function game(){
	init();
	gameLoop();
}

function init(){
	lastTime = Date.now(); // 初始化时间
	deltaTime = 0;
	
	can_one = document.getElementById("canvas_one");//鱼,
	ctx_one = can_one.getContext("2d");
	ctx_one.fillStyle = "white";
	ctx_one.font = "30px Verdana";
	ctx_one.textAlign = "center"
	can_two = document.getElementById("canvas_two");//背景,
	ctx_two = can_two.getContext("2d");
	
	can_one.addEventListener("mousemove",onMouseMove,false);//监听鼠标的移动
	
	bgPic.src = "./src/background.jpg";//背景图片
	ane= new aneObj();//海葵对象
	ane.init()//海葵初始化 
	
	fruit = new fruitObj();//海葵果实对象
	fruit.init();
	
	mom = new momObj(); // 鱼的对象
	mom.init();
	baby = new babyObj();//小鱼对象
	baby.init();
	
	data = new dataObj();
	
	mx = can_one.width * 0.5;
	my = can_one.height * 0.5;
	
	for (let i = 0; i < 8; i++) {
		babyTail[i] = new Image();
		babyTail[i].src ="./src/babyTail"+i+".png"
	}
	
	for (let i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		babyEye[i].src ="./src/babyEye"+i+".png"
	}
	
	for (let i = 0; i < 20; i++) {
		babyBody[i] = new Image();
		babyBody[i].src ="./src/babyFade"+i+".png"
	}
	
	for (let i = 0; i < 8; i++) {
		momTail[i] = new Image();
		momTail[i].src ="./src/bigTail"+i+".png"
	}
	
	for (let i = 0; i < 2; i++) {
		momEye[i] = new Image();
		momEye[i].src ="./src/bigEye"+i+".png"
	}
	
	for (let i = 0; i < 8; i++) {
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		
		momBodyOra[i].src = "./src/bigSwim"+i+".png";
		momBodyBlue[i].src = "./src/bigSwimBlue"+i+".png";
	}
	
	wave = new waveObj();
	wave.init();
	halo = new haloObj();
	halo.init();
	
	for (let i = 0; i < 7; i++) {
		dustPic[i] = new Image();
		dustPic[i].src ="./src/dust"+i+".png"
	}
	
	dust = new dustObj();
	dust.init();
	
}

function gameLoop(){//刷新游戏 主循环
	requestAnimFrame(gameLoop);
	let now =  Date.now();
	deltaTime =  now - lastTime;
	lastTime = now;
	if(deltaTime > 40) deltaTime = 40;
	
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	
	ctx_one.clearRect(0,0,can_one.width,can_one.height);//方法清空给定矩形内的指定像素。
	mom.draw();
	baby.draw();
	momFruitsCollision();
	momBabyCollision(); 
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function onMouseMove(e){ // 得到鼠标的位置
	if(data.gameOver == false){
		if(e.offSetX || e.layerX){
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
			//console.info(mx,my)
		}
	}
}
