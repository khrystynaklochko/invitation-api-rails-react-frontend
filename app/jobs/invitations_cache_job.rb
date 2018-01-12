class InvitationsCacheJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    invitations = Invitation.includes(:customer_lists)
    Rails.cache.fetch(Invitation.cache_key(invitations)) do
      invitations.to_json(include: customer_lists)
    end
  end
end
