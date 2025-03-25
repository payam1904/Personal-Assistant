from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, DateField, EmailField
from wtforms.validators import DataRequired, EqualTo, Email
from wtforms import ValidationError
from .models import User
from flask import flash
from wtforms.validators import Regexp

password = PasswordField('Password', validators=[DataRequired(), EqualTo('confirm_password'), Regexp(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$', message="Password must be at least 8 characters long and contain letters and numbers.")])


class SignupForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    date_of_birth = DateField('Date of Birth', validators=[DataRequired()])
    phone_number = StringField('Phone Number', validators=[DataRequired()])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), EqualTo('confirm_password')])
    confirm_password = PasswordField('Confirm Password')
    submit = SubmitField('Create Account')

    
    # def check_email(self, field):
    #     if User.query.filter_by(email=field.data).first():
    #         raise ValidationError('This email address has already been registered!')
    # def check_username(self, field):
    #     if User.query.filter_by(username=field.data).first():
    #         raise ValidationError('This username is taken! Try another one!')

    
    
class LoginForm(FlaskForm):
    email = EmailField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')
    