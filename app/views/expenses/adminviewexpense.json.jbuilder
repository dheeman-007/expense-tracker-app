# json.extract! @exp, :user_id,:invoice_id,:status,:description,:amount
json.comments do
# json.eee 1

json.array! @comments.each do |cmt|
    json.extract! cmt, :name,:text
end
# json.expense @exp.invoice_id
end
json.extract! @exp, :id,:invoice_id,:status,:description,:amount,:url
json.name @username
json.user_id @user_id
# json.partial! '/app/views/expenses/adm', comments: @comments