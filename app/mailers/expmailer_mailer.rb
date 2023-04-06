class ExpmailerMailer < ApplicationMailer
    def send_comment_added_mail(email_to)
        @email_to=email_to
        mail(to: "#{email_to}",from:"dheemanadmn@gmail.com",subject:"Comment Added",message:"Comment Added")
    end
    def send_approval_mail(email_to)
        @email_to=email_to
        mail(to: "#{email_to}",from:"dheemanadmn@gmail.com",subject:"Expense Approved",message:"Comment Added")
    end
    def send_rejection_mail(email_to)
        @email_to=email_to
        mail(to: "#{email_to}",from:"dheemanadmn@gmail.com",subject:"Expense Rejected",message:"Comment Added")
    end
end
