Si c'est votre première fois que vous éxecutez le projet, donc il faut tout d'abord commencer par la création d'un environnement virtuelle pour *Python*
```
python -m venv .venv
```

Pour l'activer:
```
./.venv/Scripts/activate # Linux (bash)
.\.venv\Scripts\Activate.ps1 # Powershell
.venv\Scripts\activate.bat # CMD (Windows)
```

Pour l'installation des dépendances:  
*Backend*
```
pip install -r requirement.txt
```

*Frontend*
```
cd frontend
npm install
```