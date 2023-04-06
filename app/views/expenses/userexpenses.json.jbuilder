
json.array! @exps.each do |exp|
json.extract! exp, :id,:invoice_id,:status, :description, :amount
json.name @user.name

end
