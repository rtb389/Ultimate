		var line2 = 0; //Tells if line has been drawn

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

		var difficulty = 0;

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
			if (x instanceof Board){
				return x.points();
			}
			else{
			 	if(x instanceof Array){
			 		if (y%2 == 0){
			 			//Minimizing (opponent's turn)
			 			var c = minimax(x[0], y+1, -1000, a);
						if (c > a){
							return c;
						}
						for (var i = 1; i < x.length; i++){
							var d = minimax(x[i], y+1, c, a)
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
						var c = minimax(x[0], y+1, 1000, a)
						if (c < a){
							return c;
						}
						for (var i = 1; i < x.length; i++){
							var d = minimax(x[i], y+1, c, a)
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
		if (a instanceof Board){

			var x;
			switch (a.val){
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
			x.next = a.next;
			for (var i = 0; i < 9; i++){
				switch (a.spaces[i].val){
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
					switch (a.spaces[i].spaces[j].val){
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
						for (var l = 0; l < e.length; l++){
							d[j] = move(e[l], x)
							j++;
						}
					}
					c = d;
				}
				else {
					var d = [];
					var j = 0;
					var e = empty(x.spaces[x.next]);
					for (var l = 0; l < e.length; l++){
						d[j] = move(e[l], x);
						j++;
					}
					c = d;
				}
			}	
		}
		else{
			if (a instanceof Array){
				c = new Array();
				for (var i = 0; i < a.length; i++){
					c[i] = replace(a[i]);
				}
			}
		}
	return c;
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
	var e = W;
	for (var i = 0; i < x; i++){
		e = replace(e);
		clicks++;
	}
	var j = -1000;
	var m = [0];
	var n = 1;
	for (var i = 0; i < e.length; i++){
		var k = minimax(e[i], 1, -1000, 1000)
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

		//Removes green line
		function degreen(){
			switch(line2){
				case 0:
					$("." + wboxes[num2] + "." + boxes[num3]).css("background-color", "white");
					break;
				case 1:
					$("." + wboxes[num2] + "." + boxes[num3]).removeClass("green1");
					$("." + wboxes[num2] + "." + boxes[num3]).addClass("diagonal1");
					break;
				case 2:
					$("." + wboxes[num2] + "." + boxes[num3]).removeClass("green2");
					$("." + wboxes[num2] + "." + boxes[num3]).addClass("diagonal2");
					break;
				case 3:
					$("." + wboxes[num2] + "." + boxes[num3]).removeClass("green3");
					$("." + wboxes[num2] + "." + boxes[num3]).addClass("horizontal");
					break;
				case 4:
					$("." + wboxes[num2] + "." + boxes[num3]).removeClass("green4");
					$("." + wboxes[num2] + "." + boxes[num3]).addClass("vertical");
					break;
			}
			line2 = 0;
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
					line2 = 1;
					break;
				case "diagonal2":
					$(x + ".TR").addClass("diagonal2");
					$(x + ".MM").addClass("diagonal2");
					$(x + ".BL").addClass("diagonal2");
					line2 = 2;
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
					line2 = 3;
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
					line2 = 4;
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
					line2 = 0;
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
				num = sim(difficulty);
				num2 = Math.floor(num/9);
				num3 = num%9;
				clicks=clicks-difficulty;

				var m = move(num, W);
				clicks++;
				if (Player == 0){
					$("." + wboxes[num2] + "." + boxes[num3]).text("o");
				}
				else{
					$("." + wboxes[num2] + "." + boxes[num3]).text("x");
				}
				$("." + wboxes[num2] + "." + boxes[num3]).css("background-color", "lightgreen")	;
				if(W.spaces[num2].val != m.spaces[num2].val){
					W = m;
					addLine();
					switch(line2){
						case 1:
							$("." + wboxes[num2] + "." + boxes[num3]).removeClass("diagonal1");
							$("." + wboxes[num2] + "." + boxes[num3]).addClass("green1");
							break;
						case 2:
							$("." + wboxes[num2] + "." + boxes[num3]).removeClass("diagonal2");
							$("." + wboxes[num2] + "." + boxes[num3]).addClass("green2");
							break;
						case 3:
							$("." + wboxes[num2] + "." + boxes[num3]).removeClass("horizontal");
							$("." + wboxes[num2] + "." + boxes[num3]).addClass("green3");
							break;
						case 4:
							$("." + wboxes[num2] + "." + boxes[num3]).removeClass("vertical");
							$("." + wboxes[num2] + "." + boxes[num3]).addClass("green4");
							break;
					}
				}	
				else{
					W = m;
				}
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
			if(clicks==81){
				W.val = -1;
				alert("TIE");
			}
		}


$("document").ready(
	function(){
		Player = prompt("Would you like to go first or second?", "1/2");
		while(Player != 1 && Player != 2){
			Player = prompt("Please enter either 1 or 2", "1/2");
		}
		Player--;
		difficulty = prompt("Please choose a level of difficulty", "1/2/3");
		while(difficulty!=1 && difficulty!=2 && difficulty!=3){
			difficulty = prompt("Please choose either 1, 2, or 3", "1/2/3");
		}
		if(difficulty == 2){
			difficulty++;
		}
		else{
			if(difficulty == 3){
				difficulty=5;
			}
		}
		if(Player==1){
			num = Math.floor(81*Math.random());
			num2 = Math.floor(num/9);
			num3 = num%9;
			clicks = 0;

			var m = move(num, W);
			clicks++;
			$("." + wboxes[num2] + "." + boxes[num3]).text("x");
			$("." + wboxes[num2] + "." + boxes[num3]).css("background-color", "lightgreen")	;
			W = m;
		}
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
				if($(this).css("background-color") == 'rgb(255, 255, 0)'){
					$(this).css("background-color", "white");
				}
			}
		);
		$(".col-xs-1").click(
			function(){
				if(W.val == ""){
					if(!$(this).text().trim().length && Player == 0){
						if(W.next==-1){
							$(this).text("x");
							degreen();
							returnClass(this);
						}
						else{
							if($(this).hasClass(wboxes[W.next])){
								$(this).text("x");
								degreen();
								returnClass(this);
							}
						}
					}
					if(!$(this).text().trim().length && Player == 1){
						if(W.next==-1){
							$(this).text("o");
							degreen();
							returnClass(this);
						}
						else{
							if($(this).hasClass(wboxes[W.next])){	
								$(this).text("o");
								degreen();
								returnClass(this);	
							}
						}
					}
				}
			}
		);
	}
);