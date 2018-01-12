class Invitation < ApplicationRecord
  include Location

  validates :title, presence: true
  has_many :customer_lists, dependent: :destroy
  accepts_nested_attributes_for :customer_lists, allow_destroy: true
  after_create :assign_location
  after_save :create_json_cache
  after_commit :find_customers

  OFFICE_LOCATION = { lon: -6.257664, lat: 53.339428,}.freeze
  OFFICE_RADIUS = 100.freeze


  def as_json(_opts = {})
    {
      id: id,
      title: title,
      longitude: longitude,
      latitude: latitude,
      range: range,
      names: names,
      errors: errors,
      customer_lists: customer_lists.map do |f|
        {
          url: f.document.url,
          name: f.document_file_name,
          id: f.id
        }
      end
    }
  end

  def office_location
    { latitude: latitude, longitude: longitude }
  end

  def find_customers
    names = []
    self.customer_lists.each do |customer_list|
       names << closest(customer_list.get_customers(customer_list.document.path), office_location, range)
    end
    self.update_attribute(:names, names) unless destroyed?
  end

  def self.cache_key(invitations)
    {
      serializer: 'invitations',
      stat_record: invitations.maximum(:updated_at)
    }
  end

  def create_json_cache
    InvitationsCacheJob.perform_later
  end

  private

  def assign_location
     self.update_attributes( longitude: OFFICE_LOCATION[:lon],
                             latitude:  OFFICE_LOCATION[:lat],
                             range: OFFICE_RADIUS,
                             names: 'none') unless destroyed?
  end

end
