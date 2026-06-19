#!/usr/bin/env bash
# install.sh — installe le workflow AGTK dans un projet cible
#
# Usage :
#   ./install.sh                   # installe dans le répertoire courant
#   ./install.sh /path/to/project  # installe dans un répertoire spécifié

set -euo pipefail

AGTK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-$(pwd)}"

if [[ "$TARGET" == "$AGTK_DIR" ]]; then
  echo "❌ Target ne peut pas être le repo agtk lui-même." >&2
  exit 1
fi

if [[ ! -d "$TARGET" ]]; then
  echo "❌ Répertoire cible introuvable : $TARGET" >&2
  exit 1
fi

echo "🚀 Installation AGTK dans : $TARGET"
echo ""

# --- 1. Copie du dispatcher sm -------------------------------------------
cp "$AGTK_DIR/sm" "$TARGET/sm"
chmod +x "$TARGET/sm"
echo "  ✓ sm"

# --- 2. Copie de AGY.md --------------------------------------------------
cp "$AGTK_DIR/AGY.md" "$TARGET/AGY.md"
echo "  ✓ AGY.md"

# --- 3. Répertoire .sm/ --------------------------------------------------
mkdir -p "$TARGET/.sm/prompts" "$TARGET/.sm/logs"

cp "$AGTK_DIR/.sm/config.example.sh" "$TARGET/.sm/config.example.sh"
cp "$AGTK_DIR/.sm/notify.sh"         "$TARGET/.sm/notify.sh"
chmod +x "$TARGET/.sm/notify.sh"

cp "$AGTK_DIR/.sm/prompts/implement.md" "$TARGET/.sm/prompts/implement.md"
cp "$AGTK_DIR/.sm/prompts/review.md"    "$TARGET/.sm/prompts/review.md"
echo "  ✓ .sm/"

# --- 4. Labels GitHub -----------------------------------------------------
mkdir -p "$TARGET/.github"
cp "$AGTK_DIR/.github/labels.json" "$TARGET/.github/labels.json"
echo "  ✓ .github/labels.json"

# --- 5. .gitignore patch --------------------------------------------------
GITIGNORE="$TARGET/.gitignore"
touch "$GITIGNORE"

add_if_missing() {
  local line="$1"
  grep -qxF "$line" "$GITIGNORE" || echo "$line" >> "$GITIGNORE"
}

add_if_missing ".sm/config.sh"
add_if_missing ".sm/logs/"
echo "  ✓ .gitignore (ajout .sm/config.sh + .sm/logs/)"

# --- 6. Instructions finales ----------------------------------------------
echo ""
echo "✅ AGTK installé."
echo ""
echo "Prochaines étapes :"
echo "  1. Copie et adapte la config projet :"
echo "       cp .sm/config.example.sh .sm/config.sh"
echo "       \$EDITOR .sm/config.sh"
echo ""
echo "  2. Crée les labels GitHub (une fois par repo) :"
echo "       gh label create --label \"\$(cat .github/labels.json)\"  # ou ./sm setup-labels"
echo ""
echo "  3. Lance une US :"
echo "       ./sm run <issue#>"
