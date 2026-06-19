# .sm/config.sh — configuration projet pour AGTK (sourcé par ./sm)
#
# Copie ce fichier en .sm/config.sh et adapte-le à ton projet.
# Ce fichier est GITIGNORÉ : il peut contenir des chemins/tokens locaux.

# --- Identité projet --------------------------------------------------------
PROJECT_NAME="Mon Projet"

# Branche source des branches d'US et cible des PRs.
# Surchargeable à la volée : SM_BASE_BRANCH=ma-branche ./sm run 4
SM_BASE_BRANCH="${SM_BASE_BRANCH:-develop}"
SM_PR_TARGET="${SM_PR_TARGET:-$SM_BASE_BRANCH}"

# --- Agents (CLI invoquées) -------------------------------------------------
# IMPL_CLI : agent d'implémentation. Appelé : "$IMPL_CLI" -p --dangerously-skip-permissions "<prompt>"
# REVIEW_CLI : agent reviewer.       Appelé : "$REVIEW_CLI" -p "<prompt>"
IMPL_CLI="claude"
REVIEW_CLI="agy"

# --- Déploiement (cmd_promote) ----------------------------------------------
# Commande lancée après merge base → main. Vide = pas de deploy automatique.
# Exemples :
#   "netlify deploy --dir=. --prod"
#   "vercel --prod"
#   "npm run deploy"
#   "gh workflow run deploy.yml"
DEPLOY_CMD=""

# --- Structure du projet (injectée dans le prompt d'implémentation) ---------
# Décris en quelques lignes où vit le code source, pour cadrer l'agent Tech.
# Si ton projet a un CLAUDE.md, tu peux laisser la valeur par défaut.
PROJECT_STRUCTURE="Voir CLAUDE.md pour la structure du projet."

# --- Reviewer : identité GitHub distincte (optionnel) -----------------------
# GitHub interdit d'approuver formellement sa propre PR. Pour des --approve
# réels, fournis le token d'un compte collaborateur distinct via :
#   - la variable d'env AGY_GH_TOKEN, OU
#   - un fichier hors du repo pointé par AGY_TOKEN_FILE.
# Si rien n'est configuré → fallback en --comment (approval manuel requis).
AGY_TOKEN_FILE="$HOME/.config/<projet>/agy.token"

# --- Gardes-fous prompt-injection -------------------------------------------
# Logins GitHub autorisés à déclencher ./sm run (tableau bash).
ALLOWED_AUTHORS=("mon-login-github")

# Chemins modifiables par l'agent. Adapter selon la structure du projet.
# Familles supportées :
#   - préfixes dossier  : src/, tests/, .github/, .sm/
#   - fichiers exacts   : package.json, index.html, Makefile, sm
#   - patterns glob     : [^/]+\.md  (tout .md à la racine)
ALLOWED_PATHS_REGEX='^((src|tests|\.github|\.sm)/|(package\.json|\.gitignore|sm)$|[^/]+\.md$)'

# Taille max du body d'issue injecté (octets) — limite la surface d'injection.
MAX_BODY_BYTES=4096

# Son des notifications macOS (laisse vide pour désactiver).
NOTIFY_SOUND="Glass"

# Patterns de secrets bloqués dans les diffs (laisse le défaut sauf besoin).
# SECRET_PATTERNS='(sk-[A-Za-z0-9]{20,}|gh[opsu]_[A-Za-z0-9]{20,}|...)'
