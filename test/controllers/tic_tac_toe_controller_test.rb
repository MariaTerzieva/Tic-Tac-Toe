require 'test_helper'

class TicTacToeControllerTest < ActionController::TestCase
  test "should get init" do
    get :init
    assert_response :success
  end

  test "should get index" do
    get :index
    assert_response :success
  end

  test "should pass instance variables for use in view" do
    post :board, {player_x_name: "Mark", player_o_name: "Luke"}
    assert_not_nil assigns(:player_x_name)
    assert_not_nil assigns(:player_o_name)
  end
end