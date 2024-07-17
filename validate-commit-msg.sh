#!/bin/bash

COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat $COMMIT_MSG_FILE)
COMMIT_MSG_REGEX="^(feat|fix|docs|style|refactor|test|chore): .+$"

echo "Commit message being checked: $COMMIT_MSG"
echo "Regex pattern used: $COMMIT_MSG_REGEX"

if ! echo "$COMMIT_MSG" | grep -qE "$COMMIT_MSG_REGEX"; then
    echo "Commit message does not follow the template."
    echo "Please follow the template: <type>: <short summary>"
    echo "Allowed types: feat, fix, docs, style, refactor, test, chore"
    exit 1
fi
