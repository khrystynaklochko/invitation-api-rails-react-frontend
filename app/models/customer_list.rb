class CustomerList < ApplicationRecord
  belongs_to :invitation, inverse_of: :customer_lists, touch: true
  has_attached_file :document
  validates_attachment_presence :document
  validates_attachment :document, content_type: { content_type: 'text/plain',
                                                  message: 'invalid format'},
                                                  size: { in: 0..5.megabytes,
                                                          message: :file_too_large },
                        path: ":rails_root/public/system/:attachment/:id/:filename",
                        url: "/system/:attachment/:id/:filename"


  def file_contents
     Paperclip.io_adapters.for(document).read
   end

end
