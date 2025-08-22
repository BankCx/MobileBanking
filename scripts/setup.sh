#!/bin/bash
# Setup script for Mobile Banking

echo "Setting up Mobile Banking..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Install Expo CLI if not present
if ! command -v expo &> /dev/null; then
    echo "Installing Expo CLI..."
    npm install -g @expo/cli
fi

echo "Setup complete! Use 'npm start' or 'expo start' to start the development server."
