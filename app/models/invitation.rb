class Invitation < ApplicationRecord
  validates :title, presence: true
  has_many :customer_lists, dependent: :destroy
  accepts_nested_attributes_for :customer_lists, allow_destroy: true
  after_save :create_json_cache

  def as_json(_opts = {})
    {
      id: id,
      title: title,
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

  def self.cache_key(invitations)
    {
      serializer: 'invitations',
      stat_record: invitations.maximum(:updated_at)
    }
  end

  def create_json_cache
    InvitationsCacheJob.perform_later
  end

end
