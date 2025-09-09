from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
import os

app = FastAPI()

# Conectar ao banco de dados SQLite
DATABASE_URL = os.path.join("db", "vimi42.db")

# Garantir que o diretório do banco existe
os.makedirs(os.path.dirname(DATABASE_URL), exist_ok=True)

# Criar tabela se não existir
def create_table():
    conn = sqlite3.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            telefone TEXT NOT NULL,
            email TEXT NOT NULL,
            tipo TEXT NOT NULL CHECK (tipo IN ('pessoal', 'empresa')),
            aceitou_lgpd BOOLEAN NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

create_table()

class Lead(BaseModel):
    nome: str
    telefone: str
    email: str
    tipo: str  # 'pessoal' ou 'empresa'
    aceitou_lgpd: bool

@app.post("/lead")
async def add_lead(lead: Lead):
    if not lead.aceitou_lgpd:
        raise HTTPException(status_code=400, detail="É necessário aceitar as regras de tratamento de dados")

    conn = sqlite3.connect(DATABASE_URL)
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO leads (nome, telefone, email, tipo, aceitou_lgpd)
            VALUES (?, ?, ?, ?, ?)
        ''', (lead.nome, lead.telefone, lead.email, lead.tipo, lead.aceitou_lgpd))
        conn.commit()
    except sqlite3.IntegrityError as e:
        raise HTTPException(status_code=400, detail="Erro ao salvar lead: " + str(e))
    finally:
        conn.close()

    return {"message": "Lead salvo com sucesso!"}

@app.get("/")
async def read_root():
    return {"message": "Bem-vindo à API do ViMi42"}