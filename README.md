# 🧪 Front End Test Project

This is a simple front end project built with **React **. It includes user
management with pagination, search, sort, and modal forms. The project
demonstrates responsive layout and modern UI handling practices.

---

## 🔗 Live Routes

| Route      | Description                  |
| ---------- | ---------------------------- |
| `/`        | Home / User Management Table |
| `/sign-in` | Sign In Page                 |
| `/sign-up` | Sign Up Page                 |

---

## ⚙️ Features

- ✅ **User Listing** with pagination (from Reqres API)
- ✅ **Add User** locally (form + modal)
- ✅ **Edit User** (UI modal only, local update)
- ✅ **Delete User** locally (filter out from state)
- ✅ **Search Users** by name or email (debounced, responsive)
- ✅ **Sort Users** by name or email (local sort logic)
- ✅ **Simulated Authorization** (login check via localStorage)
- ✅ **Route Protection** for homepage (`/`) if not logged in
- ✅ **Sign In / Sign Up Pages** (UI only)
- ✅ **Responsive Design** (mobile/tablet/desktop friendly)
- ✅ Built with **React**, **Tailwind CSS**, and **Lucide Icons**

---

## ⚠️ Important Notes

- The Reqres API is a mock API and **does not store new users**.
  - This means the **Sign Up** page is UI-only, and added users are stored
    locally in app state.
- To successfully log in, you **must use the email and password provided by the
  app**:

  Example:

  - Email: `eve.holt@reqres.insd`
  - Password: `pistol`

- Upon login, a simulated auth state is stored in `localStorage` to mimic
  authentication.
- Protected routes (like `/`) will redirect to `/sign-in` if you're not logged
  in.

## 🚀 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/front-end-test.git
   cd front-end-test
   ```
