"""
Routes d'authentification : inscription, connexion
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.utils.security import hash_password, verify_password

auth_bp = Blueprint('auth', __name__)

# ⚠️ Stockage temporaire en mémoire (à remplacer par la BD)
fake_users = []


@auth_bp.route('/register', methods=['POST'])
def register():
    """Inscription d'un nouveau client"""
    data = request.get_json()

    # Vérifications de base
    required = ['nom', 'email', 'telephone', 'password']
    for field in required:
        if not data.get(field):
            return jsonify({'error': f'Le champ {field} est obligatoire'}), 400

    # Vérifier si l'email existe déjà
    if any(u['email'] == data['email'] for u in fake_users):
        return jsonify({'error': 'Cet email est déjà utilisé'}), 409

    # Créer l'utilisateur
    user = {
        'id': len(fake_users) + 1,
        'nom': data['nom'],
        'email': data['email'],
        'telephone': data['telephone'],
        'password': hash_password(data['password']),
        'role': 'CLIENT',
        'langue': data.get('langue', 'fr')
    }
    fake_users.append(user)

    # Générer un token
    token = create_access_token(identity=user['id'])

    return jsonify({
        'message': 'Inscription réussie',
        'user': {k: v for k, v in user.items() if k != 'password'},
        'token': token
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    """Connexion d'un utilisateur (client, agent ou admin)"""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'CLIENT')

    if not email or not password:
        return jsonify({'error': 'Email et mot de passe obligatoires'}), 400

    # Trouver l'utilisateur
    user = next(
        (u for u in fake_users if u['email'] == email and u['role'] == role),
        None
    )

    if not user or not verify_password(password, user['password']):
        return jsonify({'error': 'Identifiants invalides'}), 401

    # Générer un token
    token = create_access_token(identity=user['id'])

    return jsonify({
        'message': 'Connexion réussie',
        'user': {k: v for k, v in user.items() if k != 'password'},
        'token': token
    }), 200