class ChangeDefaultForPlayersNumberOfWins < ActiveRecord::Migration
  def change
    change_column :players, :number_of_wins, :integer, default: 0
  end
end
