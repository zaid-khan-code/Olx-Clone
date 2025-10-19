# OLX Clone

A simple OLX-style web app built using **Firebase Authentication**, **Firestore**, and **Vanilla JavaScript**.  
This project allows users to **sign up**, **log in**, **post ads**, and **browse listings** — all with a clean responsive UI.

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Folder Structure](#folder-structure)
* [Installation](#installation)
* [Usage](#usage)
* [Tech Stack](#tech-stack)
* [Author](#author)

---

## Overview

The **OLX Clone** project replicates the core functionality of the OLX marketplace — enabling users to buy and sell products through a Firebase-powered web interface.  
Users can create an account, log in, view listings, and add new products with image uploads and details.

---

## Features

* Firebase Authentication (Sign Up, Login, Logout)
* Firestore Database Integration
* Responsive Design
* Product Listings with Details
* Clean UI and Simple UX
* Modular JavaScript structure

---

## Folder Structure

```bash
olx/
│
├── 404.html             # Custom "Page Not Found" page for Firebase hosting.
├── firebase.js          # Firebase configuration and initialization.
├── home.html            # The main page after login, displaying product ads.
├── index.html           # The user sign-up page.
├── login.html           # The user login page.
├── script.js            # Core logic for home.html (fetching/rendering products, sell modal, logout).
├── style.css            # Main stylesheet for all HTML pages.
│
├── Assets/
│   └── logo/            # Contains favicons and app icons.
│
└── scripts/
    ├── login.js         # Handles user login authentication with Firebase.
    └── signUp.js        # Handles new user registration with Firebase.
```

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/olx-clone.git
   ```

2. **Open the folder**

   ```bash
   cd olx-clone
   ```

3. **Add your Firebase configuration**  
   Replace the placeholders inside `firebase.js` with your Firebase project credentials.

4. **Launch in browser**

   ```bash
   open index.html
   ```

---

## Usage

1. Open `index.html` to **sign up** a new user.  
2. Log in through `login.html`.  
3. Once logged in, `home.html` displays all listings and allows product posting.  
4. Firebase handles authentication and database interactions seamlessly.

---

## Tech Stack

| Technology           | Description                         |
| -------------------- | ----------------------------------- |
| **HTML5**            | Structure & layout                  |
| **CSS3**             | Styling & responsiveness            |
| **JavaScript (ES6)** | Logic and dynamic rendering         |
| **Firebase**         | Authentication & Firestore database |
| **Firebase Hosting** | For deployment                      |

---

## Author

**Zaid Khan**  
Frontend Developer & Firebase Enthusiast  
Passionate about building modern, functional web experiences.

---
