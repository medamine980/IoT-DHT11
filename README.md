## Getting started

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

## API Documentation

### DHT 

| Method | Path                | Description                         |
| ------ | ------------------- | ----------------------------------- |
| GET    | /api/dhts           | Get all *DHTs*                      |
| GET    | /api/dhts/{id}      | Get *DHT* with id={id}              |
| GET    | /api/dhts/last-data | Get last *DHT*                      |
| POST   | /api/dhts           | Create new *DHT*                    |
| PUT    | /api/dhts/{id}      | Update *DHT* with id={id}           |
| PATCH  | /api/dhts/{id}      | Update partially *DHT* with id={id} |
| DELETE | /api/dhts/{id}      | Delete *DHT* with id={id}           |

#### Extra:

| Method | Path                                               | Description                                    |
| ------ | -------------------------------------------------- | ---------------------------------------------- |
| GET    | /api/dhts?start_date=YYYY-MM-DD&end_date=YYYY-DD-MM | Get all *DHTs* between start_date and end_date |
| GET    | /api/dhts/export-csv?start_date=YYYY-MM-DD&end_date=YYYY-DD-MM | Export all *DHTs* between start_date and end_date in a CSV file |

### User

| Method | Path             | Description                          |
| ------ | ---------------- | ------------------------------------ |
| GET    | /api/users       | Get all *users*                      |
| GET    | /api/users/{id}  | Get *user* with id={id}              |
| POST   | /api/users       | Create new *user*                    |
| PUT    | /api/users/{id}  | Updates *user* with id={id}          |
| PATCH  | /api/users/{id}  | Update partially *user* with id={id} |
| DELETE | /api/users/{id}  | Delete *user* with id={id}           |

#### Extra:

| Method | Path               | Description                 |
| ------ | ------------------ | --------------------------- |
| GET    | /api/users/login   | Logs in the *user* |
| GET    | /api/users/logout  | Logs out the current *user* |
| GET    | /api/users/current-user  | Gets the current *user*|

### Incident

| Method | Path             | Description                          |
| ------ | ---------------- | ------------------------------------ |
| GET    | /api/incidents | Get all *incidents* |
| GET    | /api/incidents/{id}  | Get *incident* with id={id}              |
| GET    | /api/incidents/last-incident  | Get latest *incident* with status unresolved |
| PUT    | /api/incidents/{id}/resolve  | Resolve *incident* with id={id} |

#### Extra

| Method | Path             | Description                          |
| ------ | ---------------- | ------------------------------------ |
| PUT    | /api/incidents/{id}/resolve | Resolves *incident* with id={id} |