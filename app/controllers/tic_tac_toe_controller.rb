##
# This class represents the Tic Tac Toe Controller which is responsible
# for displaying the tic tac toe board, displating the index page of the
# tic tac toe game and the page where the players submit their names.

class TicTacToeController < ApplicationController

  ##
  # Passes the names of the players for use in the view and displays the
  # tic tac toe board

  def board
    @player_x_name = params[:player_x_name]
    @player_o_name = params[:player_o_name]
  end

  ##
  # Displays the home page

  def index
  end

  ##
  # Displays a page with a form where the players fill in their names

  def init
  end
end