class CreateInvitations < ActiveRecord::Migration[5.1]
  def change
    create_table :invitations do |t|
      t.string :title
      t.float :latitude, default: 0
      t.float :longitude, default: 0
      t.integer :range, default: 0

      t.timestamps
    end
  end
end
