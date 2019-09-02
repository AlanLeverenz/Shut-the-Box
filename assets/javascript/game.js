$(document).ready(function() { 


    // GLOBAL VARIABLES ================================================

    var playerCount = 0;
    var playerTotal = 0;
    var playerScore = 0;
    var playerWins = 0;
    var playerTurn = 1;
    var currentTurn = 0;
    var diceTotal = 0;
    var clickTotal = 0;
    var prevClickTotal = 0;
    var tabNum = 0;
    var playerArray = [];
    var username = '';
    var diceImageType = "png";
    var diceOption = "two";

    var boxDice = { 
        jif1src: "assets/images/dice1animation2.gif",
        jif2src: "assets/images/dice2animation.gif",
        png1src: "assets/images/one-dice.png",
        png2src: "assets/images/two-dice.png"
    };

    var boardDice = ["",
    "assets/images/dice-shadow-1.png",
    "assets/images/dice-shadow-2.png",
    "assets/images/dice-shadow-3.png",
    "assets/images/dice-shadow-4.png",
    "assets/images/dice-shadow-5.png",
    "assets/images/dice-shadow-6.png",
    ];

    var tabNumArray = []; // for storing each user's selections


    // FUNCTIONS =======================================================

    // game start
    var start = function() {
    $(".open-box").hide();
    $(".entry-zone").hide();
    $(".player-zone").hide(); 
    $(".next").hide();
    playerCount = 0;
    playerTotal = 0;
    playerScore = 0;
    playerWins = 0;
    currentTurn = 0;
    tabNum = 0;
    diceTotal = 0;
    clickTotal = 0;
    prevClickTotal = 0;
    playerArray = [];
    username = '';
    diceImageType = "png";
    diceOption = "two";
    }

    // FUNCTIONS =========================================================

    // open the game board -----------------------------------------------
    var openGame = function() {
        // initialize variables local to the player
        tabNum = 0;
        diceTotal = 0;
        clickTotal = 0;
        prevClickTotal = 0;

        // hide and show containers
        $(".entry-zone").hide();
        $(".shut-box").hide();
        $(".open-box").fadeIn(2000);
        $(".player-zone").fadeIn(2000);
        
        // display username in current-turn div
        username = playerArray[currentTurn];
        var playerTag = $("<h2>");
        playerTag.attr("style","color:brown");
        playerTag.text(username);
        $("#current-turn").append(playerTag);

        // display username, instruction
        $("#player-instruction-label").text("Instructions");
        $("#player-instructions").text("Click once to roll the dice. Click again to drop them in the box.");

        // display dice
        $("#my-dice").empty();
        var myImgTag = $("<img>");
        myImgTag.attr("class","dice");
        myImgTag.attr("src",boxDice["png2src"]);
        $("#my-dice").append(myImgTag);

        // display all usernames in the players score box table, with score and win empty td's
        for ( var j = playerArray.length - 1 ; j > -1 ; j-- ) {
            username = playerArray[j];
            var tableRow = $("<tr>");

            var userData = $("<td>");
            var user = "user-" + j;
            userData.attr("id",user);
            userData.text(username);
            tableRow.append(userData);

            var scoreData = $("<td>");
            var score = "score-" + j;
            scoreData.attr("id",score);
            tableRow.append(scoreData);

            var winData = $("<td>");
            var wins = "wins-" + j;
            winData.attr("id",wins);
            tableRow.append(winData);

            $("#table-header").after(tableRow);
        } // end for playerArray
    } // end openGame

    // throw dice returns the sum of the dice ---------------------------------
    var throwDice = function(num) {

        // change the message
        $("#player-instructions").text("Click on the numbers that equal the sum of the dice. Click the 'Next' button when you are done.");

        // show the "Check" button ("next" for moving to next toss/turn )
        $(".next").show();

        // calculate random dice numbers
        if (num === "two") {
            // display first dice
            var randomNum1 = Math.floor(Math.random() * 6) + 1;
            $("#dice1").empty();
            var myImgTag = $("<img>");
            myImgTag.attr("class","dice");
            var mySRC = boardDice[randomNum1];
            myImgTag.attr("src",mySRC);
            $("#dice1").append(myImgTag);
            console.log("DICE 1 = " + randomNum1);
            
            // display second dice
            var randomNum2 = Math.floor(Math.random() * 6) + 1;
            $("#dice2").empty();
            var myImgTag = $("<img>");
            myImgTag.attr("class","dice");
            var mySRC = boardDice[randomNum2];
            myImgTag.attr("src",mySRC);
            $("#dice2").append(myImgTag);
            console.log("DICE 2 = " + randomNum2);

            // get sum total of dice
            return diceTotal = randomNum1 + randomNum2;

        } else if (num === "one") {
            // display first dice
            var randomNum1 = Math.floor(Math.random() * 6) + 1;
            $("#dice1").empty();
            var myImgTag = $("<img>");
            myImgTag.attr("class","dice");
            var mySRC = boardDice[randomNum1];
            myImgTag.attr("src",mySRC);
            $("#dice1").append(myImgTag);
            console.log("DICE 1 = " + randomNum1);

            // get sum total of dice
            return diceTotal = randomNum1;

        } // end if else if

    } // end throw dice


    // GAME LOADS ======================================================

    start();


    // ON CLICK EVENTS =================================================

    // on event to get number of players selected from dropdown list <a> ------- DROPDOWN LIST
    $(document).on("click", "a", function() {
        // capture list selection, parseInt and change the display
        playerTotal = parseInt($(this).text());
        // fade-out start zone
        $(".start-zone").hide();
        // fade-in entry zone
        $(".entry-zone").fadeIn(2000);
        // set first player in message
        $(".message").text("Player " + playerTurn);
    });

    // capture username from button click, store in array, increment playerCount ------ NAME ENTRY
    $("#name-entry").click(function() {
        if ($("#username").val() !== "") {
            username = capitalize($("#username").val());
            playerArray.push(username);
            // remove username from input
            $("#username").val('');
            // increment counters
            playerCount++;
            if (playerCount === playerTotal) {
                openGame();
            } else {
                playerTurn++;
                $(".message").text("Player " + playerTurn);
            } // end else
        } // end if
    });
  
    // listener for 'enter' in username input ---------------------------- KEYPRESS
    $("#username").keypress(function(e) {
        if (e.which === 13 && $("#username").val() !== "") {
            username = capitalize($("#username").val());
            playerArray.push(username);
            $("#username").val('');
            // increment counters
            playerCount++;
            if (playerCount === playerTotal) {
                openGame();
            } else {
                playerTurn++;
                $(".message").text("Player " + playerTurn);
            }
        } // end if
    });
  
    // Function to capitalize usernames
    function capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }


    // Click to switch dice image files (toggle png to gif) ------------- DOCUMENT CLICK IMG
    $(document).on("click", "img", function() { 
        
        if (diceImageType === "png") {
            $("#my-dice").empty();
            var myImgTag = $("<img>");
            myImgTag.attr("class","dice");

            // determine which gif to get
            if (diceOption === "two" ) {
                var mySRC = "assets/images/dice2animation.gif";
            } else if (diceOption === "one" ) {
                var mySRC = "assets/images/dice1animation2.gif";
            } // end if
         
            myImgTag.attr("src",mySRC);
            $("#my-dice").append(myImgTag);
            diceImageType = "gif";
            $("#my-dice").blur();

        } else if (diceImageType === "gif") {
            $("#my-dice").empty();
            diceImageType = "empty";
            $("#my-dice").blur();

            // throw the dice (update the global diceTotal value)
            diceTotal = diceTotal + throwDice(diceOption);
            console.log("diceTotal (click on img) = " + diceTotal);

        } // end else if
    }); // end click on dice image


    // Click on a tab number ------------------------------------------  .COL.TAB
    $(".col.tab").click(function() {

        // get tabNum and add number to clickTotal
        tabNum = parseInt($(this).text());
        
        // get total of tabNums
        clickTotal = clickTotal + tabNum;
        console.log("clickTotal = " + clickTotal);

        // diceTotal was updated in previous event (IMG CLICK)
        // if clickTotal is not greater than diceTotal, colorize the selection
        if (clickTotal <= diceTotal) {
            $(this).css("background-color","brown");
            $(this).css("color","orange");
            // store the permissible tabNum value in the tabNumArray
            tabNumArray.push(tabNum);
            console.log("tabNumArray = " + tabNumArray);
        } // end if

    }); // end click on col.tab


    // Click on the next button to finish the toss/turn ------------------------
    $("#next-toss").click(function() {

        // test if clickTotal is same as diceTotal, if not...

        if (clickTotal !== diceTotal) {
            console.log("PLAYER TURN OVER");
            console.log("clickTotal (" + clickTotal + ") !== diceTotal (" + diceTotal + ")");
            // get score and post
            playerScore = 45 - prevClickTotal;
            console.log("playerScore = " + playerScore);
            var sourceNode = "#score-" + currentTurn;
            // $(sourceNode).text(playerScore);
            $("#score-0").text(playerScore);

            // present the user with a game summary

            // increment to next player index (currentTurn)
            currentTurn++;
            console.log(playerArray[currentTurn]);
            // open a new game

        } else {

        // is the clickTotal the same as the diceTotal?
        // if not, their turn is over. 
        // calculate their score (sum of all the tab numbers (45) minus the previous clickTotal)
        // start with the next player
        // if last player just played, then declare the winner, ask to continue with another game...

        // else ...

            // if 7, 8, 9 selected (in the tabNumArray) then change "diceOption" to "one".
            if ( tabNumArray.includes("7") && tabNumArray.includes("8") && tabNumArray.includes("9")) {
                diceOption = "one";
            } else {
                diceOption = "two";
            } // end if includes...
            
            // reset the display - hide, empty board items
            $(".next").hide();
            $("#dice1").empty();
            $("#dice2").empty();

            // reset dice image type
            diceImageType = "png";

            // store the clickTotal as the previous
            prevClickTotal = clickTotal;
            console.log("prevClickTotal = " + prevClickTotal);

            // reset the instructions box
            $("#player-instruction-label").text("Instructions");
            $("#player-instructions").text("Click once to roll the dice. Click again to drop them in the box.");

            // display dice
            $("#my-dice").empty();
            var myImgTag = $("<img>");
            myImgTag.attr("class","dice");

            if (diceOption === "two" ) {
                var mySRC = "assets/images/two-dice.png";
            } else {
                var mySRC = "assets/images/one-dice.png";
            } // end if
            myImgTag.attr("src",mySRC);
            $("#my-dice").append(myImgTag);
        } // end else
    });

}); // end document.ready
