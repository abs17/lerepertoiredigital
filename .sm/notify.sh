#!/usr/bin/env bash
# Notification macOS — usage: ./notify.sh "Titre" "Message" [url]
TITLE="${1:-AGTK}"
MSG="${2:-}"
URL="${3:-}"
SOUND="${NOTIFY_SOUND:-Glass}"
osascript -e "display notification \"$MSG\" with title \"$TITLE\" sound name \"$SOUND\"" >/dev/null 2>&1 || true
[[ -n "$URL" ]] && echo "🔗 $URL"
echo "🔔 $TITLE — $MSG"
