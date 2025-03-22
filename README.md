# Care Team AI

## Core Tech Stack

### Frontend
- **React.js** - Modern UI library for building interactive user interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid styling

### Backend
- **Python with FastAPI** - High-performance API framework with automatic documentation
- **SQLite db** - Lightweight database for simple deployment
- **JWT authentication** - Secure token-based authentication

### AI Integration
- **OpenAI API** - Advanced language models for intelligent processing

## Key Features

- 🤖 **AI Copilot for Care Team** - AI assistant to help navigate patient care
- 📊 **SDOH screening and risk factor score** - Social Determinants of Health assessment
- 🔍 **Patient portal directory** - Enhanced with:
  - AI-powered search capabilities
  - Priority ranking system
  - Customizable filter options


## System Architecture

```mermaid
graph TD
    A[CARE TEAM AI] --> B[FRONTEND<br/>React.js]
    A --> C[BACKEND<br/>FastAPI]
    
    C --> D[PATIENT DIRECTORY<br/>- Profiles<br/>- Search<br/>- Filters]
    C --> E[SQLITE DATABASE<br/>- Patient Data<br/>- Benefits<br/>- Eligibility<br/>- User Accounts]
    C --> F[AI COPILOT CHATBOT<br/>- OpenAI API<br/>- Chat History<br/>- Recommendations]
    
    E --> G[BENEFIT MATCHING ENGINE]
    E --> H[SDOH ASSESSMENT MODULE]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:1px
    style C fill:#bbf,stroke:#333,stroke-width:1px
    style D fill:#dfd,stroke:#333,stroke-width:1px
    style E fill:#dfd,stroke:#333,stroke-width:1px
    style F fill:#dfd,stroke:#333,stroke-width:1px
    style G fill:#fdd,stroke:#333,stroke-width:1px
    style H fill:#fdd,stroke:#333,stroke-width:1px
```



