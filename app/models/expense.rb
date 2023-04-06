class Expense < ApplicationRecord
    belongs_to :user
    has_many :comments
    # mount_uploader :document, DocumentUploader
end
