from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import os
import re
import html

app = FastAPI()

# Configure CORS for Replit environment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Configuração do banco de dados
def get_database_path():
    """Retorna o caminho do banco de dados"""
    db_dir = os.path.join(os.getcwd(), "db")
    if not os.path.exists(db_dir):
        os.makedirs(db_dir, exist_ok=True)
    
    db_path = os.path.join(db_dir, "vimi42.db")
    print(f"Database path: {db_path}")
    return db_path

DATABASE_URL = get_database_path()

# Criar tabela se não existir
def init_db():
    """Inicializa o banco de dados com schema atualizado"""
    db_path = get_database_path()
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Cria a tabela com constraint de email único
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            business_type TEXT NOT NULL,
            terms_accepted BOOLEAN NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Adiciona índice no email para performance
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)
    ''')
    
    conn.commit()
    conn.close()

def check_email_exists(email: str) -> bool:
    """Verifica se o email já existe na base de dados"""
    db_path = get_database_path()
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Query parametrizada para prevenir SQL injection
    cursor.execute("SELECT COUNT(*) FROM leads WHERE email = ?", (email,))
    result = cursor.fetchone()
    conn.close()
    
    return result[0] > 0

# Inicializar banco na inicialização da aplicação
try:
    init_db()
except (sqlite3.Error, OSError) as e:
    print(f"Failed to initialize database: {e}")
    # Se falhar, tenta criar no diretório atual
    DATABASE_URL = "vimi42.db"
    print(f"Trying fallback database: {DATABASE_URL}")
    init_db()

class Lead(BaseModel):
    name: str
    email: str
    business_type: str
    terms_accepted: bool
    
    @classmethod
    def validate_name(cls, v):
        # Remove caracteres especiais e HTML entities para prevenir XSS
        name = html.escape(v.strip())
        if len(name) < 2 or len(name) > 100:
            raise ValueError('Nome deve ter entre 2 e 100 caracteres')
        if not re.match(r'^[a-zA-ZÀ-ÿ\s]+$', name):
            raise ValueError('Nome deve conter apenas letras e espaços')
        return name
    
    @classmethod
    def validate_email(cls, v):
        # Sanitiza e valida o email
        email = html.escape(v.strip().lower())
        # Validação básica de email com regex
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            raise ValueError('Email inválido')
        if len(email) > 255:
            raise ValueError('Email muito longo')
        return email
    
    @classmethod
    def validate_business_type(cls, v):
        # Lista de tipos de negócios permitidos
        allowed_types = ['empresa', 'pessoal', 'outro']
        business_type = html.escape(v.strip().lower())
        if business_type not in allowed_types:
            raise ValueError(f'Tipo de negócio deve ser um dos seguintes: {", ".join(allowed_types)}')
        return business_type
    
    @classmethod
    def validate_terms(cls, v):
        if not v:
            raise ValueError('Termos de uso devem ser aceitos')
        return v

@app.post("/lead")
async def add_lead(lead: Lead):
    """Adiciona um novo lead ao banco de dados com validação de email duplicado"""
    try:
        # Valida os dados através do Pydantic automaticamente
        validated_lead = Lead(
            name=lead.name,
            email=lead.email,
            business_type=lead.business_type,
            terms_accepted=lead.terms_accepted
        )
        
        # Verifica se o email já existe
        if check_email_exists(validated_lead.email):
            raise HTTPException(
                status_code=409,
                detail="Este email já está cadastrado em nossa base de dados"
            )
        
        # Conecta ao banco
        db_path = get_database_path()
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Insere o lead com query parametrizada (prevenção SQL injection)
        cursor.execute('''
            INSERT INTO leads (name, email, business_type, terms_accepted)
            VALUES (?, ?, ?, ?)
        ''', (
            validated_lead.name, 
            validated_lead.email, 
            validated_lead.business_type, 
            validated_lead.terms_accepted
        ))
        
        conn.commit()
        lead_id = cursor.lastrowid
        print(f"Lead salvo com sucesso - ID: {lead_id}, Email: {validated_lead.email}")
        
    except HTTPException:
        # Re-raise HTTPException sem modificar
        raise
    except sqlite3.IntegrityError as e:
        # Captura violações de integridade (ex: email único)
        if "UNIQUE constraint failed" in str(e):
            raise HTTPException(
                status_code=409,
                detail="Este email já está cadastrado"
            ) from e
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Erro de integridade dos dados: {str(e)}"
            ) from e
    except ValueError as e:
        # Captura erros de validação do Pydantic
        raise HTTPException(
            status_code=422,
            detail=f"Dados inválidos: {str(e)}"
        ) from e
    except sqlite3.Error as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Erro no banco de dados: {str(e)}"
        ) from e
    except Exception as e:
        # Log do erro para debug
        print(f"Erro inesperado ao salvar lead: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Erro interno do servidor"
        ) from e
    finally:
        if 'conn' in locals():
            conn.close()

    return {
        "message": "Lead cadastrado com sucesso!", 
        "id": lead_id,
        "email": validated_lead.email
    }

@app.get("/")
async def read_root():
    """Endpoint raiz da API"""
    return {"message": "Bem-vindo à API do ViMi42"}

@app.get("/health")
async def health_check():
    """Verifica se a API e o banco estão funcionando"""
    try:
        db_path = get_database_path()
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM leads")
        count = cursor.fetchone()[0]
        conn.close()
        return {
            "status": "healthy", 
            "database": "connected",
            "total_leads": count,
            "database_path": db_path
        }
    except sqlite3.Error as e:
        return {
            "status": "unhealthy",
            "database": "error",
            "error": str(e)
        }