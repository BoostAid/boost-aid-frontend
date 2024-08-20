# Boost-Aid-front

## Prerequisites

Ensure you have the following installed on your machine:

- Bun
- Node.js

## Getting Started

Follow these steps to set up and run the application locally.

### 1. Clone the Repository

```bash
git clone https://github.com/ETHTorontoHackathon/boost-aid-frontend.git

cd boost-aid-frontend

##change branch if needed

bun install
```

### 2. Create '.env.local' file
Create a .env.local file in the root directory of the project with the following content:

```bash
cp .env.example .env.local
```

If you are using local backend specify the link NEXT_PUBLIC_API_ROOT.

If you want to use the database of the app: 

```bash
NEXT_PUBLIC_API_ROOT='http://99.241.49.15:3000'
```
Specify the local front end root:

```bash
NEXT_PUBLIC_APP_URL='http://localhost:3000'
NEXTAUTH_URL='http://localhost:3000'
```

### 3. Build and Run the front end 
```bash
bun run dev:web
```


