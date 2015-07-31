		var line2 = 0; //Tells whether or not a line was just drawn

		var clicks = 0; //Number of turns
		var Player = 0; //checks which person's turn it is

		var next = ""; //string to track where next player can go

		var end = false; //Boolean to check if a small board was just finished
		var game = false; //Variable to see if game is over

		var fill = []; //Array to track status of each of the 81 squares
		var over = []; //Array to check status of the 9 small boards

		//The below arrays are for use in check5
		var line = ["diagonal1", "diagonal2", "horizontal", "vertical"];
		var bool = ["true", "true", "true", "true"];
		
		/* Following functions fill parts of arrays used, to prevent 
		possible error from calling on undefined variables */

		for(var i = 0; i < 81; i++){
			fill[i] = "";
		}
		for(var i = 0; i < 9; i++){
			over[i] = "";
		}

		/*Following variables track how many squares in the smaller
		boards are filled, so that next can be adjusted if it goes
		to a completely filled board */

		var boxes = ["TL", "TM", "TR", "ML", "MM", "MR", "BL", "BM", "BR"];
		var wboxes = ["wTL", "wTM", "wTR", "wML", "wMM", "wMR", "wBL", "wBM", "wBR"]

		var w = [0, 0, 0, 0, 0, 0, 0, 0, 0] //Checks how many times each board has been played in

		var num = 0; //Used to track which square is being selected
		var num2 = 0; //Stores board number
		var num3 = 0; //Stores space on board

		//check5 is a helper function for check3 and 4 to see if a 3x3 board is filled
		function check5(x, y, z){
			switch (x%9){
					case 0:
						if(z[x] == z[x+1] && z[x] == z[x+2]){
							return y[2];
						}
						else if(z[x] == z[x+3] && z[x] == z[x+6]){
							return y[3];
						}
						else if(z[x] == z[x+4] && z[x] == z[x+8]){
							return y[0];
						}
						break;
					case 1:
						if(z[x] == z[x-1] && z[x] == z[x+1]){
							return y[2];
						}
						else if(z[x] == z[x+3] && z[x] == z[x+6]){
							return y[3];
						}
						break;
					case 2:
						if(z[x] == z[x-1] && z[x] == z[x-2]){
							return y[2];
						}
						else if(z[x] == z[x+3] && z[x] == z[x+6]){
							return y[3];
						}
						else if(z[x] == z[x+2] && z[x] == z[x+4]){
							return y[1];
						}
						break;
					case 3:
						if(z[x] == z[x+1] && z[x] == z[x+2]){
							return y[2];
						}
						else if(z[x] == z[x+3] && z[x] == z[x-3]){
							return y[3];
						}
						break;
					case 4:
						if(z[x] == z[x+1] && z[x] == z[x-1]){
							return y[2];
						}
						else if(z[x] == z[x+3] && z[x] == z[x-3]){
							return y[3];
						}
						else if(z[x] == z[x+4] && z[x] == z[x-4]){
							return y[0];
						}
						else if(z[x] == z[x+2] && z[x] == z[x-2]){
							return y[1];
						}
						break;
					case 5:
						if(z[x] == z[x-1] && z[x] == z[x-2]){
							return y[2];
						}
						else if(z[x] == z[x+3] && z[x] == z[x-3]){
							return y[3];
						}
						break;
					case 6:
						if(z[x] == z[x+1] && z[x] == z[x+2]){
							return y[2];
						}
						else if(z[x] == z[x-6] && z[x] == z[x-3]){
							return y[3];
						}
						else if(z[x] == z[x-2] && z[x] == z[x-4]){
							return y[1];
						}
						break;
					case 7:
						if(z[x] == z[x+1] && z[x] == z[x-1]){
							return y[2];
						}
						else if(z[x] == z[x-6] && z[x] == z[x-3]){
							return y[3];
						}
						break;
					case 8:
						if(z[x] == z[x-2] && z[x] == z[x-1]){
							return y[2];
						}
						else if(z[x] == z[x-6] && z[x] == z[x-3]){
							return y[3];
						}
						else if(z[x] == z[x-4] && z[x] == z[x-8]){
							return y[0];
						}
						break;
			}
		}

		// check4 checks whether or not the entire board is finished
		function check4(){
			game = check5(num2, bool, over);
			if(game){
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
			return ("." + wboxes[num2])
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
			var y = check5(num, line, fill);
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
					if(num3 < 3){
						$(x + ".TL").addClass("horizontal");
						$(x + ".TM").addClass("horizontal");
						$(x + ".TR").addClass("horizontal");
					}
					else if(num3 < 6){
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
			num2 = Math.floor(num/9); 
			num3 = num%9;
			if(over[num2] == ""){
				end = check5(num, bool, fill);
				if(end){
					if(Player == 0){
						over[num2] = "x";
					}
					else{
						over[num2] = "o";
					}
					end = false;
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
					check4();
				}
			}
		}

		// check2 is a helper function of check
		function check2(x){
			for(var i = 0; i < 9; i++){
				if ($(x).hasClass(boxes[i])){
					num+= i;
					break;
				}
			}
			if(Player == 0){
				fill[num] = "x";
			}
			else{
				fill[num] = "o";
			}
			check3();
		}

		//firstClick adds the first turn's choice to the corresponding w variable
		function firstClick(x){
			for(var i = 0; i < 9; i++){
				if ($(x).hasClass(wboxes[i])){
					w[i]++;
				}
			}
		}

		/* check finds the square selected and fills the corresponding
		element of the fill array (with the help of check2) */
		function check(x){
			for(var i = 0; i < 9; i++){
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
			for(var i = 0; i < 9; i++){
				if($(x).hasClass(boxes[i])){
					if(w[i] == 9){
						next = ""
					}
					else{
						next = wboxes[i];
						w[i]++;
					}
					break;
				}	
			}
			

			clicks++;
			if(clicks == 1){
				firstClick(x);
			}
			if(clicks == 81){
				game = true;
				alert("TIE");
			}
			
		}


$("document").ready(
	function(){
		$(".col-xs-1").hover(
			function(){
				if(!game){
					if(!$(this).text().trim().length){
						if(next==""){
							$(this).css("background-color", "yellow");
						}
						else{
							if($(this).hasClass(next)){
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
				if(!game){
					Player = clicks%2; 
					if(!$(this).text().trim().length && Player == 0){
						if(next==""){
							$(this).text("x");
							$(this).css("background-color", "lightgreen");
							degreen;
							returnClass(this);
						}
						else{
							if($(this).hasClass(next)){
								$(this).text("x");
								$(this).css("background-color", "lightgreen");
								degreen();
								returnClass(this);
							}
						}
					}
					if(!$(this).text().trim().length && Player == 1){
						if(next==""){
							$(this).text("o");
							$(this).css("background-color", "lightgreen");
							degreen();
							returnClass(this);
						}
						else{
							if($(this).hasClass(next)){	
								$(this).text("o");
								$(this).css("background-color", "lightgreen");
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
