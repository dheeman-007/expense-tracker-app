class UsersController < ApplicationController
    def signin
        session[:user_id] = nil
    end
    def create
        session[:user_id] = nil
        @user = User.find_by(email: params[:email])
        if @user.present? && @user.password==params[:password]
            session[:user_id] = @user.id
            if @user.isAdmin
                @isAdmin=true
                @user_id=@user.id
                @message="successful"
                render :signin
                # redirect_to "/users/adminpage"
            else 
                @isAdmin=false
                @user_id=@user.id
                @message="successful"
                render :signin
                # redirect_to "/users/dashboard/#{@user.id}"
            end
            
        else
            @message="unsuccessful"
            render :signin
        end
    end
    def dashboard
        @user = User.find(params[:id])
    end
    def adminpage
        @users = User.all
        # render json: @users, status:200
    end
    def edit
        @emp =User.find(params[:id])
    end
    def update
        @emp =User.find(params[:id])
        @emp.dept_name=params[:dept_name]
        @emp.status=params[:status]
        @emp.email=params[:email]
        @emp.password=params[:password]
        @emp.name=params[:name]
        @done=false
        if @emp.save
            @done=true
            render :edit
        else
            @done=false
            render :edit
        end
    end
    def delete
        @emp =User.find(params[:id])
        if @emp.destroy
            @message="successful"
        else
            @message="unsuccessfull"
        end
        
    end
    def profile
        @user =User.find(params[:id])
    end
    def adduser
    end
    def createuser
        @emp = User.new()
        @emp.dept_name=params[:dept_name]
        @emp.status=params[:status]
        @emp.email=params[:email]
        @emp.password=params[:password]
        @emp.name=params[:name]
        @emp.isAdmin=false
        @done=false
        if @emp.save
            @done=true
            render :adduser
        else 
            @done=false
            render :adduser
        end
    end
    def search
        redirect_to "/users/searcheduser/#{params[:name]}"
    end
    def searcheduser
        @users = User.where("name LIKE ?","#{params[:name]}%" )
    end
end