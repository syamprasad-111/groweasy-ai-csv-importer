# GrowEasy AI CSV Importer

An AI-powered CSV Importer that intelligently extracts CRM lead information from CSV files with different formats and converts them into the GrowEasy CRM schema.

The application allows users to upload CSV files from various sources such as Facebook Lead Ads, Google Ads, Excel sheets, Real Estate CRMs, Sales reports, and manually created spreadsheets without requiring fixed column names.

---------------------------------------------------

## Features

### Frontend
- Upload CSV using File Picker or Drag & Drop
- Preview CSV before AI processing
- Responsive preview table
- Confirm Import before sending data to backend
- Loading indicator during AI processing
- Display imported CRM records
- Display skipped records
- Import summary cards

### Backend
- Accept CSV uploads
- Parse CSV into JSON records
- Batch processing for AI requests
- AI-powered field extraction using Gemini
- Validation of AI responses
- Skip invalid records
- Structured JSON response
- Error handling

-----------------------------------------------------

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Axios
- PapaParse

### Backend
- Node.js
- Express
- TypeScript
- Multer
- csv-parser

### AI
- Google Gemini 2.5 Flash
- @google/genai SDK

-----------------------------------------------------

## Application Flow

Upload CSV
      │
      ▼
Preview CSV
(No AI Processing)
      │
      ▼
Confirm Import
      │
      ▼
Backend Upload
      │
      ▼
CSV Parsing
      │
      ▼
Batch Processing
      │
      ▼
Gemini AI Extraction
      │
      ▼
Validation
      │
      ▼
Return CRM Records
      │
      ▼
Display Results

-----------------------------------------------------

## CRM Fields Extracted

The AI extracts the following fields whenever possible:

- created_at
- name
- email
- country_code
- mobile_without_country_code
- company
- city
- state
- country
- lead_owner
- crm_status
- crm_note
- data_source
- possession_time
- description

-----------------------------------------------------

## AI Prompt Strategy

The AI is instructed to:
- Detect column meanings instead of relying on column names.
- Handle different CSV layouts.
- Normalize CRM status values.
- Normalize data source values.
- Merge additional emails and phone numbers into CRM notes.
- Skip records without both email and mobile number.
- Return only valid JSON.
- Preserve one record per CSV row.

-----------------------------------------------------

## Installation

### Clone Repository
git clone <repository-url>

### Backend
Runs on http://localhost:5000

### Frontend
Runs on http://localhost:3000

-----------------------------------------------------

## Design Decisions

- Frontend preview is performed entirely in the browser to provide immediate feedback and avoid unnecessary AI calls to backend.
- AI processing is triggered only after the user confirms the import, matching the assignment requirements.
- Records are processed in batches to keep prompts manageable and improve scalability.
- AI responses are validated before being returned to ensure a consistent CRM schema.
- The application is stateless and does not require a database, keeping the implementation simple.

-----------------------------------------------------

## Author Details:
Name: Somula Venkata Syam Prasad Reddy
B.Tech, Computer Science and Engineering, 2026
AI & Full Stack Developer