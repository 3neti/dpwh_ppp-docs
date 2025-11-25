# DPWH PPP Documentation

This repository contains the MkDocs documentation site for DPWH Public-Private Partnership (PPP) projects.

## Overview

The DPWH PPP Documentation provides comprehensive information about Public-Private Partnership projects, processes, legal frameworks, and guidelines for infrastructure development.

## Contents

The documentation includes:

- **Key Documents**: Executive briefs, briefers, and concept notes
- **Project Planning**: Feasibility studies, timelines, and fee schedules
- **Legal & Regulatory**: Legal frameworks, concession agreements, and NEDA documentation
- **DevRev System**: Development review system documentation including architecture, requirements, and integration guides
- **Supporting Materials**: Presentations and PDF resources

## Getting Started

### Prerequisites

- Python 3.11 or higher
- pip (Python package manager)

### Installation

1. Clone this repository or navigate to the project directory:
```bash
cd ~/Documents/dpwh_ppp-docs
```

2. Install the required dependencies:
```bash
pip install -r requirements.txt
```

### Running Locally

To serve the documentation locally:

```bash
mkdocs serve
```

The site will be available at `http://127.0.0.1:8000/`

### Building the Site

To build the static site:

```bash
mkdocs build
```

The built site will be in the `site/` directory.

## Project Structure

```
dpwh_ppp-docs/
├── docs/                    # Documentation source files
│   ├── index.md            # Homepage
│   ├── *.md                # Markdown documentation files
│   ├── devrev/             # DevRev system documentation
│   │   ├── architecture/   # Technical architecture & diagrams
│   │   ├── requirements/   # SRS & glossary
│   │   ├── development/    # Development plan
│   │   ├── pitch/          # Executive pitch document
│   │   └── integration/    # Nova OIDC integration
│   ├── *.pdf               # PDF resources
│   └── *.pptx              # Presentation files
├── mkdocs.yml              # MkDocs configuration
├── requirements.txt        # Python dependencies
├── .readthedocs.yaml       # ReadTheDocs configuration
└── README.md               # This file
```

## Documentation

All documentation files are written in Markdown and located in the `docs/` directory. The site uses the Material for MkDocs theme with various extensions for enhanced functionality.

## Deployment

This project is configured for deployment on ReadTheDocs. The `.readthedocs.yaml` file contains the necessary configuration.

## Contributing

When adding new documents:

1. Place markdown files in the `docs/` directory
2. Update the navigation in `mkdocs.yml`
3. Test locally with `mkdocs serve`
4. Build and verify with `mkdocs build`

## License

This documentation is maintained by the DPWH PPP Team.

## Support

For questions or issues, please contact the DPWH PPP Unit.

---

*Built with [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)*
