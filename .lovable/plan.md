

# PIMO Play Clone - Updated Implementation Plan

Adding a **Local Storage** tab for persistent YAML configurations alongside the existing YAML and Graph tabs.

---

## 🎯 Overview

**What we'll build:**
- A single-page playground application mirroring the PIMO Play interface
- Three-panel editor layout (Masking Config, Input, Output)
- Monaco Editor integration for professional code editing
- Pre-built example templates for common masking scenarios
- Graph visualization view for masking configuration
- **NEW: Local storage tab for persistent user configurations**
- API service layer configured for `localhost:8080/pimo/exec` with mock fallback

---

## 📐 Layout & Design

### Header
- "PIMO Play" title with version subtitle
- Clean, dark header bar

### Main Editor Interface (3 Panels)

#### Left Panel - Masking Configuration (~50% width)
**Three Tabs:**
1. **YAML** - Standard editing mode (in-memory)
2. **Graph** - Visual node representation
3. **Local** - Persistent localStorage-backed YAML editor

**Local Tab Features:**
- Monaco Editor with YAML syntax
- Auto-saves to localStorage on changes (with debounce)
- "Save" button for explicit saves
- "Load to Editor" button to copy local config to main YAML tab
- Visual indicator showing last saved timestamp
- Clear/reset option

#### Right Panel - Input/Output (~50% width)
- **Top**: JSON Input editor with Monaco
- **Bottom**: JSON Output display (read-only)
- Resizable split between input/output

### Sidebar - Examples Section
- Collapsible accordion with 17 pre-built examples
- Click to load into YAML editor

---

## ✨ Features

### Core Functionality
1. **YAML Tab** - Main editing mode, ephemeral
2. **Graph Tab** - Visual pipeline representation
3. **Local Tab** - Persistent configuration storage
4. **JSON Input/Output** - Data masking preview
5. **Examples Sidebar** - Quick-load templates

### Local Storage Tab Details
- Stores YAML config in `localStorage` under key `pimo-local-config`
- Loads saved config on app startup
- Can execute masking directly from Local tab
- Option to "Use as Template" - copies to main YAML tab
- Survives browser refresh and sessions

### API Integration
- `POST /pimo/exec` endpoint ready
- Mock responses for development mode
- Works with any of the three tabs as config source

---

## 🔧 Technical Approach

### Components Structure
```
src/
├── components/
│   ├── Layout/
│   │   └── PimoHeader.tsx
│   ├── Editors/
│   │   ├── MaskingConfigPanel.tsx (tab container)
│   │   ├── YamlEditor.tsx
│   │   ├── GraphView.tsx
│   │   ├── LocalStorageEditor.tsx (NEW)
│   │   ├── InputEditor.tsx
│   │   └── OutputViewer.tsx
│   ├── Examples/
│   │   └── ExamplesSidebar.tsx
│   └── ui/...
├── hooks/
│   └── useLocalStorage.ts (NEW)
├── services/
│   └── pimoApi.ts
├── data/
│   └── examples.ts
└── pages/
    └── Index.tsx
```

### Local Storage Hook
```typescript
// useLocalStorage hook for reactive persistence
- Auto-sync with localStorage
- Debounced saves to prevent performance issues
- Default example config on first visit
```

---

## 📦 Deliverables

1. Complete PIMO Play clone with Monaco editors
2. Three-tab config panel (YAML, Graph, Local)
3. Persistent localStorage integration
4. Graph visualization component
5. 17 example templates
6. Mock API service layer
7. Ready for Golang backend connection

