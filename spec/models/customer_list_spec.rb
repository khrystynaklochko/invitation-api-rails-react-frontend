require 'rails_helper'

RSpec.describe CustomerList, type: :model do
  it { should belong_to(:invitation) }
  it { should have_attached_file(:document) }
  it { should validate_attachment_presence(:document) }
  it { should validate_attachment_content_type(:document).allowing('text/plain').rejecting('image/png', 'image/gif') }
  it { should validate_attachment_size(:document).less_than(5.megabytes) }
end
