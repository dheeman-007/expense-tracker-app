class AddColumnDocument < ActiveRecord::Migration[6.0]
  def change
    add_column :expenses, :document, :binary
  end
end
