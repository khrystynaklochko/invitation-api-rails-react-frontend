class CreateInvitations < ActiveRecord::Migration[5.1]
  def change
    create_table :invitations do |t|
      t.string :title
      t.float :latitude
      t.float :longitude
      t.integer :range

      t.timestamps
    end
  end
end
