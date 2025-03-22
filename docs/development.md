# Care Team AI - Developer Guide

This guide will help you set up and run the Care Team AI application for development.

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- Git

## Setup

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/yourusername/careteam-ai.git
cd careteam-ai
```

### Backend Setup

1. Set up a Python virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set up environment variables:

Create a `.env` file in the backend directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key
```

4. Run the backend server:

```bash
python main.py
```

The server will be available at http://localhost:8000. You can access the API documentation at http://localhost:8000/docs.

### Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install  # or yarn install
```

2. Run the development server:

```bash
npm start  # or yarn start
```

The frontend will be available at http://localhost:3000.

## Project Structure

### Backend

- `main.py`: Entry point for the FastAPI application
- `app/`: Main application package
  - `api/`: API endpoints
  - `core/`: Core functionality (database, config)
  - `models/`: SQLAlchemy models
  - `services/`: Business logic services
  - `schemas/`: Pydantic schemas for request/response validation

### Frontend

- `public/`: Static assets
- `src/`: React source code
  - `components/`: Reusable React components
  - `pages/`: Application pages
  - `layouts/`: Page layouts
  - `services/`: API service clients

## Development Workflow

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Write tests (if applicable)
4. Run the application and verify your changes
5. Commit your changes with a descriptive message
6. Push your branch and create a pull request

## API Documentation

FastAPI automatically generates interactive API documentation. When your backend server is running, visit:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Database

The application uses SQLite for development, which requires no additional setup. The database file `careteam.db` will be created in the `database` directory when you run the application for the first time.

For production, it's recommended to use a more robust database like PostgreSQL. 


git test