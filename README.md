# Bloom Networks site

Static "pick your flower" page for bloomnetworks.net. Links to the Yeeps site and Monarch.

- `js/config.js` – destination URLs, hash routes, loader delay
- `js/scene.js` – routing by hash (`#yeeps`, `#monarch`, `#dmca`), hover, popup
- `css/` – one file per concern; `layout.css` holds the positioned artwork. The page is one screen tall: `--u` is the smaller of width/1047 and height/1560, so nothing scrolls.

Run locally with `python3 -m http.server 8000`. Deploy like the Yeeps site; `CNAME` is `bloomnetworks.net`. For an apex domain, add Spaceship A records for GitHub Pages (185.199.108.153 and the other three .109/.110/.111.153 addresses) instead of a CNAME.

`MONARCH_URL` in `js/config.js` points at monarch.bloomnetworks.net.

`404.html` forwards short links (for example `/discord`) managed in the Yeeps admin; see `yeeps-site/README.md`.
