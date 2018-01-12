class InvitationsController < ApplicationController
  before_action :find_invitation, only: [:show, :update, :destroy]

  # GET /invitations
  def index
    invitations = Invitation.includes(:customer_lists)
    json = Rails.cache.fetch(Invitation.cache_key(invitations)) do
      invitations.to_json(include: :customer_lists)
    end
    json_response(invitations)
  end

  # GET /invitations/1
  def show
    json_response(@invitation)
  end

  # POST /invitations
  def create
    @invitation = Invitation.create!(invitation_params)
    json_response(@invitation, :created)
  end

  # PATCH/PUT /invitations/1
  def update
    @invitation.update(invitation_params)
    json_response(@invitation)
  end

  # DELETE /invitations/1
  def destroy
    @invitation.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def find_invitation
      @invitation = Invitation.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def invitation_params
      params.require(:invitation).permit([:title, customer_lists_attributes: %I[id document _destroy]])
    end
end
