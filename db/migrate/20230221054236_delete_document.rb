class DeleteDocument < ActiveRecord::Migration[6.0]
  def change
    remove_column:expenses, :document
  end
end
