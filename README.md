# 📧 WebMail App

## 📝 Présentation du Projet
WebMail est une application web moderne développée avec **Next.js 15 (React)** et **TypeScript**. Elle intègre une gestion avancée des emails, contacts et calendriers pour offrir une expérience complète aux utilisateurs.

L'application repose sur **Firebase Authentication** pour la gestion des connexions et permet l'authentification via **email/mot de passe** ainsi que **Google Sign-In**.

## 🚀 Technologies Utilisées
- **Next.js 15 (Turbopack)** - Framework React
- **TypeScript** - Typage sécurisé
- **TailwindCSS** - Gestion des styles
- **Firebase** - Authentification et stockage
- **React Big Calendar** - Gestion des événements du calendrier

---

## ✅ Fonctionnalités Implémentées
### 🔐 **Authentification**
- Connexion via email/mot de passe (**Firebase Auth**)
- Connexion avec Google
- Gestion de la déconnexion avec bouton dans la sidebar
- Protection des pages nécessitant une authentification

### 📅 **Calendrier**
- Affichage du calendrier en **vue jour, semaine et mois**
- Navigation entre les différentes vues
- Intégration de **React Big Calendar**

### 📬 **Emails**
- Page de boîte de réception avec une interface basique
- Intégration d'icônes avec **Lucide React**

### 📇 **Contacts**
- Page pour afficher et gérer les contacts
- Navigation entre les différentes pages via la sidebar

---

## 🔧 Fonctionnalités à Ajouter
- 📌 **Amélioration du calendrier** : Gestion des événements, création/modification
- 📌 **Gestion complète des emails** : Affichage des messages, envoi, réponse
- 📌 **Amélioration des contacts** : Ajout, modification, suppression
- 📌 **Design et UX** : Améliorer l'apparence et l'expérience utilisateur

---

## 📂 Structure du Projet
```
📦 new-webmail
├── 📁 public             # Fichiers statiques (favicon, images...)
├── 📁 src
│   ├── 📁 app           # Pages principales
│   │   ├── 📁 calendar  # Page du calendrier
│   │   ├── 📁 contacts  # Page des contacts
│   │   ├── 📁 emails    # Page des emails
│   │   ├── 📁 login     # Page de connexion
│   │   ├── 📄 layout.tsx  # Layout principal
│   │   ├── 📄 layoutClient.tsx # Layout pour les pages publiques
│   │   ├── 📄 page.tsx  # Page d'accueil
│   ├── 📁 components   # Composants réutilisables
│   │   ├── 📄 Calendar.tsx
│   │   ├── 📄 LayoutWrapper.tsx
│   │   ├── 📄 Login.tsx
│   │   ├── 📄 Logout.tsx
│   │   ├── 📄 Navbar.tsx
│   │   ├── 📄 Sidebar.tsx
│   ├── 📁 config       # Configuration Firebase
│   │   ├── 📄 firebase.js
│   │   ├── 📄 firebaseAdmin.ts
│   ├── 📁 styles       # Fichiers CSS et Tailwind
│   │   ├── 📄 globals.css
│   │   ├── 📄 calendar.css
│   │   ├── 📄 tailwind.css
├── 📄 .env.local        # Variables d'environnement Firebase (ne pas partager)
├── 📄 .gitignore
├── 📄 eslint.config.mjs
├── 📄 middleware.ts
├── 📄 next-env.d.ts
├── 📄 next.config.ts
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 postcss.config.cjs
├── 📄 README.md
├── 📄 tailwind.config.js
├── 📄 tsconfig.json
```

---

## 📌 Installation & Lancement
### 1️⃣ **Cloner le projet**
```sh
git clone https://github.com/votre-repo/new-webmail.git
cd new-webmail
```

### 2️⃣ **Installer les dépendances**
```sh
npm install
```

### 3️⃣ **Lancer le projet en mode développement**
```sh
npm run dev
```

---

## 🚀 Prochaines Étapes
- **Corriger les derniers bugs liés à Tailwind et PostCSS** ✅
- **Implémenter les événements dans le calendrier** 📅
- **Finaliser la gestion complète des emails** 📬
- **Déployer l'application sur Vercel** 🌍

---

## 🛠 Développement
Si vous souhaitez contribuer ou modifier l’application, n’hésitez pas à **forker le repo et à soumettre une pull request** !

📧 **Contact** : contact@javachrist.fr

🔥 **Let's build something great! 🚀**

