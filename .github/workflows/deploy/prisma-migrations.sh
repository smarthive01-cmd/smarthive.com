#!/usr/bin/env bash
set -euo pipefail
echo "Running Prisma migrations..."
npx prisma generate
npx prisma migrate deploy
