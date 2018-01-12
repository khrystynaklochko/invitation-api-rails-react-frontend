FactoryBot.define do
  factory :customer_list do
    invitation
    document { File.new("#{Rails.root}/spec/files/gistfile1.txt") }
  end
end
