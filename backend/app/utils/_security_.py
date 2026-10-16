"""
Fonctions de sécurité : hachage de mot de passe
"""
import bcrypt

def hash_password(password: str) -> str:
    """Hache un mot de passe"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    """Vérifie un mot de passe"""
    return bcrypt.checkpw(
        password.encode('utf-8'),
        hashed.encode('utf-8')
    )