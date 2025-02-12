import os
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
import mimetypes

class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        mime_type, _ = mimetypes.guess_type(path)
        if path.endswith(".js"):
            mime_type = "application/javascript"
        elif path.endswith(".md"):
            mime_type = "text/markdown"
        return mime_type

project_root = os.path.dirname(os.path.abspath(__file__))

PORT = 8000

with TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
    print(f"Serving files from {project_root} at http://localhost:{PORT}/")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped by user.")
