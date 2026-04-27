# Geonwoo Kim — Portfolio

A clean, minimal Jekyll portfolio targeting product / product-data roles
(e.g. JPMorgan Senior Product Associate, TPM, Senior Business Analyst).

## Quick start

### 1. Push to GitHub Pages

The fastest path to a live site:

```bash
# Create a new GitHub repo named exactly: geonkim76.github.io
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/geonkim76/geonkim76.github.io.git
git push -u origin main
```

Then go to the repo → **Settings → Pages** → set source to `main` branch,
root folder. GitHub builds Jekyll automatically. Your site will be live at
`https://geonkim76.github.io` within a minute or two.

### 2. Run locally (optional, recommended for editing)

```bash
cd portfolio
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

Requires Ruby 3+. On macOS: `brew install ruby` (and add to PATH per the
brew instructions). On Windows: use [RubyInstaller](https://rubyinstaller.org/).

## What you need to customize

I drafted the SK On case study with a generic, NDA-safe narrative — review
and adjust the specifics. The other two case studies are skeletons.

| File | What to do |
|------|-----------|
| `_config.yml` | Confirm `linkedin_username` / `github_username` |
| `_work/01-sk-battery-reporting.md` | Read through, adjust numbers/language to match what you actually did. **Get manager review before publishing** if any specifics are sensitive. |
| `_work/02-sql-analysis.md` | Replace bracketed placeholders with one of your SQL projects. |
| `_work/03-python-project.md` | Replace bracketed placeholders with one of your Python projects. |
| `about.md` | Tweak the trajectory paragraph if anything feels off. |
| `index.html` | The "About" brief — same edits as `about.md` if you change anything there. |

To add more case studies later, drop a new `.md` file in `_work/` with the
same front matter (`order: 4`, etc.). They show up on the home page automatically.

## File structure

```
portfolio/
├── _config.yml              # Site settings
├── Gemfile                  # Ruby dependencies
├── index.html               # Home page (hero + work + about + contact)
├── about.md                 # /about/ page
├── _layouts/
│   ├── default.html         # Header / footer / nav wrapper
│   └── case_study.html      # Case study page template
├── _work/                   # Case studies (Jekyll collection)
│   ├── 01-sk-battery-reporting.md
│   ├── 02-sql-analysis.md
│   └── 03-python-project.md
└── assets/
    └── css/
        └── main.scss        # All styles
```

## Design notes

- **Two colors only**: near-black text + deep navy accent. Adjust
  `--color-accent` in `assets/css/main.scss` if you want a different tone
  (a muted blue `#2563eb` or even a dark green works for finance).
- **One font**: Inter, weights 400/500/600/700.
- **Narrow column** (max-width 680px). The whitespace is intentional —
  it's what makes the site read as "organized."
- **No animations** beyond subtle hover transitions. Keep it that way.

## Adding a resume

Drop a `resume.pdf` in the root of the project and link to it from
`index.html` and `about.md`:

```html
<a href="{{ '/resume.pdf' | relative_url }}">Resume (PDF)</a>
```

## Static preview

If you want to see what the home page looks like *before* setting up Jekyll,
open `../preview.html` in a browser — it's a single self-contained file
that mirrors what the live site will render.
