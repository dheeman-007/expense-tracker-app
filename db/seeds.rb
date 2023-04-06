# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# t.string :dept_name
t.string "dept_name"
    t.string "status"
    t.string "email"
    t.string "password"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "isAdmin"

# user= User.create(
#     status: "employee",
#     email: "dd@gmail.com",
#     password: "1234",
#     name: "dheeman",
#     isAdmin: true
# )