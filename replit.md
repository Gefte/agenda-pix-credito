# ViMi42 - Agenda e Finanças Colaborativas

## Overview
This is a lead management system for the ViMi42 platform, featuring a FastAPI backend with SQLite database and a vanilla HTML/CSS/JS frontend. The application has been successfully imported and configured for the Replit environment.

## Project Architecture
- **Backend**: FastAPI with SQLite database (Python 3.11)
- **Frontend**: Vanilla HTML/CSS/JS served by Python HTTP server
- **Database**: SQLite database stored in `backend/db/vimi42.db`
- **Deployment**: Configured for autoscale deployment

## Key Features
- Lead registration form with LGPD compliance
- SQLite database with automated table creation
- CORS-enabled API for cross-origin requests
- Responsive design for mobile and desktop

## Development Setup
The project runs on:
- **Frontend**: Port 5000 (http://0.0.0.0:5000)
- **Backend API**: Port 8000 (http://localhost:8000)
- **Workflow**: "ViMi42 App" runs `frontend_server.py`

## Recent Changes
- **2025-09-09**: Successfully imported from GitHub and configured for Replit
- Added CORS middleware to FastAPI backend
- Created custom frontend server with API proxying
- Configured deployment settings for autoscale
- All dependencies installed and working correctly

## API Endpoints
- `POST /lead`: Submit lead information
- `GET /`: Health check endpoint
- `GET /docs`: FastAPI documentation (backend only)

## Database Schema
- **leads** table with fields: id, nome, telefone, email, tipo, aceitou_lgpd

## User Preferences
- Portuguese language interface
- Simple, clean design focused on lead generation
- LGPD compliance built-in