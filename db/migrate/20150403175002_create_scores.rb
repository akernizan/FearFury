class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
    	t.string   :player
	    t.integer  :heights
	    t.integer  :small
	    t.integer  :dark
	    t.integer  :total

      t.timestamps null: false
    end
  end
end
