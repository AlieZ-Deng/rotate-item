$(function(){
	var oUl = $('ul'),
	    fX = -1000,
	    fY = -600,
	    fZ = -1000,
	    dis_x,
	    dis_y,
	    regY = 0,
	    regX = 0,
	    timer,
	    regZ = -1000;

	init();    
	//入场动画
	function init(){
		for(var i = 0;i<5*5*5;i++){
			var oLi = $('<li></li>');
			oLi.html('<a></a>');
			var x = (Math.random()-0.5)*4000,
				y = (Math.random()-0.5)*4000,
				z = (Math.random()-0.5)*4000;
			oLi.css({
				'transform' : 'translate3d('+ x +'px,'+ y +'px,'+ z +'px)',
				
			});
			oUl.append(oLi);
			var loadTime = setTimeout(function(){
				orignal();
			},1000);
		}
	}
	
	//原始摆放
	function orignal(){
		$('ul li').each(function(i){
			var disX = (i%25)%5,
				disY = parseInt((i%25)/5),
				disZ = parseInt(i/25);
				$(this).css({
					'transform' : 'translate3d('+ (fX+disX*500) +'px,'+ (fY+disY*300) +'px , '+ (fZ+disZ*500) +'px)',
				});
		})
	};

	//删除Transition属性
	/*function dele(){
		var loadTime = setTimeout(function(){
			$('ul li').each(function(i){
				$(this).css({
						'transition': '0s'
					});
			});
		},1500);
	};*/


	//transition在hover的时候改变
	$('ul li').each(function(i){
		$(this).mouseover(function(){
			$(this).css({
				'transition': '0s'
			});
		})
	})
	

	//拖拽事件
	document.onmousedown = function(e){
		e = e || window.event;
		clearInterval(timer);
		var x = e.clientX,
		    y = e.clientY;
		document.onmousemove = function(e){
			e = e || window.event;
			var x1 = e.clientX,
			    y1 = e.clientY;
			    dis_x = x1-x;
			    dis_y = y1-y;
			regY = regY + dis_x*0.1;
			regX = regX + dis_y*0.1;
			x = x1;
			y = y1;
			$('ul').css({
				'transform': 'translateZ('+ regZ +'px) rotateX('+ (-regX) +'deg) rotateY('+ regY +'deg)',
			})
		}
	}
	document.onmouseup = function(){
		this.onmousemove = 'null';
	}


	//螺旋事件
	function rotate(){
		$('ul li').each(function(i){
			$(this).css({
				
				'transform' : 'rotateY('+ i*12 +'deg) translateX(288px) translateY('+ (i*9-570) +'px)  translateZ(300px)' 
			})
		})
	};


	//btn点击事件
	$('.btn').click(function(){
		rotate();
	})
	$('.btn2').click(function(){
		orignal();
	})


	//滚轮事件
	$(document).mousewheel(function(e,d){
		regZ = regZ + d*100;
		clearInterval(timer);
	
		regZ = Math.min(0 , regZ); //取这里面最小的
		regZ = Math.max(-3000 , regZ); //取这里面最大的 
		$('ul').css({
			'transform': 'translateZ('+ regZ +'px) rotateX('+ (-regX) +'deg) rotateY('+ regY +'deg)'
		});
		timer = setInterval(function(){
			d = d*0.96;
			if(Math.abs(d) < 0.01){
				clearInterval(timer);
			}
			regZ = regZ + d*10;
			regZ = Math.min(0 , regZ); 
			regZ = Math.max(-3000 , regZ);  
			$('ul').css({
				'transform': 'translateZ('+ regZ +'px) rotateX('+ (-regX) +'deg) rotateY('+ regY +'deg)'
			});
		},10)
	})
});