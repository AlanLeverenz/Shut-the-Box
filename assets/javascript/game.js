$(document).ready(function() { 


    // GLOBAL VARIABLES WHEN LOADING THE URL =========================

    var playerCount = 0;
    var playerTotal = 0;
    var playerScore = 0;
    var playerTurn = 1;
    var currentTurn = 0;
    var diceTotal = 0;
    var clickTotal = 0;
    var prevClickTotal = 0;
    var tabNum = 0;
    var playerArray = [];
    var scoreArray = [];
    var username = '';
    var diceImageType = "png";
    var diceOption = "two";
    var status = "new-players";

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

    // game start upon loading
    var start = function() {
        $(".open-box").hide();
        $(".entry-zone").hide();
        $(".player-zone").hide(); 
        $(".start-zone").hide();
        $(".next").hide();
        $(".start-zone").fadeIn(5000);
        playerCount = 0;
        playerTotal = 0;
        playerScore = 0;
        currentTurn = 0;
        tabNum = 0;
        diceTotal = 0;
        clickTotal = 0;
        prevClickTotal = 0;
        playerArray = [];
        tabNumArray = [];
        scoreArray = [];
        username = '';
        diceImageType = "png";
        diceOption = "two";
        status = "new-players";
    }

    // open the game board after new player entries.
    // starting point for new game for next turn or repeat game with same players
    var openGame = function() {

        // initialize variables local to the player
        tabNum = 0;
        diceTotal = 0;
        clickTotal = 0;
        prevClickTotal = 0;
        tabNumArray = [];

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

        // setup score box if game has been loaded (new set of players)
        if (status === "new-players") {
            setupScoreBox();
        } // end if 

    } // end openGame


    // throw dice returns the sum of the dice ---------------------------------
    var throwDice = function(numDice) {

        // change the message
        $("#player-instructions").text("Click on the numbers that equal the sum of the dice. Click the 'Next' button when you are done.");

        // show the "Check" button ("next" for moving to next toss/turn )
        $(".next").show();

        // show the dice1 and dice2
        $("#dice1").show();
        $("#dice2").show();

        // calculate random dice numbers
        if (numDice === "two") {
            // display first dice
            var randomNum1 = Math.floor(Math.random() * 6) + 1;
            $("#dice1").empty();
            var myImgTag = $("<img>");
            myImgTag.attr("class","dice");
            var mySRC = boardDice[randomNum1];
            myImgTag.attr("src",mySRC);
            $("#dice1").append(myImgTag);
            
            // display second dice
            var randomNum2 = Math.floor(Math.random() * 6) + 1;
            $("#dice2").empty();
            var myImgTag = $("<img>");
            myImgTag.attr("class","dice");
            var mySRC = boardDice[randomNum2];
            myImgTag.attr("src",mySRC);
            $("#dice2").append(myImgTag);

            // get sum total of dice
            return diceTotal = randomNum1 + randomNum2;

        } else if (numDice === "one") {
            // display first dice
            var randomNum1 = Math.floor(Math.random() * 6) + 1;
            $("#dice1").empty();
            var myImgTag = $("<img>");
            myImgTag.attr("class","dice");
            var mySRC = boardDice[randomNum1];
            myImgTag.attr("src",mySRC);
            $("#dice1").append(myImgTag);

            // get sum total of dice
            return diceTotal = randomNum1;

        } // end if else if
    } // end throw dice


    // display new usernames in the players score box table --------------------
    // with score and win empty td's
    var setupScoreBox = function () {

        for ( var j = playerArray.length - 1 ; j > -1 ; j-- ) {
            username = playerArray[j];
            var tableRow = $("<tr>");

            var userData = $("<td>");
            // var user = "user";
            var user = "user-" + j;
            userData.attr("id",user);
            userData.text(username);
            tableRow.append(userData);

            var scoreData = $("<td>");
            // var score = "score";
            var score = "score-" + j;
            scoreData.attr("id",score);
            tableRow.append(scoreData);

            var winData = $("<td>");
            // var wins = "wins";
            var wins = "wins-" + j;
            winData.attr("id",wins);
            winData.text("0");
            tableRow.append(winData);

            $("#table-header").after(tableRow);

        } // end for playerArray
    } // end setupScoreBox function
    

    // NEW TOSS ---------------------------------------------------
    var continueTossing = function() {

        // reset the display - hide, empty board items
        $(".next").hide();
        $("#dice1").empty();
        $("#dice2").empty();

        // reset dice image type
        diceImageType = "png";

        // store the clickTotal as the previous
        prevClickTotal = clickTotal;

        // reset the instructions box
        $("#player-instruction-label").text("Instructions");
        $("#player-instructions").text("You know how to click on the dice to roll and throw. Good luck!");

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

    } // end continueTossing


    // function for determining game winning player (lowest score) ------ Winner
    function winningPlayer (scoreArr) {
        var lowIndex,minIndex = 0;
        var lowScore, minScore = parseInt(scoreArr[0]); 
        for ( var i = 0 ; i < scoreArr.length - 1 ; i++ ) {
            console.log(i + ">>>>>");
            for ( var j = i + 1 ; j < scoreArr.length ; j++ ) {
                console.log(j + "-----")
                // compare the i score to each other score (paired comparison)
                if (lowScore < parseInt(scoreArr[j])) {
                    console.log(lowScore + " < " + scoreArr[j]);
                    lowScore = parseInt(scoreArr[i]);
                    lowIndex = i; // lower number is at the 'i' index
                    console.log("lowScore = " + lowScore);
                    console.log("lowIndex = " + lowIndex);
                } else {
                    lowScore = parseInt(scoreArr[j]);
                    lowIndex = j; // reassign index to next array item
                    console.log("else lowScore = " + lowScore);
                    console.log("lowIndex = " + j);
                }
                // see if the pair's lower score should replace current minimum score
                if (lowScore < minScore) {
                    minScore = lowScore;
                    minIndex = lowIndex; // reassign index to next array item
                    console.log("reset the minScore = " + minScore);
                    console.log("minIndex = " + j);
                }
            } // end J loop
            } // end for 
        console.log(scoreArr);
        console.log("WINNING INDEX: " + minIndex)
        console.log("WINNING SCORE: " + scoreArr[minIndex]);
        return minIndex;
    } // end winningPlayer function

    // check for a tie function ----------------------------- EDIT HERE
    // could have a tie with higher scores. only compare top two best scores.
    function checkForTie (myArr) {
        for ( i=0 ; i < myArr.length ; i++ ) {
            for (j=i+1 ; j < myArr.length ; j++ ) {
                if (myArr[i] === myArr[j]) {
                return true;
                } // end if
            } // end for
        } // end for
        return false;
    } // end function

    // Initial function called when loading =============== GAME START WHEN PAGE LOADED

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


    // Click to switch dice image files (toggle png to gif) ---------- DOCUMENT CLICK IMG
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
            diceImageType = "png";
            $("#my-dice").blur();

            // throw the dice (update the global diceTotal value)
            diceTotal = diceTotal + throwDice(diceOption);

        } // end else if
    }); // end click on dice image


    // Click on a tab number ------------------------------------------  .COL.TAB
    $(".col.tab").click(function() {

        // get tabNum and add number to clickTotal
        tabNum = parseInt($(this).text());
        
        // update of total of clicked tabNums, but only if <= diceTotal
        if (clickTotal + tabNum <= diceTotal) {
            clickTotal = clickTotal + tabNum;
            $(this).css({"background-color":"brown","color":"orange"});
            // store the permissible tabNum value in the tabNumArray
            tabNumArray.push(tabNum);
        } // end if
    }); // end click on col.tab


    // Click on the next button to finish the toss/turn ------------------TURN ENDED, NEXT ACTION
    $("#next-toss").click(function() {

        if (status === "new-turn" ) {         // =====> SAME GAME, NEXT PLAYER

            // empty current-turn elements and hide Next button
            $("#current-turn").empty();
            $(".next").hide();
            // reset all tabs to original background color
            $(".tab").css({"background-color": "moccasin",
            "color": "black"});

            // reset status
            status = "play";

            // openGame function
            openGame();

        } else if ( status === "new-game" ) {   // ======> NEW GAME, RESET TO PLAYER 1
            // reset to player 1
            currentTurn = 0;
            // empty current-turn elements and hide Next button
            $("#current-turn").empty();
            $(".next").hide();
            // reset all tabs to original background color
            $(".tab").css({"background-color": "moccasin",
            "color": "black"});

            // reset the scores
            for (i = 0 ; i < playerArray.length ; i++ ) {
            var setUserScore = $("[id=score-" + i + "]");
            setUserScore.text('');
            } // end for

            // reset status
            status = "play";

            openGame();
         
        } // end if new-game

        // test if SHUT THE BOX  ==========================> CHANGE STATUS FOR NEW GAME
        else if ( (tabNumArray.length === 9) && (diceTotal === clickTotal) ) {

            // present the user with their game score and instructions
            $("#player-instruction-label").text("Wow! Congrats!");
            $("#player-instructions").text("Holy Cow! You did it! You shut the game! Click the 'Next' button to start a new game.");

            // push score into scoreArray
            scoreArray.push(playerScore);

            // update wins
            var setUserWins = $("[id=wins-" + currentTurn + "]");
            var wins = parseInt(setUserWins.text());
            wins++;
            setUserWins.text(wins);

            // hide the dice1 and dice2
            $("#dice1").hide();
            $("#dice2").hide();

            // fade open and shut boxes
            $(".open-box").hide();
            $(".shut-box").fadeIn(3000);
            $(".shut-box").hide();
            $(".open-box").fadeIn(3000);

            $("#next-toss").show();

            // change status to new-game for next button click
            status = "new-game";

        } // end if shut the box


        // test if clickTotal is same as diceTotal, if not, summarize and set status to "new-turn"
        else if (clickTotal !== diceTotal) {

            // get score and post
            playerScore = 45 - prevClickTotal;
            var setUserScore = $("[id=score-" + currentTurn + "]");
            setUserScore.text(playerScore);

            // push score into scoreArray
            scoreArray.push(playerScore);

            // hide the dice1 and dice2
            $("#dice1").hide();
            $("#dice2").hide();

            // reset the tabNumArray
            tabNumArray = [];

            // increment to next player index (currentTurn)
            currentTurn++;

            // present the user with their game score and instructions
            $("#player-instruction-label").text("Your score: " + playerScore);
            $("#player-instructions").text("Good try! Click the 'Next' button for " + playerArray[currentTurn] + " to have a turn."); 

            // check if no more players, then process end-of-game messages, etc.
            if (currentTurn >= playerArray.length) {
                // if more than one player in the game, find out the winner
                if ( playerArray.length > 1 ) {

                    // first, let's check for a tie
                    var tie = checkForTie(scoreArray);
                    if ( tie == true ) {

                        $("#player-instruction-label").text("Looks like a tie!");
                        $("#player-instructions").text("Maybe next time we'll have a winner. Click the 'Next' button to start a new game.");

                    } else {
                    // now we can see who won
                    var winIndex = winningPlayer(scoreArray);
                    console.log("WINNING INDEX = " + winIndex);

                    // update wins
                    var setUserWins = $("[id=wins-" + winIndex + "]");
                    var wins = parseInt(setUserWins.text());
                    wins++;
                    setUserWins.text(wins);

                    var winner = playerArray[winIndex];

                    $("#player-instruction-label").text("Congrats to " + winner + "!");
                    $("#player-instructions").text("Hope you all had fun. Click the 'Next' button to start a new game."); 

                    } // end else

                } // end if more than one player

                // change status to new-game
                status = "new-game";
            } // end if no more players

            else {  // if other players, then continue with a new turn
                status = "new-turn";
            } // end else

        } else { // if exception with 7, 8, 9 selected, switch to one dice.

            // if 7, 8, 9 selected (in the tabNumArray) then change "diceOption" to "one".
            if ( tabNumArray.includes("7") && tabNumArray.includes("8") && tabNumArray.includes("9")) {
                diceOption = "one";
            } else {
                diceOption = "two";
            } // end if includes...
            
            // setup the game board for another throw of the dice (same player)
            continueTossing();

        } // end else
    }); // click on Next button

}); // end document.ready
