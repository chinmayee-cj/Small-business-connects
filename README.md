# Small Business Connects

A MERN stack web application designed to enable small and medium businesses to connect, collaborate, manage teams and roles, showcase their portfolios, and offer on-demand services through a unified and user-friendly platform.

---

## About the Project

Small Business Connects provides a platform for businesses to manage internal teams and permissions, build their digital portfolios, connect with other businesses, manage content and analytics data, and facilitate service exchanges within a marketplace ecosystem. The platform fosters collaboration and growth opportunities among diverse businesses in a modern, intuitive dashboard.

---

## Technology Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose ODM  
- **Others:** Axios (API calls), React Router (navigation), dotenv (environment variables)

---

## Folder Structure (Overview)

/client # React frontend source code
/src
/Assets
/Components
/Pages
/server # Backend Express server with API routes and models
/mongodb # MongoDB models
/middleware # Custom Express middleware
/routes # API route definitions
/uploads # User-uploaded files (ignored by Git)
/.gitignore
/package.json
/README.md

text

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)  
- npm or yarn  
- MongoDB URI (local or Atlas cluster)

### Installation

1. **Clone the repository**

git clone https://github.com/chinmayee-cj/Small-business-connects.git
cd Small-business-connects

text

2. **Setup backend**

cd server
npm install
cp .env.example .env

Edit .env file to set MONGO_URI, JWT_SECRET, PORT, etc.
npm run dev

text

3. **Setup frontend**

cd ../client
npm install
npm start

text

4. Open your browser at `http://localhost:3000` to access the app.

---

## Environment Variables

Configure your `.env` file(s) in the `server/` directory with the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

text

Ensure `.env` files are never committed to the public repository.

---

## Usage

- Register a new business account or login with existing credentials.
- Manage team members and assign roles/permissions.
- Update your company profile and upload logos or certification documents.
- Create and manage your business portfolio and showcase.
- Offer and manage on-demand services, and participate in the business marketplace.
- Monitor business analytics through content management sections.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

MIT License

Copyright (c) 2025 Chinmayee-CJ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

text

---

## Contact

Maintained by [Chinmayee-CJ](https://github.com/chinmayee-cj)

For questions, issues, or feature requests, please open an issue on GitHub.

---

*This README will be updated as the project progresses. Contributions and suggestions are encouraged!*
