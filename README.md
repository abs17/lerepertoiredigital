# AGTK — Agentic SDLC Toolkit

Automatise la boucle dev complète via deux agents IA :

- **Tech** (`claude`) — implémente l'US sur une branche, commit, ouvre la PR
- **Agy** (`agy` / second compte `claude`) — relit le diff, vérifie chaque critère d'acceptation, approuve ou demande des corrections

```
gh issue  →  ./sm run <#>  →  PR ouverte  →  review Agy  →  ./sm promote
```

---

## Prérequis

- [`claude`](https://claude.ai/code) CLI installé et authentifié
- [`gh`](https://cli.github.com/) CLI installé et authentifié
- `git`, `bash` ≥ 5
- (optionnel) compte GitHub distinct pour Agy, avec token dans `~/.config/<projet>/agy.token`

---

## Installation dans un projet

```bash
# Depuis le repo cloné
~/DEV/agtk/install.sh /path/to/mon-projet

# Ou via curl
curl -fsSL https://raw.githubusercontent.com/abs17/agtk/main/install.sh | bash -s -- /path/to/mon-projet
```

Puis configure :

```bash
cd mon-projet
cp .sm/config.example.sh .sm/config.sh
$EDITOR .sm/config.sh        # adapte PROJECT_NAME, branches, DEPLOY_CMD…
./sm setup-labels             # crée les labels GitHub (une fois par repo)
```

---

## Usage

```bash
./sm list                     # issues prêtes (label "ready")
./sm run <issue#>             # implémente + PR + review
./sm run <issue#> --yes       # idem, skip confirmation push
./sm review <pr#>             # relance la review Agy sur une PR existante
./sm promote                  # merge base → main + deploy ($DEPLOY_CMD)
./sm bug <issue#> "<desc>"    # ouvre une issue de bug liée à une US
./sm status <issue#>          # timeline d'une US
./sm logs                     # liste les logs de session
./sm logs --tail              # suit le log en cours (tail -f)
./sm logs <issue#|pr#>        # ouvre le log d'une US ou PR spécifique
```

---

## Structure du repo

```
sm                        ← dispatcher principal (réutilisable tel quel)
AGY.md                    ← instructions système pour l'agent Agy
install.sh                ← installe AGTK dans un projet cible
.sm/
  config.example.sh       ← template de config projet (à copier → config.sh)
  notify.sh               ← notifications macOS (son + alert)
  prompts/
    implement.md          ← prompt injecté à l'agent Tech
    review.md             ← prompt injecté à l'agent Agy
.github/
  labels.json             ← labels GitHub (ready, in-progress, review, done…)
```

`.sm/config.sh` et `.sm/logs/` sont **hors git** (ajoutés au `.gitignore` par `install.sh`).

---

## Config projet (`.sm/config.sh`)

| Variable | Défaut | Description |
|---|---|---|
| `PROJECT_NAME` | `"Projet"` | Nom injecté dans les prompts |
| `SM_BASE_BRANCH` | `develop` | Branche source des US + cible des PRs |
| `SM_PR_TARGET` | `$SM_BASE_BRANCH` | Branche cible des PRs (override si besoin) |
| `IMPL_CLI` | `claude` | CLI agent Tech |
| `REVIEW_CLI` | `agy` | CLI agent Agy |
| `DEPLOY_CMD` | _(vide)_ | Commande de deploy prod (ex. `netlify deploy --dir=. --prod`) |
| `PROJECT_STRUCTURE` | _(voir CLAUDE.md)_ | Description injectée dans le prompt Tech |
| `ALLOWED_AUTHORS` | — | Logins GitHub autorisés à déclencher `./sm run` |
| `ALLOWED_PATHS_REGEX` | — | Chemins modifiables par l'agent (garde-fou injection) |
| `AGY_TOKEN_FILE` | — | Fichier contenant le token GitHub du compte Agy |

---

## Sécurité

`./sm run` injecte le titre et le corps de l'issue GitHub dans le prompt. Ces champs sont traités comme **données non fiables** (`<untrusted_input>`) — l'agent Tech est instruit de refuser toute instruction qui y figurerait.

Garde-fous actifs :
- `ALLOWED_AUTHORS` — seuls les logins listés peuvent déclencher une implémentation
- `ALLOWED_PATHS_REGEX` — l'agent ne peut modifier que les fichiers autorisés
- `MAX_BODY_BYTES` — taille max du body d'issue injecté (limite la surface d'injection)
- Scan de patterns secrets dans les diffs avant merge

---

## Contribuer à AGTK

`sm` et les prompts sont génériques — toute amélioration doit rester indépendante du projet cible. La config projet vit dans `.sm/config.sh` (non versionné dans les projets, non inclus dans ce repo).
