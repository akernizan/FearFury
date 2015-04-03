class AddColumnsToScores < ActiveRecord::Migration
  def change
    add_column :scores, :player, :string	
	  add_column :scores, :heights, :integer
	  add_column :scores, :small, :integer
	  add_column :scores, :dark, :integer
	  add_column :scores, :total, :integer

    add_column :scores, :created_at, :datetime, null: false
    add_column :scores, :updated_at, :datetime, null: false
  end
end
