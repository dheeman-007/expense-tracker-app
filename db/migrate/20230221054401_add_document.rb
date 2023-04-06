class AddDocument < ActiveRecord::Migration[6.0]
  def change
    add_column :expenses, :document, :string
  end
end
