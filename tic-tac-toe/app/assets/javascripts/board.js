$(document).ready(function() {
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

    var displayMessage = function(message) {
      $('.message').html(message);
    };

    var switchPlayer = function() {
      curPlayer = (curPlayer === playerX) ? playerO : playerX;
      displayMessage('Current Player: ' + curPlayer.Name);
    };

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

    var allEqual = function(squares) {
      return ( board[squares[0]] === board[squares[1]] ) &&
             ( board[squares[0]] === board[squares[2]] ) &&
             ( board[squares[0]] !== BLANK );
    };

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

    var showWinFormation = function(formation) {
      $.each(formation, function(index, winPosition) {
        $('.square').eq(winPosition).addClass('winning-square');
      });
    };

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