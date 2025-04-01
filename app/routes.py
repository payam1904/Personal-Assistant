from flask import render_template, Blueprint, redirect, url_for, flash
from  .forms import SignupForm, LoginForm
from flask_login import login_required, current_user, logout_user, login_user
from .models import User
from app import database

core = Blueprint('core', __name__)

@core.route('/')
def index():
    return render_template('index.html')

@core.route('/signup_page', methods=['GET', 'POST'])
def signup():
    signup_form = SignupForm()
    
    if signup_form.validate_on_submit():
        user = User.query.filter_by(email=signup_form.email.data).first()
        # username = User.query.filter_by(username=signup_form.username.data).first()
        if user:
            flash('This email address has already been registered!', 'error')
            return redirect(url_for('core.signup'))
        # elif username:
        #     flash('This username is taken!, Try another one!')
        #     return redirect(url_for('core.signup'))

        
        new_user = User(
            first_name=signup_form.first_name.data,
            last_name=signup_form.last_name.data,
            date_of_birth=signup_form.date_of_birth.data,
            phone_number=signup_form.phone_number.data,
            email=signup_form.email.data,
            password=signup_form.password.data
        )
        database.session.add(new_user)
        database.session.commit()
        flash('Thanks for registering!')
        return redirect(url_for('core.dashboard'))
    elif signup_form.errors:
        flash('There are errors in your form. Please double check!', 'error')
    return render_template('signup_page.html', signup_form=signup_form)

@core.route('/login_page', methods=['GET', 'POST'])
def login():
    login_form = LoginForm()
    if login_form.validate_on_submit():
        user = User.query.filter_by(email=login_form.email.data).first()
        if user and user.password == login_form.password.data:
            login_user(user)
            flash('Login successful!', 'success')
            return redirect(url_for('core.dashboard'))
        else:
            flash('Invalid email or password', 'error')
    return render_template('login_page.html', login_form=login_form)


@core.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', current_user=current_user)

@core.route('/logedout')
def logout():
    flash('You have been logged out', "info")
    logout_user()
    
    return render_template('index.html')

@core.route('/update-profile')
@login_required
def update_profile():
    return render_template('update_profile.html', current_user=current_user)