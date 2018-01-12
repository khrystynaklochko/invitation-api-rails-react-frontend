require 'rails_helper'

RSpec.describe Invitation, type: :model do
  it { should have_many(:customer_lists).dependent(:destroy) }
  it { should validate_presence_of(:title) }
end
