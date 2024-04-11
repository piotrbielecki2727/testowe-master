class CertificatesController < ApplicationController
  before_action :set_certificate, only: [:show, :update, :destroy]

  # GET /certificates
  # GET /certificates.json
  def index
    @certificates = Certificate.where(user_id: params[:userId])
                               .paginate(page: params[:page], per_page: params[:per_page])
    render json: @certificates
  end

  # GET /certificates/1
  # GET /certificates/1.json
  def show
    @certificate = Certificate.joins(:user).select('certificates.*, users.email').find(params[:id])
    render json: @certificate
  end

  # POST /certificates
  # POST /certificates.json
  def create
    @certificate = Certificate.new(certificate_params)

    if @certificate.save
      render json: @certificate, status: :created, location: @certificate
    else
      render json: @certificate.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /certificates/1
  # PATCH/PUT /certificates/1.json
  def update
    if @certificate.update(certificate_params)
      render json: @certificate
    else
      render json: @certificate.errors, status: :unprocessable_entity
    end
  end

  # DELETE /certificates/1
  # DELETE /certificates/1.json
  def destroy
    @certificate.destroy
  end


  def check_certificate
    user_id = params[:user_id]
    name = params[:name]
    certificate = Certificate.where(user_id: user_id, name: name).first
  
    if certificate
      render json: { exists: true }, status: :ok
    else
      render json: { exists: false }, status: :ok
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_certificate
      @certificate = Certificate.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def certificate_params
      params.require(:certificate).permit(:name, :description, :user_id)
    end
end