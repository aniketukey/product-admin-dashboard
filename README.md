# Product Admin Dashboard

A responsive Product Admin Dashboard built using Next.js, React, Tailwind CSS, and Axios with the DummyJSON API.

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Axios
- DummyJSON API

## Features

### Authentication

- Login using DummyJSON authentication
- Protected product pages
- Logout functionality
- Invalid login error handling
- Login button disabled while request is in progress

### Product Management

- View product list
- Responsive desktop table
- Responsive mobile product cards
- Product details page
- Add product
- Edit product
- Delete product
- Delete confirmation dialog
- Form validation
- Loading states
- Error states
- Retry functionality
- Empty search results state

### Search, Filter and Sort

- Debounced product search
- Category filtering
- Price sorting
- Rating sorting
- Title sorting
- Search + category filtering
- Pagination
- Page size selection: 10, 20 and 50

### URL State

The following values are stored in the URL:

- Page
- Page size
- Search
- Category
- Sort

Example:

```text
/products?page=2&pageSize=20&search=phone&category=smartphones&sort=price-asc
```

Invalid URL values are handled gracefully.

## Login Credentials

Use the following DummyJSON credentials:

**Username**

```text
emilys
```

**Password**

```text
emilyspass
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd product-admin-dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open:

```text
http://localhost:3000
```

## API

This project uses the DummyJSON API:

```text
https://dummyjson.com
```

All API requests are made using Axios.

A shared Axios instance is used for API communication and authentication token handling.

## Project Structure

```text
src/
├── app/
│   ├── login/
│   │   └── page.js
│   │
│   ├── products/
│   │   ├── [id]/
│   │   │   ├── page.js
│   │   │   └── edit/
│   │   │       └── page.js
│   │   │
│   │   ├── add/
│   │   │   └── page.js
│   │   │
│   │   └── page.js
│   │
│   └── page.js
│
├── components/
│   ├── Navbar.js
│   ├── SearchBar.js
│   ├── CategoryFilter.js
│   ├── SortSelect.js
│   ├── ProductTable.js
│   ├── ProductCard.js
│   ├── Pagination.js
│   ├── EmptyState.js
│   ├── ErrorState.js
│   └── DeleteButton.js
│
├── hooks/
│   └── useDebounce.js
│
├── lib/
│   └── axios.js
│
└── services/
    ├── authService.js
    └── productService.js
```

## Implementation Decisions

### Shared Axios Instance

A shared Axios instance is used instead of creating Axios requests separately inside every component.

The Axios instance:

- Uses DummyJSON as the base URL
- Adds the authentication token to requests
- Handles authentication errors centrally

### Search Debouncing

Product search uses a debounce mechanism so that an API request is not made for every individual keystroke.

The application waits briefly after the user stops typing before making the search request.

### Search Race Condition

Multiple search requests can finish in a different order than they were sent.

To prevent an older response from replacing a newer search result, the product page uses a request ID to ensure that only the latest request updates the UI.

### Search + Category Filtering

DummyJSON does not provide a combined search and category endpoint.

When both search and category are selected:

1. Search results are fetched.
2. The results are filtered by category on the client.
3. Pagination is applied to the filtered results.

This provides combined search and category filtering without relying on an unsupported API combination.

### URL State

Page, page size, search, category and sort values are stored in the URL.

This allows the current dashboard state to be:

- Refreshed without losing filters
- Shared through a URL
- Restored from browser navigation

Invalid URL values are validated before being used.

### Duplicate Requests

Loading states are used to prevent duplicate Login, Add, Edit and Delete requests caused by repeated button clicks.

## Known API Behavior

DummyJSON is used as a mock REST API.

Add, update and delete operations are simulated by the API and should not be treated as permanent database persistence.

The application handles the API response and updates the current UI accordingly.

## Problem Encountered and Fix

### Problem: Search Race Condition

When searching quickly, multiple API requests can be sent before previous requests finish.

For example:

```text
phone
phones
phone case
```

An older request could finish after the newest request and incorrectly replace the latest results.

### Fix

A request ID is generated for every product request.

Only the response belonging to the latest request is allowed to update the product list.

This prevents stale search results from overwriting newer results.

## AI Assistance

AI tools were used during development for:

- Understanding Next.js concepts
- Understanding the DummyJSON API
- Component structure
- Debugging errors
- Implementing API service functions
- Implementing search, filtering, sorting and pagination
- Reviewing implementation approaches

All generated code was reviewed, tested and integrated into the project manually.

## Deployment

The application is deployed using Vercel.

Live deployment URL:

```text
https://product-admin-dashboard-e100zxbs8-aniketukey.vercel.app/login
```