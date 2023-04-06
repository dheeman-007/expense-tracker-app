class RemoveColumnDocument < ActiveRecord::Migration[6.0]
  def change
    remove_column:expenses, :document, :string 
  end
end
