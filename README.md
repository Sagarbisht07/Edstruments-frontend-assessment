# Edstruments Dynamic Filter Component System

A production-grade, configuration-driven filtering system built with **React 18**, **TypeScript**, and **Material UI**. This project demonstrates a scalable approach to building reusable UI components that can work across any dataset.

---

## 📸 UI Showcase

<img width="1807" height="943" alt="image" src="https://github.com/user-attachments/assets/807d97c6-902b-4986-be8d-35ca41257711" />
<img width="1683" height="1176" alt="image" src="https://github.com/user-attachments/assets/698b6ffb-c596-4f3c-960e-196b47aee060" />
---

## 🛠️ Technical Stack

| Tech | Choice Rationale |
|---|---|
| **React 18** | Leverages `useMemo` for high-performance filtering and `useCallback` to prevent unnecessary re-renders of complex filter rows. |
| **TypeScript** | Enforces strict typing for `FieldType`, `Operator`, and `FilterValue`, reducing runtime errors in complex conditional logic. |
| **Material UI (MUI)** | Chosen for its robust component ecosystem. Customized with a premium dark theme and glassmorphism effects. |
| **Vite** | Provides an extremely fast HMR (Hot Module Replacement) experience during development. |
| **Lucide React** | Low-overhead, tree-shakeable iconography that fits the modern aesthetic. |
| **Dayjs** | Lightweight date manipulation library required for MUI's X-Date-Pickers. |

---

## 🏗️ Architecture & Core Concepts

### 1. Configuration-Driven UI
The system is built on the principle of **Inversion of Control**. Instead of hardcoding filter logic for the "Employees" table, the UI is driven by a `FieldDefinition[]` array. 
*   **Result**: You can swap the employee config for a "Transactions" or "Products" config, and the entire filter panel (including input types and operators) adjusts automatically.

### 2. The Filtering Engine (`filterEngine.ts`)
The engine handles the heavy lifting of data processing separately from the UI.
*   **AND/OR Logic**: Implements a "Grouped OR" strategy. Conditions on the **same field** (e.g., City: SF OR City: NYC) are treated as OR, while conditions on **different fields** are treated as AND.
*   **Dot-Notation Support**: Uses a recursive path resolver (`getNestedValue`) to filter through deeply nested objects (e.g., `address.city`).
*   **Case-Insensitivity**: All string-based comparisons are normalized to lowercase for a better UX.

### 3. State Management Hook (`useFilter.ts`)
Encapsulates all logic for adding, updating, and removing filters, as well as the debounced application of those filters to the view.

---

## 🚀 Key Features & Bonus Implementations

### 🔥 Core Features
- [x] **7 Dynamic Field Types**: Full support for Text, Number, Date, Amount (with currency), Single-Select, Multi-Select, and Boolean.
- [x] **Smart Operator Mapping**: Operators change dynamically based on the field type (e.g., `between` for dates vs. `starts_with` for text).
- [x] **Array Filtering**: Handles "Skills" arrays with `IN` and `NOT IN` operators.

### ✨ Bonus Points (+10)
- [x] **Persistence**: Filters are persisted in `localStorage`. Page refreshes restore exactly where you left off.
- [x] **Real-Time Debounce**: A 300ms debounce ensures the table updates live as you type, without sacrificing performance.
- [x] **Export System**: Capability to export currently filtered results to **CSV** or **JSON**.
- [x] **Regex Operator**: Power-user support for Regular Expression patterns in text fields.
- [x] **Accessibility (A11y)**: Aria-labels on all interactive inputs and full keyboard/focus safety.

---

## ⚖️ Tradeoffs & Decisions

### Client-Side vs. Server-Side Filtering
*   **Decision**: This implementation performs all filtering on the **client**. 
*   **Tradeoff**: 
    - *Pro*: Instant real-time updates and zero latency after the initial data load. 
    - *Con*: For datasets exceeding ~10,000 records, a server-side approach (passing conditions as Query Params) would be required to maintain browser performance.

### Debounce vs. Manual Apply
*   **Decision**: Implemented both.
*   **Rationale**: Debouncing provides modern "live search" feel, while the "Apply" button serves as an explicit "commit" action for heavy queries.

### Persistence Strategy
*   **Decision**: Used `localStorage` for `appliedConditions`.
*   **Rationale**: URL-based state (Query Params) is often better for sharing links, but `localStorage` is cleaner for a technical assessment focused on persisting user preferences across sessions.

---

## ⚙️ Development Setup

1.  **Clone & Install**:
    ```bash
    npm install
    ```
2.  **Dev Server**:
    ```bash
    npm run dev
    ```
3.  **Build**:
    ```bash
    npm run build
    ```

---
*Developed for the Edstruments Frontend Developer Assessment.*
