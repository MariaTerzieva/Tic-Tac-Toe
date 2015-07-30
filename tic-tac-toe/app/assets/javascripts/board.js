$(document).ready(function() {
  var tictactoe = function() {
    // Constants
    var BLANK = ' ';
    var playerX = new Object;
    var playerO = new Object;
    playerX.Name = $('.players').data('playerX');
    playerX.Sign = 'X';
    playerO.Name = $('.players').data('playerO');
    playerO.Sign = 'O';

    var curPlayer = playerX,
        moves = 0,
        board = [BLANK, BLANK, BLANK, BLANK, BLANK, 
                 BLANK, BLANK, BLANK, BLANK];

    // for changing the message on top of the board
    var displayMessage = function(message) {
      $('.message').html(message);
    };

    var switchPlayer = function() {
      curPlayer = (curPlayer === playerX) ? playerO : playerX;
      displayMessage('Current Player: ' + curPlayer.Name);
    };

    // check if the square is available
    var isValidMove = function(index) {
      if (board[index] === BLANK) {
        return true;
      } else {
        displayMessage('Select a blank square');
        return false;
      }
    };

    var makeMove = function($square, index) {
      board[index] = curPlayer.Sign;
      $square.html(curPlayer.Sign);
      moves++;
    };

    // Check if the game is over. If a player has won, return the 3 squares
    // on which the win occurred as an array. If the game is a draw, return
    // true; if the game is not over, return false
    var gameOver = function() {
      var winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
                             [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
          winIndex = -1;
      $.each(winCombinations, function(index, winCombination) {
        if(allEqual(winCombination)){
          winIndex = index;
          return false;
        }
      });
      if(winIndex !== -1) {
        return winCombinations[winIndex];
      } else if (moves === 9) {
        return true; // Draw
      } else {
        return false;
      }
    };

    // Check if the signs in the 3 board squares are the same (that is, 
    // if they are all X or all O)
    var allEqual = function(squares) {
      return ( board[squares[0]] === board[squares[1]] ) &&
             ( board[squares[0]] === board[squares[2]] ) &&
             ( board[squares[0]] !== BLANK );
    };

    // Handle the end of the game by setting and displaying an appropriate
    // message (including the winning formation, if one exists), then
    // allow the user to play again
    var endGame = function(endFormation) {
      var endMessage;

      if($.isArray(endFormation)) {
        endMessage = 'Game Over. Player ' + curPlayer.Name + ' Wins';
        showWinFormation(endFormation);
        $.ajax({
          url: "save/?winner=" + curPlayer.Name,
          type: "post",
          success: function() {
            document.location = '/leaderboard';
          }
        });
      } else {
        endMessage = 'Game Over. Draw Game';
        document.location = '/draw';
      }
    };

    // Add a class to highlight the squares that form a winning formation
    var showWinFormation = function(formation) {
      $.each(formation, function(index, winPosition) {
        $('.square').eq(winPosition).addClass('winning-square');
      });
    };

    // Main controller to run the game
    var play = function($square) {
      var index = $square.attr('id');

      if(isValidMove(index)) {
        makeMove($square, index);
        var winningFormation = gameOver();

        (winningFormation) ? endGame(winningFormation) : switchPlayer();
      }
    };

    return { play: play };
  }();

  $('.gameboard').on('click', '.square', function() {
    tictactoe.play($(this));
  });
});