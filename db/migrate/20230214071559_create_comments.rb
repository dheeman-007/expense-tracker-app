class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.integer :expense_id
      t.string :text
      t.string :name
      t.timestamps
    end
  end
end
