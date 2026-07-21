# ⭐ ACT Ai Redesign

ร่วมตรวจสอบความโปร่งใสของภาครัฐด้วยการมีส่วนร่วมของประชาชน

## 💻 Tech Stack + CSS

- Nuxt 3
- TailwindCSS

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## 🍙 Deployments

| Name       | URL                                          | Host/Pipeline             |
| ---------- | -------------------------------------------- | ------------------------- |
| Production | https://procurement.actai.co/                | iApp VPS / Github Actions |
| Staging    | https://actai-procurement-test.punchup.world | iApp VPS / Github Actions |

## 🍟 Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## 🍥 Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

## 🍧 Deployment Pipeline (Docker)

Both environments run as Docker containers on the same VPS, deployed by GitHub Actions workflows:

- **Staging**: pushing to `main` triggers the _Deploy staging_ workflow, which builds the image, uploads it to the server, and updates the staging container with the `staging` image tag.
- **Production**: manually trigger the _Deploy production_ workflow in the [Actions](https://github.com/ACT-Anti-Corruption-Thailand/actai-procurement/actions) tab. It promotes the current `staging` image to `production` (keeping the old one as `previous` for rollback) and updates the production container. No rebuild — production always ships the exact image verified on staging.

## 🍫 Related resources

- Figma: https://www.figma.com/design/jcGhTIyNXpFknIaGCfXM2d/%5BACTai-redesign%5D?node-id=598-29812&t=PLIQyr5k4f8r4XaU-0
