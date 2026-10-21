# SIH Code Mavericks: Multilingual Admission Assistant

A multilingual, step-by-step college admission guide built by team **Code Mavericks** for the Smart India Hackathon.
It walks a student from language selection through quota and branch choice, document checklist, a guided chatbot
questionnaire, and a final summary.

## Features

- Language selector with saved preference (`localStorage`) and translated UI
- Guided flow: Welcome, About, Admission (quota and branch), Documents, Chatbot, Summary
- Document upload step with per-document tracking
- Course data and chatbot questions kept in `src/data/` for easy editing

## Tech stack

React 18, TypeScript, Vite, Tailwind CSS, Lucide icons, Supabase client.

## Run locally

```bash
npm install
npm run dev
```

## Project layout

```
src/
  components/   page and UI components
  data/         courses, chatbot questions, translations
  hooks/        useTranslation
  types/        shared TypeScript types
```

## License

MIT. See [LICENSE](LICENSE).
