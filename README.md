# RentalCar

RentalCar is a modern car rental web application built with Next.js and TypeScript.

The application allows users to browse available cars, filter them by different criteria, view detailed information, and send rental requests.

## Live Demo

[Live Website](YOUR_DEPLOY_LINK)

## GitHub Repository

[GitHub Repository](YOUR_GITHUB_LINK)

---

## Features

- Home page with hero section
- Car catalog with backend filtering
- Infinite pagination with Load More
- Car details page
- Rental booking form
- Custom calendar UI for booking form
- Favorite button UI on car cards
- Notifications after successful booking
- Responsive UI
- Custom animated loader
- Backend API integration

---

## Tech Stack

- Next.js
- TypeScript
- TanStack Query
- Axios
- CSS Modules
- React Hot Toast
- React Icons

---

## Project Structure

```txt
app/
components/
hooks/
lib/
types/
public/
```

---

## Pages

### `/`

Home page with hero section and navigation to catalog.

### `/catalog`

Catalog page with:
- cars list
- filtering
- pagination
- load more functionality

### `/catalog/[carId]`

Car details page with:
- detailed information
- car image
- rental form

---

## Filters

Users can filter cars by:

- brand
- rental price
- mileage from
- mileage to

Filtering is implemented on the backend.

---

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_LINK
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.study
```

---

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## Deployment

The project is deployed on Vercel.

---

## Author

Yevhenii Mykhailov

Junior Frontend Developer focused on React and Next.js development.