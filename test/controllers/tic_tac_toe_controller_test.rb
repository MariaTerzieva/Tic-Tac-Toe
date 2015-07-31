require 'test_helper'

class TicTacToeControllerTest < ActionController::TestCase
  test "should get init" do
    get :init
    assert_response :success

    assert_select '.container' do
      assert_select 'h1'
    end

    assert_select 'form' do
      assert_select 'div.field'
      assert_select '.button'
    end
  end

  test "should get index" do
    get :index
    assert_response :success

    assert_select '.container' do
      assert_select 'h1'
      assert_select '.button'
    end
  end

  test "should pass instance variables for use in view" do
    post :board, {player_x_name: "Mark", player_o_name: "Luke"}
    assert_not_nil assigns(:player_x_name)
    assert_not_nil assigns(:player_o_name)

    assert_select '.container' do
      assert_select 'h1'
      assert_select '.message'
      assert_select '.gameboard' do
        assert_select '.square'
      end
    end
      assert_select '.players'
  end
end