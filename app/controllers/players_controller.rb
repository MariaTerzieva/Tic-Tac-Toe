##
# This class represents the Players Controller which is responsible
# for saving or updating a player and their number of wins in the
# database, printing out the leaderboard and loading an appropriate
# page when there is no winner.

class PlayersController < ApplicationController

  ##
  # Searches for the player by name in the database. If there already
  # exists such player in the database, it increments the player's
  # number of wins. Otherwise it creates a new player in the database
  # with the given name and with number of wins equal to 1.

  def save
    player = Player.find_by(name: params[:winner])

    if player
      player.update(number_of_wins: player.number_of_wins.succ)
    else
      player = Player.new(name: params[:winner], number_of_wins: 1)
      player.save
    end
  end

  ##
  # Prints out all the players and their number of wins that exist in
  # the database in a descensding order.

  def leaderboard
    @players = Player.order(number_of_wins: :desc)
  end

  ##
  # Loads an appropriate page with message indicating that there is no
  # winner.

  def draw
  end
end