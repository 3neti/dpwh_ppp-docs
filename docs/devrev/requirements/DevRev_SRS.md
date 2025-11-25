# DevRev System Requirements Specification (SRS)
Version 1.0  
Date: 2025-11-25

## 1. Introduction

### 1.1 Purpose

This System Requirements Specification (SRS) describes the functional and non-functional requirements for **DevRev**, the Project Intelligence Engine for the Department of Public Works and Highways (DPWH). DevRev consolidates field data from **DPWH.Track (Tracking AI)** and contract data from **PCMA (Project & Contract Management Application)** to compute project performance, identify risks, and generate official project documents such as variance reports and milestone completion certificates.

This SRS will be used by:

- Product owners and DPWH stakeholders  
- System architects and developers  
- Testers and quality assurance teams  
- Integration teams working with DPWH.Track and PCMA

### 1.2 System Overview

DevRev is an intermediate platform that:

1. **Ingests and validates** field data (attendance, materials, equipment, work reports) from DPWH.Track.  
2. **Synchronizes** contract baselines and milestones from PCMA.  
3. **Computes** project progress, performance (e.g., EVM), and variance.  
4. **Flags** delayed or at-risk projects.  
5. **Generates** project reports and milestone completion certificates.  
6. **Updates** PCMA with validated progress and completion information.

### 1.3 Definitions, Acronyms, and Abbreviations

- **DPWH** – Department of Public Works and Highways  
- **PCMA** – Project & Contract Management Application (existing DPWH system)  
- **DPWH.Track** – Field data capture system (Capstone project)  
- **DevRev** – Development Review / Project Intelligence Engine  
- **EVM** – Earned Value Management  
- **BOQ** – Bill of Quantities  
- **RAG** – Red–Amber–Green (traffic light status)  
- **SRS** – System Requirements Specification  
- **OLTP** – Online Transaction Processing  
- **OLAP** – Online Analytical Processing  

### 1.4 References

- DevRev Technical Architecture  
- DevRev Mermaid Diagrams (DFD-0, DFD-1, Logical Architecture, Integration)  
- DPWH PCMA specifications (if available)  
- DPWH.Track specifications (if available)

### 1.5 Scope

This SRS covers:

- Functional requirements of DevRev  
- External interfaces (DPWH.Track, PCMA, users)  
- Data and integrity requirements  
- Non-functional requirements (performance, security, availability, etc.)  

Out of scope:

- Detailed UI design and wireframes  
- Internal implementation details of DPWH.Track or PCMA  
- Organizational and process changes within DPWH

---

## 2. Overall Description

### 2.1 Product Perspective

DevRev is a **middleware and analytics platform** positioned between DPWH.Track and PCMA. It does not replace either system. Instead, it enhances DPWH’s capability to:

- Use field data to monitor real progress  
- Enforce data completeness and consistency  
- Provide timely insights and formal project artifacts  

High-level context (from DFD-0):

- **Inputs:** Field data (DPWH.Track), contract baselines and milestones (PCMA)  
- **Outputs:** Progress metrics, variance reports, risk flags, milestone completion certificates, and updates back to PCMA

### 2.2 Product Functions (High-Level)

- **Data ingestion and validation** from DPWH.Track  
- **Baseline synchronization** from PCMA  
- **Project progress calculation** (percentage completion, quantities accomplished)  
- **EVM and variance analysis** (schedule variance, cost variance)  
- **Risk and anomaly detection** (e.g., missing data, inconsistent material usage)  
- **Reporting and certificate generation**  
- **Integration with PCMA** (push updated milestones and project status)  
- **Dashboard and visualization for DPWH stakeholders**

### 2.3 User Classes and Characteristics

1. **System Administrator**  
   - Manages configurations, user accounts, roles, and system parameters.  
   - High technical literacy.

2. **Central Office Analyst / Monitoring Staff**  
   - Monitors nationwide or regional project performance.  
   - Requires dashboards, exportable reports, drill-down capabilities.

3. **Regional / District Engineer**  
   - Focuses on projects within their jurisdiction.  
   - Needs project-level dashboards, alerts, and milestone certificates.

4. **Project Engineer / Resident Engineer**  
   - Directly involved with specific project sites.  
   - Reviews daily data, resolves exceptions, supports certificate preparation.

5. **Auditor / Oversight Body**  
   - Requires access to read-only data, audit logs, certificates, and supporting evidence.  

6. **Contractor Representative (Optional / Limited)**  
   - May access limited project data for validation of progress and certificates.

### 2.4 Operating Environment

- Web-based application, accessible over secure HTTP (HTTPS).  
- Server-side stack aligned with DPWH’s IT standards (e.g., Linux-based servers, PostgreSQL/MySQL DB).  
- Integration with DPWH internal network or secure VPN for PCMA access.  
- Browser-based UI (modern browsers: Chrome, Edge, Firefox).

### 2.5 Design and Implementation Constraints

- Must integrate with existing **PCMA** which may impose protocol or data model constraints.  
- Must operate under DPWH's IT security policies.  
- Must accommodate intermittent connectivity with remote project sites (in terms of ingestion, queueing, retries).  
- Must adhere to government data retention and archiving policies.

### 2.6 User Documentation

- User manuals for each role (Admin, Analyst, Engineer, Auditor).  
- Online help and tooltips within the dashboard.  
- API documentation for DPWH.Track and PCMA system integrators.

### 2.7 Assumptions and Dependencies

- DPWH.Track services are available and provide field data via supported interfaces.  
- PCMA exposes integration endpoints or mechanisms to exchange data.  
- DPWH provides user identity source (or DevRev provides standalone IAM).  
- Network connectivity between DevRev and the two external systems is available and secure.

---

## 3. System Features and Functional Requirements

### 3.1 Feature Group A – Data Ingestion from DPWH.Track

#### 3.1.1 Description

DevRev must ingest field data from DPWH.Track: attendance, materials receiving, materials withdrawal, equipment logs, and work performance reports.

#### 3.1.2 Functional Requirements

**FR-A1: Receive Attendance Data**  
- The system shall provide an API endpoint to receive daily attendance records from DPWH.Track.  
- Each record shall include at least: worker ID (or crew ID), project ID, date, time-in, time-out (if any), role, and GPS/location (optional).  
- The system shall enforce the rule: **if time-out is missing, the attendance is not counted as rendered work hours**.

**FR-A2: Receive Materials Receiving Data**  
- The system shall provide an API endpoint to receive materials receiving data.  
- Each record shall include: project ID, item code, quantity received, unit, delivery receipt reference, receiving date, receiving officer identifier, supporting files (upload references).  
- The system shall link to uploaded photos and documents (delivery receipts, pictures of materials) via URI or file ID.

**FR-A3: Receive Materials Withdrawal Data**  
- The system shall provide an API endpoint to receive materials withdrawal records.  
- Each record shall include: project ID, item code, quantity withdrawn, date, authorizing officer, purpose or work activity reference.  
- The system shall allow cross-referencing with materials receiving records.

**FR-A4: Receive Equipment Logs**  
- The system shall provide an API endpoint to receive equipment logs.  
- Each record shall include: project ID, equipment ID, serial number, date, hours used, and equipment photo reference.

**FR-A5: Receive Work Performance Reports**  
- The system shall provide an API endpoint to receive work performance reports (daily).  
- Each record shall include: project ID, date, list of BOQ items or activities worked on, quantities accomplished, photos (before/after), and narrative remarks.

**FR-A6: Data Validation and Error Handling**  
- The system shall validate required fields and reject or flag records with missing critical data (e.g., project ID, date).  
- The system shall log ingestion errors and expose them via an admin/technical monitoring interface.  
- The system may accept partial data but flag them for follow-up (e.g., missing supporting documents).

---

### 3.2 Feature Group B – Contract Baseline and Milestone Synchronization from PCMA

#### 3.2.1 Description

DevRev must obtain project master data, contract details, BOQ items, and milestone definitions from PCMA.

#### 3.2.2 Functional Requirements

**FR-B1: Project Master Synchronization**  
- The system shall retrieve the list of active projects from PCMA, including project ID, name, location, implementing office, contract amount, start date, and end date.  
- The system shall maintain mappings between PCMA project IDs and DevRev internal project IDs (if different).

**FR-B2: Contract and BOQ Synchronization**  
- The system shall retrieve BOQ items for each project, including item codes, descriptions, unit, and contract quantity.  
- The system shall store BOQ in a structure suitable for progress computation.

**FR-B3: Milestone Definition Synchronization**  
- The system shall retrieve milestone definitions (e.g., mobilization, specific percentage completion markers, segment-based milestones).  
- The system shall link milestones to BOQ items and/or time-based schedule.

**FR-B4: Update Handling**  
- The system shall handle updates from PCMA (e.g., change orders, revised schedules).  
- The system shall maintain version history of contract baselines and milestones.

---

### 3.3 Feature Group C – Project Progress Computation

#### 3.3.1 Description

DevRev must compute project percentage completion, EVM indicators, and other performance metrics using field data and contract baselines.

#### 3.3.2 Functional Requirements

**FR-C1: Quantity-Based Progress Calculation**  
- The system shall compute quantities accomplished based on work performance reports mapped to BOQ items.  
- The system shall calculate percentage completion for each BOQ item and aggregate to project-level completion.

**FR-C2: Time and Resource Contribution (Optional Enhancement)**  
- The system may correlate attendance, equipment usage, and materials consumption with progress to detect anomalies (e.g., high attendance but low quantities).

**FR-C3: Earned Value Management (EVM)**  
- The system shall compute key EVM metrics such as:  
  - Planned Value (PV)  
  - Earned Value (EV)  
  - Actual Cost (AC) (if cost data is available)  
  - Schedule Variance (SV) = EV - PV  
  - Cost Variance (CV) = EV - AC  
- The system shall provide EVM metrics at both project-level and major milestone level where data is sufficient.

**FR-C4: Schedule Comparison and Slippage**  
- The system shall compare actual progress vs. planned progress from schedule baselines.  
- The system shall compute schedule slippage (e.g., days behind, percentage behind).

**FR-C5: Milestone Completion Evaluation**  
- The system shall evaluate if a milestone is achieved based on predefined criteria (e.g., percentage completion of specific BOQ items).  
- The system shall tag milestones as: Not Started, In Progress, Completed, or Delayed.

---

### 3.4 Feature Group D – Risk and Anomaly Detection

#### 3.4.1 Description

DevRev must detect data inconsistencies, missing information, and risk indicators.

#### 3.4.2 Functional Requirements

**FR-D1: Data Completeness Checks**  
- The system shall detect missing daily work reports for active projects.  
- The system shall detect missing attendance data on working days.  
- The system shall detect missing supporting documents for materials receiving and withdrawal.

**FR-D2: Logical Consistency Rules**  
- The system shall detect materials withdrawal without prior materials receipt for the same item and project.  
- The system shall detect large discrepancies between materials consumed and quantities accomplished (beyond configurable thresholds).  
- The system shall detect equipment logs that have no corresponding work reports.

**FR-D3: Schedule Risk Detection**  
- The system shall flag projects where current run rate is insufficient to finish by target completion date.  
- The system shall categorize risk levels (e.g., low, medium, high) based on configurable thresholds.

**FR-D4: RAG (Red–Amber–Green) Status**  
- The system shall assign each project a RAG status derived from schedule performance, data completeness, and anomaly indicators.  
- The system shall provide a summary view of all projects with their RAG status.

---

### 3.5 Feature Group E – Reporting and Certificate Generation

#### 3.5.1 Description

DevRev must produce user-friendly project reports and official milestone completion certificates with DPWH branding, watermarks, and verification features.

#### 3.5.2 Functional Requirements

**FR-E1: Project Variance Report**  
- The system shall generate a project variance report containing:  
  - Project details  
  - Planned vs. actual progress  
  - EVM metrics (if available)  
  - Schedule slippage  
  - Key anomalies and risk flags  
- The report shall be exportable as PDF and optionally as Excel/CSV.

**FR-E2: Portfolio / Regional Summary Report**  
- The system shall generate summary reports for a group of projects (e.g., by region, district, funding source).  
- The report shall show RAG status, major variance metrics, and counts of at-risk projects.

**FR-E3: Milestone Completion Certificate**  
- The system shall generate a **Certificate of Completion of Milestone** with:  
  - DPWH branding, watermark, and official seal (graphic)  
  - Project details and milestone details  
  - Summary of supporting evidence (data-driven)  
  - Signatory placeholders or integrated digital signature blocks  
  - A QR code that links to an online verification page  
  - A unique reference ID and cryptographic hash for authenticity

**FR-E4: Certificate Management**  
- The system shall store generated certificates and allow re-download.  
- The system shall maintain status of certificates (Draft, Issued, Superseded, Revoked).  
- The system shall prevent deletion of issued certificates; instead, allow supersession with traceable reason.

**FR-E5: Audit Reports**  
- The system shall generate audit-focused reports containing logs of key events (e.g., milestone status changes, certificate issuance).

---

### 3.6 Feature Group F – PCMA Update and Synchronization

#### 3.6.1 Description

DevRev must push validated progress and milestone completion status to PCMA.

#### 3.6.2 Functional Requirements

**FR-F1: Push Milestone Completion**  
- The system shall push milestone completion data (status, completion date, percentage) to PCMA via supported interface.  
- The system shall handle retries and record success/failure status.

**FR-F2: Update Project Status**  
- The system shall push project-level status (e.g., On Track, Delayed, Completed) and percentage completion to PCMA.

**FR-F3: Idempotency and Conflict Handling**  
- The system shall uniquely identify update transactions to avoid duplicate postings.  
- The system shall handle conflict responses from PCMA (e.g., if PCMA has been updated manually) and flag them for manual review.

**FR-F4: Logging of Synchronization**  
- The system shall log each synchronization attempt and its outcome for audit purposes.

---

### 3.7 Feature Group G – Dashboard and User Interface

#### 3.7.1 Description

DevRev must provide a web-based dashboard for different user roles.

#### 3.7.2 Functional Requirements

**FR-G1: Project List View**  
- The system shall display a list of projects with key indicators (RAG status, percentage completion, delay, last update).  
- The list shall support filtering by region, district, contractor, and status.

**FR-G2: Project Detail View**  
- The system shall display detailed information for a project:  
  - Baseline and current status  
  - Daily progress timeline  
  - EVM metrics  
  - Data completeness indicators  
  - List of generated reports and certificates

**FR-G3: Risk & Exception Dashboard**  
- The system shall display a list of open anomalies and risk flags per project.  
- Users shall be able to drill down to see details of each anomaly.

**FR-G4: Certificate Management UI**  
- The system shall provide a UI for viewing, generating, and managing milestone certificates.

**FR-G5: Role-Based Access Control**  
- The system shall restrict access to views and actions based on user roles and assigned organizational scope (e.g., region, district).

---

### 3.8 Feature Group H – Administration and Configuration

#### 3.8.1 Functional Requirements

**FR-H1: User and Role Management**  
- The system shall allow administrators to create, update, deactivate user accounts.  
- The system shall support role-based access control and configurable permissions.

**FR-H2: Threshold and Rule Configuration**  
- The system shall allow authorized users to configure thresholds for risk levels, variance triggers, and anomaly rules.  
- Changes to configurations shall be logged with user, timestamp, and old vs. new values.

**FR-H3: Integration Configuration**  
- The system shall allow configuration of integration endpoints and credentials (for DPWH.Track and PCMA) in a secure manner.

**FR-H4: System Monitoring and Logs**  
- The system shall expose basic health metrics and logs for administrators to monitor system status and diagnose issues.

---

## 4. External Interface Requirements

### 4.1 User Interfaces

- Web-based dashboard (responsive design for desktops and tablets; mobile optimization as a stretch goal).  
- Localization/translation support as needed (initially English, with potential support for Filipino).

### 4.2 APIs

- RESTful APIs for data ingestion from DPWH.Track (JSON).  
- REST/SOAP/file-based APIs for integration with PCMA, depending on PCMA’s capabilities.  
- Secure authentication and authorization on all APIs (e.g., API keys, OAuth2).

### 4.3 Hardware Interfaces

- Servers and storage infrastructure as provided by DPWH or hosting provider.  
- No direct hardware integration (sensors, scanners) in phase 1; those are handled via DPWH.Track or other subsystems.

### 4.4 Software Interfaces

- Operating system: Linux-based servers (e.g., Ubuntu, RHEL)  
- Database: PostgreSQL or MySQL/MariaDB  
- Web server: Nginx/Apache or cloud equivalent  
- Integration with DPWH identity provider (LDAP/AD, SAML, or OAuth SSO) if available.

### 4.5 Communications Interfaces

- HTTPS (TLS) for all external communication.  
- Possible use of VPN or secure tunnel for integration with on-premise PCMA.  

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements

- The system shall support ingestion of daily data for at least **hundreds of projects**, with potential scaling to thousands.  
- The system shall process typical API requests (e.g., retrieving project dashboard data) with a response time under **2 seconds** under normal load.  
- Batch computations (e.g., nightly EVM and variance calculations) shall complete within a defined window (e.g., 1–2 hours) for all active projects.

### 5.2 Safety Requirements

- While the system does not directly control physical equipment, it impacts decision-making on public infrastructure projects.  
- The system must ensure data integrity to avoid misleading decisions that may compromise project quality or public safety.

### 5.3 Security Requirements

- All network communications shall use TLS (HTTPS).  
- Data at rest (database and document storage) shall support encryption.  
- Access control shall implement the principle of least privilege.  
- Authentication shall be required for all user interactions and API calls (except explicitly public verification endpoints, if any).  
- Security logs shall capture authentication attempts, permission changes, and key administrative actions.

### 5.4 Reliability & Availability

- The system shall target an uptime of at least 99.5% for production.  
- The system shall implement mechanisms for graceful degradation (e.g., queueing updates if PCMA is temporarily unavailable).  
- Regular backups and tested restore procedures shall be in place.

### 5.5 Maintainability

- Codebase shall be modular, with clear separation of ingestion, processing, reporting, and integration modules.  
- Configuration shall be externalized (e.g., environment variables, configuration files) to avoid code changes for parameter adjustments.  
- Logging and error handling shall be standardized and consistent.

### 5.6 Portability

- The system should be deployable on-premise or in a government-approved cloud environment.  
- Minimal platform-specific dependencies.

---

## 6. Other Requirements

### 6.1 Data Retention and Archiving

- Project operational data and computed metrics should be retained in line with government policies (e.g., minimum number of years after project completion).  
- Older, inactive project data may be archived to lower-cost storage but must remain retrievable for audits.

### 6.2 Legal and Compliance

- The system shall comply with relevant data protection and government IT regulations in the Philippines.  
- The system shall store sufficient evidence (logs, hashes, document records) to support legal or administrative review of project performance and certificates.

### 6.3 Future Enhancements (Non-binding)

- Integration with drone and satellite imagery for automated progress estimation.  
- Machine learning models for more accurate delay prediction.  
- Public portal to display high-level project status for citizen transparency.

---

## 7. Appendices

### 7.1 Glossary

(Expanded definitions can be added here as needed.)

---

This SRS serves as the foundation for **DevRev’s design, implementation, and testing**.  
It is expected to evolve as DPWH finalizes integration details with DPWH.Track and PCMA, and as pilot deployments generate new insights.
