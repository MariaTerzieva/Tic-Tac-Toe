class TicTacToeController < ApplicationController

  def board
  	@player_x_name = params[:player_x_name]
  	@player_o_name = params[:player_o_name]
  end

  def index
  end

  def init
  end
end