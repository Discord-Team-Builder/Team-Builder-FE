# Team Builder FE

Team Builder FE is a web application built with [Next.js](https://nextjs.org), designed to help educators and organizers quickly create project teams, manage student lists, and coordinate collaborative projects. Authentication and user management are handled via Discord OAuth2.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Overview](#api-overview)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

---

## Features

- **Discord Login**: Secure authentication using Discord OAuth2.
- **Project Creation**: Easily set up new projects and define team requirements.
- **Student Management**: Import student lists via CSV or manual entry.
- **Team Invitations**: Send team invites to students via Discord.
- **Multiple Projects and Teams**: Users can manage and join several projects and teams.
- **Responsive UI**: Built with modern React UI standards and Tailwind CSS.
- **Docker Support**: Ready for containerized deployment.
- **DCDEPLOY Ready**: Optimized for deployment on DCDEPLOY.

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Utkarshya24/Team-Builder-FE.git
   cd Team-Builder-FE
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000).

---

## Usage

- **Sign in with Discord** to access your dashboard.
- **Create a Project** and set up team requirements and preferences.
- **Upload or Add Students** to your project.
- **Send Invitations** so students can join their teams via Discord.
- **Manage Teams and Projects** from your dashboard.

---

## Project Structure

- `src/components/landing-page/`: Landing page UI components (e.g., HowItWorks, FAQ).
- `src/components/ui/`: Shared UI elements (Carousel, ScrollArea, etc.).
- `src/components/shared/`: Common components (e.g., "Working On It" placeholders).
- `src/api/`: Client-side API configuration and call logic.
- `src/globalstate/`: Global state management using Valtio.
- `next.config.mjs`: Next.js configuration, including Discord image domains and API URL.
- `Dockerfile` & `deploy.sh`: For production deployment and Docker-based workflow.

---

## API Overview

API routes are defined in `src/api/APIConfig.js`. Key endpoints:

- `/api/v1/status`: Get login status.
- `/api/v1/@me`: Get current user details.
- `/api/v1/guilds`: List user's Discord guilds.
- `/api/v1/project/create`: Create a new project.
- `/api/v1/project/all-projects`: Retrieve all projects.
- `/api/v1/team/create`: Create a new team.
- `/api/v1/team/accept`: Accept a team invitation.

API requests are handled in `src/api/APICall.js`, which manages requests, error handling, and loading states.

---

## Deployment

### Docker

Build and run the app using Docker:

```bash
docker build -t team-builder-fe .
docker run -p 3000:3000 team-builder-fe
```

Or use the provided `deploy.sh` script for pulling, building, and running with Docker Compose.

### DCDEPLOY

The app is ready for seamless deployment to [DCDEPLOY](https://dcdeploy.com/):

- Click "Deploy" on DCDEPLOY and connect your repository.
- Follow [DCDEPLOY’s Next.js deployment guide](https://dcdeploy.com/docs).

---

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

---

## FAQ

- **Is my data secure?**
  - We only store the minimum information needed. All Discord connections use secure OAuth2.

- **How many projects can I create?**
  - You can create and join multiple projects and teams.

- **Something not working?**
  - Some pages are under construction. If you see a "Working On It" message, features are coming soon!

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com/), and [DCDEPLOY](https://dcdeploy.com/).
- Icons by [Lucide](https://lucide.dev/).
