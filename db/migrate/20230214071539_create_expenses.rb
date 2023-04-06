class CreateExpenses < ActiveRecord::Migration[6.0]
  def change
    create_table :expenses do |t|
      t.integer :user_id
      t.integer :invoice_id
      t.string :status
      t.text :description
      t.integer :amount
      t.string :document
      t.timestamps
    end
  end
end
