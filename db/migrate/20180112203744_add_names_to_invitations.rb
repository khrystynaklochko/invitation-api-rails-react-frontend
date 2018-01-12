class AddNamesToInvitations < ActiveRecord::Migration[5.1]
  def change
    add_column :invitations, :names, :string
  end
end
