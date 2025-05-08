#!/bin/bash

cd ~/workspace/Team-Builder-FE
echo "📦 Pulling latest changes..."
git pull origin main

echo "🛑 Stopping old container..."
docker stop team-builder-fe || true
docker rm team-builder-fe || true

echo "🚀 Building & running with docker-compose..."
docker-compose up --build -d
