# json.user_id @user.id

json.array! @users.each do |user|
json.extract! user, :id,:email, :name, :dept_name, :status, :isAdmin
# json.Admin user.isAdmin
end
