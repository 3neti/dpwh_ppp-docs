# DevRev Technical Diagrams
Version 1.0  
Date: 2025-11-25

This document contains the key Mermaid diagrams for DevRev:

- **DFD-0** – Context-level data flow  
- **DFD-1** – Decomposition of the main DevRev process  
- **Logical Architecture Diagram** – Component view  
- **Integration Diagram** – Interfaces among DevRev, DPWH.Track, and PCMA  

You can paste these Mermaid blocks into any Mermaid-compatible renderer (e.g., Mermaid Live Editor, MkDocs with Mermaid plugin, Obsidian, VS Code extensions).

---

## 1. DFD-0 – Context Diagram

```mermaid
flowchart LR
    T["DPWH.Track<br/>Field Data Capture"]
    PCMA["PCMA<br/>Project and Contract Management App"]
    MGMT["DPWH Management and<br/>Project Stakeholders"]
    AUD["Auditors and<br/>Oversight Bodies"]

    subgraph DEVREV["DevRev - Project Intelligence Engine"]
        P0[("P0: Consolidate, Analyze,<br/>and Certify Projects")]
    end

    T -->|"Attendance, Materials,<br/>Equipment, Work Reports"| P0
    PCMA -->|"Contract Data,<br/>Baselines, Milestones"| P0
    P0 -->|"Validated Progress,<br/>Milestone Completion"| PCMA
    P0 -->|"Dashboards, Alerts,<br/>Variance Reports"| MGMT
    P0 -->|"Audit Reports,<br/>Certificates, Logs"| AUD
```

---

## 2. DFD-1 – Decomposition of P0 (DevRev Core Process)

This diagram decomposes **P0: Consolidate, Analyze, and Certify Projects** into sub-processes.

```mermaid
flowchart LR
    T["DPWH.Track"]
    PCMA["PCMA System"]
    MGMT["DPWH Management"]
    AUD["Auditors"]

    subgraph DEVREV["DevRev - Internal Processes"]
        P1[("P1: Ingest and<br/>Validate Field Data")]
        P2[("P2: Sync Contract and<br/>Milestone Baselines")]
        P3[("P3: Compute Progress,<br/>EVM and Variance")]
        P4[("P4: Flag Risks and<br/>Exceptions")]
        P5[("P5: Generate Reports and<br/>Certificates")]
        P6[("P6: Update PCMA<br/>with Validated Data")]
    end

    D1[("D1: Project Operational DB")]
    D2[("D2: Analytics Warehouse")]
    D3[("D3: Document and<br/>Certificate Store")]
    D4[("D4: Audit Log Store")]

    T -->|"Raw Field Data"| P1
    P1 -->|"Validated and Normalized Data"| D1

    PCMA -->|"Contract, BOQ,<br/>Milestone Baselines"| P2
    P2 -->|"Baselines and Mappings"| D1

    D1 --> P3
    P3 -->|"Progress Metrics,<br/>EVM, Variance"| D2

    P3 --> P4
    D2 --> P4
    P4 -->|"Risk Flags,<br/>Exception Records"| D2

    P3 --> P5
    P4 --> P5
    P5 -->|"Reports and Certificates"| D3
    P5 -->|"Report Events"| D4

    P3 --> P6
    P5 --> P6
    P6 -->|"Validated Progress,<br/>Milestone Completion"| PCMA

    P5 -->|"Dashboards, Reports"| MGMT
    P5 -->|"Certificates, Audit Reports"| AUD
```

---

## 3. Logical Architecture Diagram (Components)

```mermaid
flowchart TB
    T["DPWH.Track<br/>Field Data System"]
    PCMA["PCMA<br/>Contracts and Baselines"]
    AUTH["DPWH Identity Provider<br/>(SSO / Directory)"]

    subgraph DEVREV["DevRev Platform"]
        subgraph INTEGRATION["Integration Layer"]
            APIGW["API Gateway"]
            T_ADAPTER["DPWH.Track Adapter"]
            PCMA_ADAPTER["PCMA Adapter"]
        end

        subgraph DATA["Data Layer"]
            ODB[("Operational DB")]
            DWH[("Analytics Warehouse")]
            DOCS[("Documents and Files")]
            LOGS[("Audit and Event Logs")]
        end

        subgraph PROCESSING["Processing Layer"]
            ETL["ETL and Validation Services"]
            CALC["Computation and EVM Engine"]
            RULES["Rules and Risk Engine"]
            SCHED["Job Scheduler / Batch Runner"]
        end

        subgraph PRESENTATION["Presentation Layer"]
            DASH["Web Dashboard UI"]
            REPORTS["Reporting and Certificate Generator"]
        end

        subgraph SECURITY["Security and Governance"]
            IAM["Identity and Access Mgmt"]
            MON["Monitoring and Alerting"]
        end
    end

    T -->|"Field Data APIs"| APIGW
    APIGW --> T_ADAPTER
    T_ADAPTER --> ETL
    ETL --> ODB
    PCMA -->|"Contracts and Baselines"| APIGW
    APIGW --> PCMA_ADAPTER
    PCMA_ADAPTER --> ODB

    ODB --> CALC
    CALC --> DWH
    DWH --> RULES
    RULES --> DWH

    SCHED --> CALC
    SCHED --> RULES
    SCHED --> ETL

    DWH --> REPORTS
    REPORTS --> DOCS

    DWH --> DASH

    IAM --> DASH
    AUTH --> IAM

    APIGW --> LOGS
    CALC --> LOGS
    RULES --> LOGS
    REPORTS --> LOGS
    MON --> LOGS
```

---

## 4. Integration Diagram (DevRev, DPWH.Track, PCMA)

```mermaid
sequenceDiagram
    participant Field as DPWH.Track
    participant DevAPI as DevRev API Gateway
    participant DevCore as DevRev Core Services
    participant DevDB as DevRev Data Stores
    participant PCMA as PCMA System

    Field->>DevAPI: POST /api/attendance<br/>POST /api/materials<br/>POST /api/equipment<br/>POST /api/work-reports
    DevAPI->>DevCore: Validate and normalize payloads
    DevCore->>DevDB: Store operational records

    DevCore->>PCMA: GET /projects, /contracts, /milestones
    PCMA-->>DevCore: Project and contract baselines
    DevCore->>DevDB: Store baselines and mappings

    DevCore->>DevDB: Read field data and baselines
    DevCore->>DevCore: Compute progress, EVM, variance
    DevCore->>DevDB: Store metrics and risk flags

    DevCore->>PCMA: POST /milestones/{id}/completion<br/>PUT /projects/{id}/status
    PCMA-->>DevCore: ACK / updated records

    DevCore->>DevDB: Read metrics and status
    DevCore->>DevCore: Generate variance reports and certificates
    DevCore-->>Field: (Optional) status feedback / alerts
    DevCore-->>PCMA: References to certificates / documents
```

---

