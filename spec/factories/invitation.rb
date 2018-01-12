FactoryBot.define do
  factory :invitation do
    title { Faker::Lorem.word }
    longitude {}
    latitude {}
    range {}
    names {}
  end
end
