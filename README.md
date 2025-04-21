# ⭐ ACT Ai Redesign

ร่วมตรวจสอบความโปร่งใสของภาครัฐด้วยการมีส่วนร่วมของประชาชน

## 💻 Tech Stack + CSS

- Nuxt 3
- TailwindCSS

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## 🍙 Deployments

| Name       | URL                               | Host/Pipeline    |
| ---------- | --------------------------------- | ---------------- |
| Production | TBA                               | TBA              |
| Staging    | https://actai-redesign.pages.dev/ | Cloudflare Pages |

## 🍟 Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## 🍥 Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## 🍧 Production (Docker)

```bash
# Build project
docker build -t actai-web .
```

```bash
# Save docker image file and upload to server
docker save actai-web | ssh -C actai docker load
```

```bash
# Logging into act server
ssh boonme@actai
```

```bash
# Run actai project
docker run -d -p 8080:3000 --restart always actai-web
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 🍫 Related resources

- Figma: https://www.figma.com/design/jcGhTIyNXpFknIaGCfXM2d/%5BACTai-redesign%5D?node-id=598-29812&t=PLIQyr5k4f8r4XaU-0

## 🍪 Team members

- Developer (Frontend) : Poppap
- Developer (Backend) : Benz (BML)
- Designer: P'Jug
- PM/Supervisor: P'GG
