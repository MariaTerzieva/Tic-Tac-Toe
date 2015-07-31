require 'test_helper'

class PlayerTest < ActiveSupport::TestCase
  def setup
    @player = Player.new(name: "Maria")
    @player.save
  end

  def teardown
    @player.destroy
  end

  test "default number of wins is zero" do
    assert_equal 0, @player.number_of_wins
  end

  test "id should not be nil" do
    assert_not_nil @player.id
  end
end