require 'rails_helper'

RSpec.describe 'Invitations API', type: :request do

  let!(:invitations) { create_list(:invitation, 5) }
  let(:invitation_id) { invitations.first.id }
  describe 'GET /invitations' do

    before { get '/invitations' }

    it 'should return invitations' do
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
    end

    it 'should return 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /invitations/:invitation_id' do
    before { get "/invitations/#{invitation_id}" }

    context 'record exists' do
      it 'shoud return invitation' do
        expect(json).not_to be_empty
        expect(json['title']).to eq(invitations.first.title)
      end

      it 'returns status 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'record does not exist' do
      let(:invitation_id) { 100 }

      it 'should return 404' do
        expect(response).to have_http_status(404)
      end

      it 'should return "Unable to find"' do
        expect(response.body).to match(/Couldn't find Invitation with 'id'=100/)
      end
    end
  end

  describe 'POST /invitations' do
    let (:file) {  Rack::Test::UploadedFile.new("#{Rails.root}/spec/files/gistfile1.txt", 'text/plain') }
    let (:invalid_file) { Rack::Test::UploadedFile.new("#{Rails.root}/spec/files/Apps.jpg", 'image/jpeg') }
    let(:attributes) { { invitation: { title: 'First invitation', customer_lists_attributes: { "0": {document: file } } } } }
    let(:invalid_attributes ) { { invitation: { title: 'X', customer_lists_attributes: { "0": {document: invalid_file } } } } }

    context 'request is valid' do
      before { post '/invitations', params: attributes }

      it 'should create invitation' do
        expect(json['title']).to eq('First invitation')
      end

      it 'should return 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'request is invalid' do
      before { post '/invitations', params: { invitation: {  title: '' } } }

      it 'should return 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Title can't be blank/)
      end
    end

    context 'file has invalid format' do
      before { post "/invitations", params: invalid_attributes }

      it 'should return 204' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Customer lists document content type invalid format, Customer lists document invalid format/)
      end
    end
  end

  describe 'PUT /invitations/:id' do
    let (:file) { Rack::Test::UploadedFile.new("#{Rails.root}/spec/files/gistfile1.txt", 'text/plain') }
    let(:attributes) { { invitation: { title: 'XX', screens_attributes: { "0": {document: file } } } } }

    context 'record exists' do
      before { put "/invitations/#{invitation_id}", params: attributes }

      it 'should update the record' do
          expect(json['title']).to eq('XX')
      end

      it 'should return 204' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'DELETE /invitations/:invitation_id' do
    before { delete "/invitations/#{invitation_id}" }

    it 'should return 204' do
      expect(response).to have_http_status(204)
    end
  end
end
