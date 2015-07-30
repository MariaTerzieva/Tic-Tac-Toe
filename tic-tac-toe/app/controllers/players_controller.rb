class PlayersController < ApplicationController
  def save
    player = Player.find_by(name: params[:winner])

    if player
      player.update(number_of_wins: player.number_of_wins.succ)
    else
      player = Player.new(name: params[:winner], number_of_wins: 1)
      player.save
    end
  end

  def leaderboard
    @players = Player.all
  end

  def draw
  end
end