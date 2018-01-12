class AddAttachmentDocumentToCustomerLists < ActiveRecord::Migration[5.1]
  def self.up
    change_table :customer_lists do |t|
      t.attachment :document
    end
  end

  def self.down
    remove_attachment :customer_lists, :document
  end
end
