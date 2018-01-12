class CreateCustomerLists < ActiveRecord::Migration[5.1]
  def change
    create_table :customer_lists do |t|
      t.references :invitation, foreign_key: true
      t.timestamps
    end
  end
end
