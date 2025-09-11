#!/usr/bin/env python3
import os
import subprocess
import signal
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.request
import urllib.parse
import json
import threading
import time

class ProxyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path.startswith('/api/'):
            # Proxy API requests to backend
            backend_url = f"http://localhost:8000{self.path[4:]}"  # Remove '/api' prefix
            
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                req = urllib.request.Request(
                    backend_url, 
                    data=post_data,
                    headers={'Content-Type': 'application/json'}
                )
                
                with urllib.request.urlopen(req) as response:
                    self.send_response(response.status)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(response.read())
                    
            except urllib.error.HTTPError as e:
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                error_data = e.read()
                self.wfile.write(error_data)
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                error_response = json.dumps({"detail": str(e)}).encode()
                self.wfile.write(error_response)
        else:
            # Handle regular POST requests (if any)
            super().do_POST()

def start_backend():
    """Start the FastAPI backend server"""
    os.chdir('backend')
    proc = subprocess.Popen([
        'python3', '-m', 'uvicorn', 'main:app',
        '--host', 'localhost',
        '--port', '8000',
        '--reload'
    ])
    os.chdir('..')
    return proc

def start_frontend():
    """Start the frontend HTTP server with API proxy"""
    os.chdir('frontend')
    server = HTTPServer(('0.0.0.0', 5000), ProxyHTTPRequestHandler)
    print(f"Frontend server running on http://0.0.0.0:5000")
    print(f"API requests will be proxied to http://localhost:8000")
    server.serve_forever()

def signal_handler(sig, frame):
    print('\nShutting down servers...')
    sys.exit(0)

if __name__ == '__main__':
    signal.signal(signal.SIGINT, signal_handler)
    
    # Start backend in a separate thread
    print("Starting backend server...")
    backend_proc = start_backend()
    
    # Give backend time to start
    time.sleep(2)
    
    # Start frontend server (blocking)
    print("Starting frontend server...")
    try:
        start_frontend()
    finally:
        if backend_proc:
            backend_proc.terminate()