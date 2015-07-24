		var count = 0;
		var clicks = 0; //Number of turns
		var Player = 0; //checks which turn player has

		var end = false; //Variable to check if small board just ended

		//The below arrays are for use in check5
		var line = ["diagonal1", "diagonal2", "horizontal", "vertical"];
		var bool = ["true", "true", "true", "true"];
		
		/* Following functions fill parts of arrays used, to prevent 
		possible error from calling on undefined variables */

		var boxes = ["TL", "TM", "TR", "ML", "MM", "MR", "BL", "BM", "BR"];
		var wboxes = ["wTL", "wTM", "wTR", "wML", "wMM", "wMR", "wBL", "wBM", "wBR"];

		var num; //Used to track which square is being selected
		var num2; //Stores board number
		var num3; //Stores position on small board

////////////////////////////////////////////////////////////////////////////////

function Board(spaces, val){
	this.spaces = spaces;
	this.val = val;
	this.fork = function(x){
		var temp = 0;
		for(var i=0; i<3;i++){
			if(this.spaces[i].val == x && this.spaces[i].val == this.spaces[i+3].val && this.spaces[i+6].val == ""){
				temp++;
			}
			else{
				if(this.spaces[i].val == x && this.spaces[i].val == this.spaces[i+6].val && this.spaces[i+3].val == ""){
					temp++;
				}
				else{
					if(this.spaces[i+3].val == x && this.spaces[i+6].val == this.spaces[i+3].val && this.spaces[i].val == ""){
						temp++;
					}
				}
			}
			if(this.spaces[3*i].val == x && this.spaces[3*i].val == this.spaces[3*i+1].val && this.spaces[3*i+2].val == ""){
				temp++;
			}
			else{
				if(this.spaces[3*i].val == x && this.spaces[3*i].val == this.spaces[3*i+2].val && this.spaces[3*i+1].val == ""){
					temp++;
				}
				else{
					if(this.spaces[3*i+2].val == x && this.spaces[3*i+1].val == this.spaces[3*i+2].val && this.spaces[3*i].val == ""){
						temp++;
					}
				}
			}
		}
		if(this.spaces[0].val == x && this.spaces[4].val == this.spaces[0].val && this.spaces[8].val == ""){
			temp++;
		}
		else{
			if(this.spaces[0].val == x && this.spaces[0].val == this.spaces[8].val && this.spaces[4].val == ""){
				temp++;
			}
			else{
				if(this.spaces[4].val == x && this.spaces[4].val == this.spaces[8].val && this.spaces[0].val == ""){
					temp++;
				}
			}
		}
		return temp;
	}
	this.corner = function(x){
		return (this.spaces[0].val == x || this.spaces[2].val == x || this.spaces[6].val == x || this.spaces[8].val == x);
	}
	this.side = function(x){
		return (this.spaces[1].val == x || this.spaces[3].val == x || this.spaces[5].val == x || this.spaces[7].val == x);
	}
	this.point = function(){
		if(this.val == "x"){
			return 6;
		}
		else{
			if(this.val == "o"){
				return -6;
			}
			else{
				var x = this.fork("x");
				if (x > 1){
					 return 5;
				}
				else{
					var o = this.fork("o");
					if (o > 1){
						return 5;
					}
					else{
						if(x == 1 && o == 1){
							return 0;
						}
						else{
							if (x == 1){
								return 4;
							}
							else{
								if (o == 1){
									return -4;
								}
								else{
									if (this.spaces[4].val == "x"){
										return 3;
									}
									else{
										if (this.spaces[4].val == "o"){
											return -3;
										}
										else{
											var x1 = this.corner("x");
											var o1 = this.corner("o");
											if (x1 && o1){
												return 0;
											}
											else{
												if (x1){
													return 2;
												}
												else{
													if (o1){
														return -2;
													}
													else{
														var x2 = this.side("x");
														var o2 = this.side("o");
														if(x2 && o2){
															return 0;
														}
														else{
															if (x2){
																return 1;
															}
															else{
																if (o2){
																	return -1;
																}
																else {
																	return 0;
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}	
			}
		}			
	}

//Store the value of this, and only change it for the spaces that change
		
	this.points = function(){
		var a;
		if (this.spaces[0] instanceof Board){
			a = 6 * this.point();
			for (var i = 0; i < 9; i++){
				a += this.spaces[i].point();
			}
		}
		else{
			a = this.point();
		}
		if(Player == 0){
			return -a;
		}
		else{
			return a;
		}
	}
}
function space(val, num){
	this.val = val;
	this.num = num;
}


var W = new Board([], "");
for (var i = 0; i < 9; i++){
	W.spaces[i] = new Board([], "");
	for (var j = 0; j < 9; j++){
		W.spaces[i].spaces[j] = new space("", 9*i + j);
	}
}
W.next = -1;

///////////////////////////////////////////////////////////////////////////////


		function empty(x){
			var arr = [];
			var j = 0;
			for (var i = 0; i < 9; i++){
				if (x.spaces[i].val == ""){
					arr[j] = x.spaces[i].num;
					j++;
				}
			}
			return arr;
		}

		//Takes input of form of output (y)
		function move(x, y){
			var a;
			switch (y.val){
				case "":
			 		a = new Board([], "");
			 		break;
			 	case "x":
			 		a = new Board([], "x");
			 		break;
			 	case "o":
			 		a = new Board([], "o");
			 		break;
			}
			a.next = y.next;
			for (var i = 0; i < 9; i++){
				switch (y.spaces[i].val){
					case "":
			 			a.spaces[i] = new Board([], "");
				 		break;
				 	case "x":
			 			a.spaces[i] = new Board([], "x");
				 		break;
				 	case "o":
				 		a.spaces[i] = new Board([], "o");
				 		break;
				}
				for (var j = 0; j < 9; j++){
					switch (y.spaces[i].spaces[j].val){
						case "":
			 				a.spaces[i].spaces[j] = new space("", 9*i + j);
			 				break;
				 		case "x":
			 				a.spaces[i].spaces[j] = new space("x", 9*i + j);
					 		break;
					 	case "o":
							a.spaces[i].spaces[j] = new space("o", 9*i + j);
				 			break;
					}
				}
			}
			var b;
			if (clicks%2 == 0){
				b = "x";
			}
			else{
				b = "o";
			}
			var c = x%9;
			var d = Math.floor(x/9);

			a.spaces[d].spaces[c].val = b;
			if(a.spaces[d].val == ""){
				if(check5(c, bool, a.spaces[d])){
					a.spaces[d].val = b;
					if(check5(d, bool, a)){
						a.val = b;
					}
				}
			}

			if (empty(a.spaces[c]).length == 0){
				a.next = -1;
			}
			else{
				a.next = c;
			}
			return a
		}

		function minimax(x, y, a, b){
			if (x[0] instanceof Board){
				return x[1];
			}
			else{
			 	if(x[0] instanceof Array){
			 		if (y%2 == 0){
			 			//Minimizing (opponent's turn)
			 			var c = minimax(x[0][0], y+1, -1000, a);
						if (c > a){
							return c;
						}
						for (var i = 1; i < x[0].length; i++){
							var d = minimax(x[0][i], y+1, c, a)
							if (d > a){
								return d;
							}
							else{
								if (d > c){
									c = d;
								}
							}
						}
						return c;
					}
					else{
						//Maximizing (AI's turn)
						var c = minimax(x[0][0], y+1, 1000, a)
						if (c < a){
							return c;
						}
						for (var i = 1; i < x[0].length; i++){
							var d = minimax(x[0][i], y+1, c, a)
							if (d < a){
								return d;
							}
							else{
						 		if(d < c){
									c = d;
								}
							}
						}
						return c
					}
				}
			}
		}

function replace(a){
	var c;
		if (a[0] instanceof Board){

			var x;
			switch (a[0].val){
				case "":
			 		x = new Board([], "");
			 		break;
			 	case "x":
			 		x = new Board([], "x");
			 		break;
			 	case "o":
			 		x = new Board([], "o");
			 		break;
			}
			x.next = a[0].next;
			for (var i = 0; i < 9; i++){
				switch (a[0].spaces[i].val){
					case "":
			 			x.spaces[i] = new Board([], "");
				 		break;
				 	case "x":
			 			x.spaces[i] = new Board([], "x");
				 		break;
				 	case "o":
				 		x.spaces[i] = new Board([], "o");
				 		break;
				}
				for (var j = 0; j < 9; j++){
					switch (a[0].spaces[i].spaces[j].val){
						case "":
			 				x.spaces[i].spaces[j] = new space("", 9*i + j);
			 				break;
				 		case "x":
			 				x.spaces[i].spaces[j] = new space("x", 9*i + j);
					 		break;
					 	case "o":
							x.spaces[i].spaces[j] = new space("o", 9*i + j);
				 			break;
					}
				}
			}

			if (x.val != ""){
				c = x;
			}
			else{
				if (x.next == -1){
					var d = []
					var j = 0
					for (var k = 0; k < 9; k++){
						var e = empty(x.spaces[k]);
						var q = a[1] - 6*a[0].point() - a[0].spaces[k].point();
						for (var l = 0; l < e.length; l++){
							var r = move(e[l], x);
							var p = 6*r.point() + r.spaces[k].point()
							if(Player==0){
								d[j] = [r, a[1] + q - p];
							}
							else{
								d[j] = [r, a[1] - q + p];
							}
							j++;
						}
					}
					c = d;
				}
				else {
					var d = [];
					var j = 0;
					var e = empty(x.spaces[x.next]);
					var q = 6*a[0].point() + a[0].spaces[x.next].point();
					for (var l = 0; l < e.length; l++){
						var r = move(e[l], x);
						var p = 6*r.point() + r.spaces[x.next].point()
						if(Player==0){
							d[j] = [r, a[1] + q - p];
						}
						else{
							d[j] = [r, a[1] - q + p];
						}
						j++;
					}
					c = d;
				}
			}	
		}
		else{
			if (a[0] instanceof Array){
				c = new Array();
				for (var i = 0; i < a[0].length; i++){
					c[i] = replace(a[0][i]);
				}
			}
		}
	return [c, a[1]];
}

function sim(x){
	var d = [];
	if (W.next == -1){
		for (var i = 0; i < 9; i++){
			d = d.concat(empty(W.spaces[i]));
		}
	}
	else{
		d = empty(W.spaces[W.next]);
	}
	var e = [W, W.points()];
	for (var i = 0; i < x; i++){
		e = replace(e);
		clicks++;
	}
	var j = -1000;
	var m = [0];
	var n = 1;
	for (var i = 0; i < e[0].length; i++){
		var k = minimax(e[0][i], 1, -1000, 1000)
		console.log(k)
		if (k == j){
			m[n] = i;
			n++;
		}
		if(k > j){
			m = [i];
			n = 1;
			j = k;
		}
	}
	var l = m[Math.floor((m.length)*Math.random())];
	return d[l];
}

///////////////////////////////////////////////////////////////////////////////

		//check5 is a helper function for check3 and 4 to see if a 3x3 board is filled

		function check5(x, y, z){
			switch (x){
					case 0:
						if(z.spaces[x].val == z.spaces[x+1].val && z.spaces[x].val == z.spaces[x+2].val){
							return y[2];
						}
						else if(z.spaces[x].val == z.spaces[x+3].val && z.spaces[x].val == z.spaces[x+6].val){
							return y[3];
						}
						else if(z.spaces[x].val == z.spaces[x+4].val && z.spaces[x].val == z.spaces[x+8].val){
							return y[0];
						}
						break;
					case 1:
						if(z.spaces[x].val == z.spaces[x-1].val && z.spaces[x].val == z.spaces[x+1].val){
							return y[2];
						}
						else if(z.spaces[x].val == z.spaces[x+3].val && z.spaces[x].val == z.spaces[x+6].val){
							return y[3];
						}
						break;
					case 2:
						if(z.spaces[x].val == z.spaces[x-1].val && z.spaces[x].val == z.spaces[x-2].val){
							return y[2];
						}
						else if(z.spaces[x].val == z.spaces[x+3].val && z.spaces[x].val == z.spaces[x+6].val){
							return y[3];
						}
						else if(z.spaces[x].val == z.spaces[x+2].val && z.spaces[x].val == z.spaces[x+4].val){
							return y[1];
						}
						break;
					case 3:
						if(z.spaces[x].val == z.spaces[x+1].val && z.spaces[x].val == z.spaces[x+2].val){
							return y[2];
						}
						else if(z.spaces[x].val == z.spaces[x+3].val && z.spaces[x].val == z.spaces[x-3].val){
							return y[3];
						}
						break;
					case 4:
						if(z.spaces[x].val == z.spaces[x+1].val && z.spaces[x].val == z.spaces[x-1].val){
							return y[2];
						}
						else if(z.spaces[x].val == z.spaces[x+3].val && z.spaces[x].val == z.spaces[x-3].val){
							return y[3];
						}
						else if(z.spaces[x].val == z.spaces[x+4].val && z.spaces[x].val == z.spaces[x-4].val){
							return y[0];
						}
						else if(z.spaces[x].val == z.spaces[x+2].val && z.spaces[x].val == z.spaces[x-2].val){
							return y[1];
						}
						break;
					case 5:
						if(z.spaces[x].val == z.spaces[x-1].val && z.spaces[x].val == z.spaces[x-2].val){
							return y[2];
						}
						else if(z.spaces[x].val == z.spaces[x+3].val && z.spaces[x].val == z.spaces[x-3].val){
							return y[3];
						}
						break;
					case 6:
						if(z.spaces[x].val == z.spaces[x+1].val && z.spaces[x].val == z.spaces[x+2].val){
							return y[2];
						}
						else if(z.spaces[x].val == z.spaces[x-6].val && z.spaces[x].val == z.spaces[x-3].val){
							return y[3];
						}
						else if(z.spaces[x].val == z.spaces[x-2].val && z.spaces[x].val == z.spaces[x-4].val){
							return y[1];
						}
						break;
					case 7:
						if(z.spaces[x].val == z.spaces[x+1].val && z.spaces[x].val == z.spaces[x-1].val){
							return y[2];
						}
						else if(z.spaces[x].val == z.spaces[x-6].val && z.spaces[x].val == z.spaces[x-3].val){
							return y[3];
						}
						break;
					case 8:
						if(z.spaces[x].val == z.spaces[x-2].val && z.spaces[x].val == z.spaces[x-1].val){
							return y[2];
						}
						else if(z.spaces[x].val == z.spaces[x-6].val && z.spaces[x].val == z.spaces[x-3].val){
							return y[3];
						}
						else if(z.spaces[x].val == z.spaces[x-4].val && z.spaces[x].val == z.spaces[x-8].val){
							return y[0];
						}
						break;
			}
		}

		// check4 checks whether or not the entire board is finished
		function check4(){
			if(check5(num2, bool, W)){
				if(Player == 0){
					W.val = "x";
				}
				else{
					W.val = "o";
				}
			}
			if(W.val != ""){
				if(Player == 0){
					alert("WINNER: PLAYER 1");
				}
				else{
					alert("WINNER: PLAYER 2");
				}
			}
		}

		//unCheck returns which of the large boards you are in
		function unCheck(){
			return "." + wboxes[num2];
		}

		//addLine draws a line through a completed row/column/diagonal
		function addLine(){
			var x = unCheck();
			var y = check5(num3, line, W.spaces[num2]);
			switch (y){
				case "diagonal1":
					$(x + ".TL").addClass("diagonal1");
					$(x + ".MM").addClass("diagonal1");
					$(x + ".BR").addClass("diagonal1");
					break;
				case "diagonal2":
					$(x + ".TR").addClass("diagonal2");
					$(x + ".MM").addClass("diagonal2");
					$(x + ".BL").addClass("diagonal2");
					break;
				case "horizontal":
					if(num%9 < 3){
						$(x + ".TL").addClass("horizontal");
						$(x + ".TM").addClass("horizontal");
						$(x + ".TR").addClass("horizontal");
					}
					else if(num%9 < 6){
						$(x + ".ML").addClass("horizontal");
						$(x + ".MM").addClass("horizontal");
						$(x + ".MR").addClass("horizontal");
					}
					else{
						$(x + ".BL").addClass("horizontal");
						$(x + ".BM").addClass("horizontal");
						$(x + ".BR").addClass("horizontal");
					}
					break;
				case "vertical":
					if (num%3 == 0){
						$(x + ".TL").addClass("vertical");
						$(x + ".ML").addClass("vertical");
						$(x + ".BL").addClass("vertical");
					}
					else if(num%3 == 1){
						$(x + ".TM").addClass("vertical");
						$(x + ".MM").addClass("vertical");
						$(x + ".BM").addClass("vertical");
					}
					else{
						$(x + ".TR").addClass("vertical");
						$(x + ".MR").addClass("vertical");
						$(x + ".BR").addClass("vertical");
					}
				break;
			}
		}

		// check3 checks whether or not the small board is finished and fills the over array
		function check3(){
			if(W.spaces[num2].val == ""){
				end = check5(num3, bool, W.spaces[num2]);
				if(end){
					if(Player == 0){
						W.spaces[num2].val = "x";
					}
					else{
						W.spaces[num2].val = "o";
					}
					end = false;
					addLine();
					check4();
				}
			}
		}

		// check2 is a helper function of check
		function check2(x){
			for (var i = 0; i < 9; i++){
				if ($(x).hasClass(boxes[i])){
					num += i;
					num2 = Math.floor(num/9); 
					num3 = num%9		
					break;	
				}
			}
			if(Player == 0){
				W.spaces[num2].spaces[num3].val = "x";
			}
			else{
				W.spaces[num2].spaces[num3].val = "o";
			}
			check3();
		}

		/* check finds the square selected and fills the corresponding
		element of the fill array (with the help of check2) */
		function check(x){
			for (var i = 0; i < 9; i++){
				if ($(x).hasClass(wboxes[i])){
					num = 9*i;	
					break;		
				}
			}
			check2(x);	
		}

		//returnClass adds onto the w variables (for the next move) and adjusts next
		function returnClass(x){
			check(x);
			for (var v = 0; v < 9; v++){
				if($(x).hasClass(boxes[v])){
					if(empty(W.spaces[v]).length == 0){
						W.next = -1;
					}
					else{
						W.next = v;
					}
					break;
				}
			}		
			clicks++;

//////////////////////////////////////////////////////////////////////
			if(W.val == ""){
				num = sim(5);
				num2 = Math.floor(num/9);
				num3 = num%9;
				clicks++;

				var m = move(num, W);
				clicks--;
				if (Player == 0){
					$("." + wboxes[num2] + "." + boxes[num3]).text("o");
				}
				else{
					$("." + wboxes[num2] + "." + boxes[num3]).text("x");
				}
				if(W.spaces[num2].val != m.spaces[num2].val){
					addLine();
				}
				W = m;		
				if (W.val != ""){
					if (Player == 0){
						alert("WINNER: PLAYER 2");
					}
					else{
						alert("WINNER: PLAYER 1");
					}
				}
			}
//////////////////////////////////////////////////////////////////////
			
		}


$("document").ready(
	function(){
		$(".col-xs-1").hover(
			function(){
				if(W.val == ""){
					if(!$(this).text().trim().length){
						if(W.next==-1){
							$(this).css("background-color", "yellow");
						}
						else{
							if($(this).hasClass(wboxes[W.next])){
								$(this).css("background-color", "yellow");
							}
						}
					}
				}
			},
			function(){
				$(this).css("background-color", "white");
			}
		);
		$(".col-xs-1").click(
			function(){
				if(W.val == ""){
					if(!$(this).text().trim().length && Player == 0){
						if(W.next==-1){
							$(this).text("x");
							returnClass(this);
						}
						else{
							if($(this).hasClass(wboxes[W.next])){
								$(this).text("x");
								returnClass(this);
							}
						}
					}
					if(!$(this).text().trim().length && Player == 1){
						if(W.next==-1){
							$(this).text("o");
							returnClass(this);
						}
						else{
							if($(this).hasClass(wboxes[W.next])){	
								$(this).text("o");
								returnClass(this);	
							}
						}
					}
				}
			}
		);
	}
);
