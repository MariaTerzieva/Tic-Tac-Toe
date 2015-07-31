$(document).ready(function() {

  /**
   * Defines the function that is going to control the game.
   */

  var tictactoe = function() {
    var BLANK = ' ',
        playerX = new Object,
        playerO = new Object;

    playerX.Name = $('.players').data('playerX');
    playerX.Sign = 'X';
    playerO.Name = $('.players').data('playerO');
    playerO.Sign = 'O';

    var curPlayer = playerX,
        moves = 0,
        board = [BLANK, BLANK, BLANK, BLANK, BLANK,
                 BLANK, BLANK, BLANK, BLANK];

    /**
     * Changes the content of the message on top of the gameboard.
     */

    var displayMessage = function(message) {
      $('.message').html(message);
    };

    /**
     * Swithes the player and displays their name on top of the
     * gameboard.
     */

    var switchPlayer = function() {
      curPlayer = (curPlayer === playerX) ? playerO : playerX;
      displayMessage('Current Player: ' + curPlayer.Name);
    };

    /**
     * Checks if the square that has been clicked on is available.
     * Returns true if it is. Returns false if it is not and displays
     * an appropriate message to indicate the player.
     */

    var isValidMove = function(index) {
      if (board[index] === BLANK) {
        return true;
      } else {
        displayMessage('Select a blank square');
        return false;
      }
    };

    /*
     * Puts the sign of the player in the corresponding square.
     * Remembers that it is no more available for further moves
     * and keeps track of the number of moves made until now.
     */

    var makeMove = function($square, index) {
      board[index] = curPlayer.Sign;
      $square.html(curPlayer.Sign);
      moves++;
    };

    /*
     * Checks if the game is over. If there is a winner, returns an array
     * of the corresponding winning squares. Returns true if there is draw
     * and false if the game is not over.
     */

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
        return true;
      } else {
        return false;
      }
    };

    /**
     * Checks if the signs on the board corresponding to the indices
     * that are given as elements of the parameter 'squares' are all
     * the same.
     */

    var allEqual = function(squares) {
      return ( board[squares[0]] === board[squares[1]] ) &&
             ( board[squares[0]] === board[squares[2]] ) &&
             ( board[squares[0]] !== BLANK );
    };

    /**
     * When the game is over if there is a winner, displays the
     * winning formation, sends the name of the winner via ajax
     * and redirects the player to the leaderboard page.
     * If the game is draw, redirects to the draw page.
     */

    var endGame = function(endFormation) {
      if($.isArray(endFormation)) {
        showWinFormation(endFormation);

        $.ajax({
          url: "save/?winner=" + curPlayer.Name,
          type: "post",
          success: function() {
            document.location = '/leaderboard';
          }
        });

      } else {
        document.location = '/draw';
      }
    };

    /**
     * Adds a class to highlight the winning formation.
     */

    var showWinFormation = function(formation) {
      $.each(formation, function(index, winPosition) {
        $('.square').eq(winPosition).addClass('winning-square');
      });
    };

    /**
     * Handles the logic of the game.
     */

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