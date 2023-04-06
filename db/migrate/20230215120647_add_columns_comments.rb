class AddColumnsComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :expense_id, :integer
    add_column :comments, :text, :string 
    add_column :comments, :name, :string 
  end
end
