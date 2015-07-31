require 'test_helper'

class RoutesTest < ActionController::TestCase
  test "should route to init" do
    assert_routing '/init', { controller: "tic_tac_toe", action: "init" }
  end

  test "should route to board" do
    assert_routing({ method: 'post', path: '/board' },
      { controller: "tic_tac_toe", action: "board" })
  end

  test "shoud route to index as home page" do
    assert_routing '/', { controller: "tic_tac_toe", action: "index" }
  end

  test "should route to save" do
    assert_routing({ method: 'post', path: '/save' },
      { controller: "players", action: "save" })
  end

  test "should route to leaderboard" do
    assert_routing '/leaderboard', { controller: "players", action: "leaderboard" }
  end

  test "should route to draw" do
    assert_routing '/draw', { controller: "players", action: "draw" }
  end
end