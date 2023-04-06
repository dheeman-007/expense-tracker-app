class ExpensesController < ApplicationController
    def addexpense
        @user_id=params[:id]
    end
    def createexpense
        @exp = Expense.new()
        @exp.user_id=params[:id]
        @exp.invoice_id=params[:invoice_id]
        @exp.status= "In queue"
        @exp.description=params[:description]
        @exp.amount=params[:amount]
        @exp.url=params[:url]
        response = checker(@exp.invoice_id)
        if(response['status'])
            @exp.save
            @message="success"
            render :addexpense
        else
            @message="invalid"
            render :addexpense
        end
    end
    def allexpenses
        @user_id = params[:id]
        @exps = Expense.where(user_id: params[:id])
    end
    def userexpenses
        @exps = Expense.where(user_id: params[:id])
        @user = User.find(params[:id])
    end
    def viewexpense
        @isAdmin= User.find(session[:user_id]).isAdmin
        if @isAdmin
            redirect_to "/expenses/adminviewexpense/#{params[:exp_id]}"
        else 
            redirect_to "/expenses/userviewexpense/#{params[:exp_id]}"
        end
    end
    def adminviewexpense
        @exp = Expense.find(params[:exp_id])
        @user_id = Expense.find(params[:exp_id]).user_id
        @username = User.find(@user_id).name
        @comments = Comment.where(expense_id: params[:exp_id])
        @isAdmin= User.find(@user_id).isAdmin
    end
    def userviewexpense
        @exp = Expense.find(params[:exp_id])
        @user_id = Expense.find(params[:exp_id]).user_id
        @username = User.find(@user_id).name
        @comments = Comment.where(expense_id: params[:exp_id])
        @isAdmin= User.find(@user_id).isAdmin
    end
    def addcomment
        @comment = Comment.new()
        @comment.expense_id = params[:exp_id]
        @comment.text = params[:text]
        if User.find(params[:user_id]).isAdmin
            @comment.name = "Admin"
            @user_id=Expense.find(params[:exp_id]).user_id
            @email_to=User.find(@user_id).email
            @invoice_id=Expense.find(params[:exp_id]).invoice_id
            @description=Expense.find(params[:exp_id]).description
            @amount=Expense.find(params[:exp_id]).amount
            @status=Expense.find(params[:exp_id]).amount
            ExpmailerMailer.send_comment_added_mail(@email_to).deliver_now
        else 
            @comment.name = User.find(params[:user_id]).name
        end
        @comment.save
        if User.find(params[:user_id]).isAdmin 
            redirect_to "/expenses/adminviewexpense/#{params[:exp_id]}"
        else
            redirect_to "/expenses/userviewexpense/#{params[:exp_id]}"
        end
    end
    def approve
        @expense=Expense.find(params[:exp_id])
        @expense.status= "Approved"
        @user_id=Expense.find(params[:exp_id]).user_id
        @email_to=User.find(@user_id).email
        @invoice_id=Expense.find(params[:exp_id]).invoice_id
        @description=Expense.find(params[:exp_id]).description
        @amount=Expense.find(params[:exp_id]).amount
        @status=Expense.find(params[:exp_id]).amount
        @expense.save
        ExpmailerMailer.send_approval_mail(@email_to).deliver_now
    end
    def reject
        @expense=Expense.find(params[:exp_id])
        @expense.status= "Rejected"
        @user_id=Expense.find(params[:exp_id]).user_id
        @email_to=User.find(@user_id).email
        @invoice_id=Expense.find(params[:exp_id]).invoice_id
        @description=Expense.find(params[:exp_id]).description
        @amount=Expense.find(params[:exp_id]).amount
        @status=Expense.find(params[:exp_id]).amount
        @expense.save
        ExpmailerMailer.send_rejection_mail(@email_to).deliver_now
        redirect_to "/expenses/adminviewexpense/#{params[:exp_id]}"
    end

    def viewdoc
        @vw=Expense.find(params[:exp_id])
    end
    def checker(invoice_id)
        require 'net/http'
        api_key ='b490bb80'
        uri='https://my.api.mockaroo.com/invoices.json'
        res=Net::HTTP.post URI('https://my.api.mockaroo.com/invoices.json'),{"invoice_id" => invoice_id}.to_json,'X-API-Key' => "b490bb80"
        return JSON.parse(res.body)
    end
end
