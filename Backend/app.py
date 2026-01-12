from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'  # Change this!
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# User model
class User(UserMixin):
    def __init__(self, id, username, password, role):
        self.id = id
        self.username = username
        self.password = password
        self.role = role

# Dummy users for testing (replace with database later)
users = {
    'student123': User(1, 'student123', 'password123', 'student'),
    'faculty456': User(2, 'faculty456', 'password456', 'faculty')
}

@login_manager.user_loader
def load_user(user_id):
    for user in users.values():
        if str(user.id) == user_id:
            return user
    return None

# Routes
@app.route('/')
def home():
    return redirect('/frontend/index.html')

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Check if user exists
    if username in users and users[username].password == password:
        login_user(users[username])
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'role': users[username].role,
            'redirect': f'/{users[username].role}-dashboard.html'
        })
    
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'success': True, 'message': 'Logged out'})

@app.route('/api/dashboard-data', methods=['GET'])
@login_required
def dashboard_data():
    # Return dummy data for now
    return jsonify({
        'name': 'Piyush',
        'prn': '20230123456',
        'attendance': '85%',
        'cgpa': '8.5'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)