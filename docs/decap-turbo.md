# Decap CMS with Decap Turbo (experimental)

Branch: `decap-turbo`. Production (`main`, GitHub Pages) is unchanged; the deploy workflows only run on `main`.

## Files

| File | Purpose |
| --- | --- |
| `static/admin/index.html` | Loads Decap CMS `^3.17.0` from jsDelivr. Served at `/admin/`. |
| `static/admin/config.yml` | Turbo config (`turbo-github`, branch `decap-turbo`) and collections. |
| `static/admin/local.html` | Optional local-backend entry point at `/admin/local.html`. |
| `static/admin/config.local.yml` | Local-backend config. Same collections, `github` backend + `local_backend: true`. Keep in sync with `config.yml`. |

Collections follow the existing flat layout (no page bundles):

- Writing: `content/writing/*.md` (create, edit, delete)
- Projects: `content/projects/*.md` (create, edit, delete)
- Pages: `content/about.md` and the three `_index.md` files (edit only)

New posts default to `draft: true`. Images upload to `static/images/` and are referenced as `/images/...`.

## Local development

```sh
hugo server
```

Open <http://localhost:1313/admin/>.

## Turbo setup

1. Sign up at <https://turbo.decapcms.org/signup> and create an organisation.
2. Git connection: install the Turbo GitHub App on your account and grant access to this repository.
3. Create a site:
   - Git provider: GitHub
   - Repo: `<owner>/<repo>`
   - Branch: `decap-turbo`
   - Config path: `static/admin/config.yml`
   - Admin interface URLs, one per line, main one first:
     ```
     http://localhost:1313/admin/
     ```
4. On the site's Overview tab copy the Site ID and set it as `turbo_site_id` in `static/admin/config.yml` (replace the all-zero placeholder). It is an identifier, not a secret.
5. Commit and push the branch. Turbo reads `config.yml` from GitHub, so the branch must be pushed (with the real `turbo_site_id`) before login and per-collection permissions work. Hugo serving locally is not enough.

`repo` is deliberately absent from the config: Turbo uses the dashboard value.

## Test read / create / edit

1. Open `/admin/` and choose Login with Turbo. You need access to the site, not just an account.
2. Writing: confirm "Sample Article" is listed and its fields populate.
3. New Article: fill title, date and body, then Save. Check a commit lands on `decap-turbo` and `content/writing/<slug>.md` has the expected front matter.
4. Edit an existing article, save, and review `git diff` after pulling. Check existing fields are intact.
5. Pull the branch and run `hugo server` to confirm the result renders.

Note: Decap rewrites front matter on save, so key order and quoting can change in the diff.

## Optional local backend mode

Edits local files, no remote commits and no Turbo login. Do not use this for the Turbo test.

```sh
npx decap-server      # terminal 1, port 8081
hugo server           # terminal 2
```

Open <http://localhost:1313/admin/local.html>. `/admin/` stays on Turbo.

## Android testing

Option A: LAN (plain HTTP, may fail).

```sh
hugo server --bind 0.0.0.0 --baseURL http://<desktop-lan-ip>:1313
```

- Phone and desktop on the same network; allow inbound TCP 1313 in the desktop firewall.
- Add `http://<desktop-lan-ip>:1313/admin/` to the site's Admin interface URLs in Turbo (only the origin counts).
- Open that URL in Chrome on the phone. Hugo serves a DHCP IP, so re-register if it changes. Use a DHCP reservation or a hostname.
- Plain HTTP on a non-localhost origin is not a secure context. If the login popup or session handling fails, use option B.

Option B (preferred): HTTPS tunnel limited to you, e.g. Tailscale Serve on the desktop and the phone's Tailscale app (`tailscale serve --https=443 localhost:1313`), then register `https://<machine>.<tailnet>.ts.net/admin/` in Turbo. Do not expose the dev server on the public internet, or use `tailscale funnel` for it.

Option C: deploy `decap-turbo` to a separate preview host and register its `/admin/` URL. Do not change the production Pages target.

Nothing is needed on the phone except a browser.

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| "Unknown site_id" | `turbo_site_id` wrong, still the placeholder, or not pushed to GitHub. |
| Popup closes / "origin not allowed" | Origin (scheme, host, port) not in the site's Admin interface URLs, or you are not a member of the site. |
| `requested repo does not match` | Fix the repo in the Turbo dashboard. |
| Config or collections not found | Config path in Turbo must be `static/admin/config.yml`; push the branch. |
| `use_graphql` error | Remove it. Turbo backends do not support it. |
| Login screen offers GitHub, not Turbo | Browser cached an old script, or version below 3.17.0. Hard-reload. |
| Changes not visible on the site | Hugo `buildDrafts = false`; new posts are drafts until `draft` is off. |

## Promote to production

1. Review and merge `decap-turbo` into `main` (when you decide to).
2. In Turbo add `https://alastair87.me/admin/` to Admin interface URLs and set the site branch to `main`, and set `branch: main` in `config.yml` (or remove it to use the site row).
3. Decide whether `/admin/` should be public: the page is only a login shell, but consider `noindex` (already set) and restricting roles in Turbo.
4. Remove `local.html` and `config.local.yml` if the local mode is no longer wanted.
