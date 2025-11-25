# DPWH PPP MkDocs Project

## Project Setup

This MkDocs documentation site was created on 2025-11-20 for the DPWH Public-Private Partnership documentation.

## Source Content

### Original PPP Content
Copied from `/Users/rli/Documents/DPWH/PPP/` including:
- 10 Markdown files (*.md)
- 10 PDF files (*.pdf)
- 1 PowerPoint presentation (*.pptx)

### DevRev System Documentation (Added 2025-11-25)
Copied from `/Users/rli/Downloads/DevRev/` including:
- DevRev_Technical_Architecture.md
- DevRev_Technical_Diagrams.md (renamed from Mermaid Diagrams)
- DevRev_SRS.md (System Requirements Specification)
- DevRev_Glossary.md
- DevRev_Development_Plan.md
- DevRev_Pitch_Document_DPWH.md
- DevRev_Nova_OIDC_ERD_and_Flow.md

## Template Reference

The project structure and configuration were based on the template from `/Users/rli/Documents/enf-docs/`, including:
- MkDocs configuration with Material theme
- Navigation structure
- Markdown extensions
- ReadTheDocs integration
- Python requirements

## Project Structure

```
dpwh_ppp-docs/
├── docs/
│   ├── index.md                          # Homepage
│   ├── Executive_Brief.md                # Key Documents
│   ├── Briefer.md
│   ├── Concept_Note.md
│   ├── Feasibility_Study_Outline.md     # Project Planning
│   ├── Swiss_Challenge_Timeline.md
│   ├── Fee_Schedule.md
│   ├── Legal_Framework.md               # Legal & Regulatory
│   ├── Concession_Agreement_Draft.md
│   ├── Cover_Letter_DPWH.md
│   ├── NEDA_ICC_Issue_Paper.md
│   ├── [PDF versions of all documents]
│   └── DPWH_PPP_20slide.pptx
├── mkdocs.yml                            # Main configuration
├── requirements.txt                      # Python dependencies
├── .readthedocs.yaml                    # ReadTheDocs config
├── .gitignore                           # Git ignore rules
└── README.md                            # Project documentation

## Navigation

The site is organized into four main sections:
1. **Key Documents** - Executive-level materials
2. **Project Planning** - Planning and timeline documents
3. **Legal & Regulatory** - Legal framework and compliance
4. **DevRev System** - Development review system documentation
   - Overview
   - Architecture (Technical Architecture, Technical Diagrams)
   - Requirements (SRS, Glossary)
   - Development (Development Plan)
   - Pitch & Overview (DPWH Pitch Document)
   - Integration (Nova OIDC Integration)

## Usage

### Local Development
```bash
mkdocs serve
```
Visit: http://127.0.0.1:8000/

### Build Static Site
```bash
mkdocs build
```

### Deploy to ReadTheDocs
Push to a git repository and connect to ReadTheDocs - configuration is ready.

## Theme Customization

Current theme settings:
- Material theme with blue color scheme
- Light/dark mode toggle
- Navigation tabs and sections
- Search functionality
- Code highlighting
- Mermaid diagram support

## Next Steps

- [ ] Initialize git repository if needed
- [ ] Add custom logo/favicon if available
- [ ] Review and enhance markdown content
- [ ] Set up git remote and deploy to ReadTheDocs
- [ ] Customize theme colors if desired
