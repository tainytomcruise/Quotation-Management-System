#!/bin/bash

# Quotation Management System - Complete Setup Script
# This script sets up both backend and frontend

set -e  # Exit on error

echo "=========================================="
echo "Quotation Management System - Setup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# Check npm
echo -e "${BLUE}Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm."
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm --version)${NC}"

# Check MongoDB
echo -e "${BLUE}Checking MongoDB...${NC}"
if ! command -v mongosh &> /dev/null && ! command -v mongo &> /dev/null; then
    echo -e "${YELLOW}⚠ MongoDB tools not found. You'll need to start MongoDB manually.${NC}"
    echo "  Install from: https://www.mongodb.com/try/download/community"
else
    echo -e "${GREEN}✓ MongoDB found${NC}"
fi

echo ""
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend

echo "Installing dependencies..."
npm install --legacy-peer-deps > /dev/null 2>&1 || npm install

echo -e "${GREEN}✓ Backend dependencies installed${NC}"

echo ""
echo -e "${BLUE}Setting up Frontend...${NC}"
cd ../frontend

echo "Installing dependencies..."
npm install --legacy-peer-deps > /dev/null 2>&1 || npm install

echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

echo ""
echo "=========================================="
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Start MongoDB (if not running):"
echo "   ${YELLOW}mongod${NC} or ${YELLOW}brew services start mongodb-community${NC}"
echo ""
echo "2. Open 3 terminals and run:"
echo ""
echo "   Terminal 1 - Backend:"
echo "   ${YELLOW}cd backend && npm run dev${NC}"
echo ""
echo "   Terminal 2 - Frontend:"
echo "   ${YELLOW}cd frontend && npm start${NC}"
echo ""
echo "3. Open your browser:"
echo "   ${YELLOW}http://localhost:4200${NC}"
echo ""
echo "For detailed setup instructions, see:"
echo "  - QUICKSTART.md (fast setup)"
echo "  - README.md (complete guide)"
echo "  - INTEGRATION.md (architecture)"
echo ""
