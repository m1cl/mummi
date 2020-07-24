from webob import Request
import re
import os
import sys

####
#### Run with:
#### twistd -n web --port 8080 --wsgi mp3.mp3_app

_MP3DIV = """<div id="musicHere"></div>"""

_MP3EMBED = """<embed src="mp3/" loop="true" autoplay="false" width="145" height="60"></embed>"""

_HTML = '''<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head></head><body> Hello %s %s</body></html> ''' % (_MP3DIV, _MP3EMBED)

def mp3_html(environ, start_response):
    """This function will be mounted on "/" and refer the browser to the mp3 serving URL."""

    start_response('200 OK', [('Content-Type', 'text/html')])
    return [_HTML]

def mp3_serve(environ, start_response):
    """Serve the MP3, one chunk at a time with a generator"""
    file_path = "./bandwurm.mp3"
    mimetype = "application/x-mplayer2"
    size = os.path.getsize(file_path)
    headers = [
        ("Content-type", mimetype),
        ("Content-length", str(size)),
    ]
    start_response("200 OK", headers)
    return send_file(file_path, size)

def send_file(file_path, size):
    BLOCK_SIZE = 4096
    fh = open(file_path, 'r')
    while True:
        block = fh.read(BLOCK_SIZE)
        if not block:
            fh.close()
            break
        yield block

def _not_found(environ,start_response):
    """Called if no URL matches."""
    start_response('404 NOT FOUND', [('Content-Type', 'text/plain')])
    return ['Not Found']

def mp3_app(environ,start_response):
    """
    The main WSGI application. Dispatch the current request to
    the functions andd store the regular expression
    captures in the WSGI environment as  `mp3app.url_args` so that
    the functions from above can access the url placeholders.

    If nothing matches call the `not_found` function.
    """
    # map urls to functions
    urls = [
        (r'^$', mp3_html),
        (r'mp3/?$', mp3_serve),
    ]
    path = environ.get('PATH_INFO', '').lstrip('/')
    for regex, callback in urls:
        match = re.search(regex, path)
        if match is not None:
            # assign http environment variables...
            environ['mp3app.url_args'] = match.groups()
            return callback(environ, start_response)
    return _not_found(environ, start_response)
