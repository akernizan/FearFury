class CreateScoreTable < ActiveRecord::Migration
  def change
    create_table :score_tables do |t|
    	t.string   :player
	    t.integer  :heights
	    t.integer  :small
	    t.integer  :dark
	    t.integer  :total

	    t.timestamps null: false

    end
  end
end
