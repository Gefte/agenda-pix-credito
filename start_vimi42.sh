#!/bin/bash
# /root/agenda-pix-credito/start_vimi42.sh

# Ativa o virtualenv
source /root/agenda-pix-credito/venv/bin/activate

# Roda o frontend
exec python3 /root/agenda-pix-credito/frontend_server.py
