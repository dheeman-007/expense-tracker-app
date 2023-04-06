# json.extract! @exp, :user_id,:invoice_id,:status,:description,:amount
json.comments do
    json.array! @comments.each do |cmt|
        json.extract! cmt, :name,:text
    end
    end
json.extract! @exp, :id,:invoice_id,:status,:description,:amount,:url
json.name @username
json.user_id @user_id