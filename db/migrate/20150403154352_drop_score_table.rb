class DropScoreTable < ActiveRecord::Migration
  def change
  	drop_table :score_tables
  end
end
