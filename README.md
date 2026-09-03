# Portfolio CMS

A monochrome, editorial personal-portfolio site with a full Firebase-backed admin
dashboard. Every visible piece of content — hero, projects, about, contact info,
navigation, social links, and site settings — is stored in Firestore and editable
from `/admin` without touching code.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- React Router
- Firebase Authentication, Firestore, Storage

## 1. Install

```bash
npm install
```

## 2. Create a Firebase project

1. Go to the [Firebase Console](https://console.firebase.google.com) and create a project.
2. Add a **Web app** and copy the config values.
3. Enable **Authentication → Sign-in method → Email/Password**.
4. Enable **Firestore Database** (production mode).
5. Enable **Storage**.

Copy `.env.example` to `.env` and fill in the values from your Firebase web app config:

```bash
cp .env.example .env
```

## 3. Deploy security rules

Install the Firebase CLI if you don't have it, then from the project root:

```bash
npm install -g firebase-tools
firebase login
firebase init firestore storage   # point at this project, keep the existing rules files
firebase deploy --only firestore:rules,storage:rules
```

`firestore.rules` and `storage.rules` are already written — they make all
content public-readable, but writes require the signed-in user's UID to exist
in the `admins` collection.

## 4. Create your admin account

1. In the Firebase Console, go to **Authentication → Users → Add user** and
   create yourself an email/password account.
2. Copy that user's **UID**.
3. In **Firestore Database**, create a collection named `admins`, and add a
   document whose **document ID is that UID** (the document's fields can be
   empty, or e.g. `{ "email": "you@example.com" }`).

Only UIDs present in `admins` can sign in to `/admin` or write data — creating
a Firebase Auth user alone is not enough.

## 5. Run locally

```bash
npm run dev
```

- Public site: `http://localhost:5173`
- Admin dashboard: `http://localhost:5173/admin` (redirects to `/admin/login`)

The site starts empty — every section shows a friendly empty state until you
fill it in from the admin dashboard. Start with **Hero**, then **Works /
Projects**, **About**, **Contact**, **Social Links**, and **Site Settings**.
**Navigation** falls back to a default five-item menu (Home, Works, About me,
Contact, Components) until you add your own items there.

## 6. Build & deploy the site itself

```bash
npm run build
```

This outputs static files to `dist/`, deployable to Firebase Hosting, Vercel,
Netlify, or any static host. For Firebase Hosting:

```bash
firebase init hosting   # public directory: dist, single-page app: yes
firebase deploy --only hosting
```

## Firestore structure

| Collection    | Shape                                                             |
| ------------- | ------------------------------------------------------------------ |
| `settings`    | singleton doc `main` — title, favicon, footer text, SEO copy       |
| `hero`        | singleton doc `main` — greeting, name, image, enabled              |
| `about`       | singleton doc `main` — heading, paragraphs[], image, enabled       |
| `contact`     | singleton doc `main` — phone, email, location, buttonText, enabled |
| `navigation`  | ordered items — label, number, target, enabled, order              |
| `projects`    | ordered items — title, description, image, buttonText, url, enabled, order |
| `socialLinks` | ordered items — platform, url, visible, order                      |
| `messages`    | contact form submissions — email, subject, message, read, createdAt |
| `admins`      | one doc per admin, ID = Firebase Auth UID                          |

## Notes

- Images upload to Firebase Storage under `hero/`, `projects/`, `about/`, and
  `settings/`; replacing or removing an image deletes the old file.
- All admin writes require an authenticated user whose UID exists in
  `admins` — enforced both in the UI (`ProtectedRoute`) and in the Firestore
  and Storage rules, so the dashboard can't be bypassed by calling Firestore
  directly.
