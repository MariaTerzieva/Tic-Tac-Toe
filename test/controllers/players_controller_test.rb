require 'test_helper'

class PlayersControllerTest < ActionController::TestCase
  test "should get draw" do
    get :draw
    assert_response :success
  end

  test "should get leaderboard" do
    get :leaderboard
    assert_response :success
    assert_not_nil assigns(:players)
  end

  test "should update winner's number of wins" do
    post :save, {winner: "David"}
    player = players(:david)
    assert_equal 11, player.number_of_wins
  end

  test "should save unknown winner in the database and set their number of wins to 1" do
    assert_difference('Player.count') do
      post :save, {winner: "Caleb"}
    end

    player = Player.find_by(name: "Caleb")
    assert_equal 1, player.number_of_wins
  end
end