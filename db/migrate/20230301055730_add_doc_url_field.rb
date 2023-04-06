class AddDocUrlField < ActiveRecord::Migration[6.0]
  def change
    add_column :expenses, :url, :string
  end
end
