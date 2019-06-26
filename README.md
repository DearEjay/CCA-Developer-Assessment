# Custom Church Apps Developer Assessment

## Local Usage
1. Download and Install Node.js and npm

    [Download Node.js](https://nodejs.org/en/download/) here which will also install npm.

    Check your installs with `node -v` and `npm -v`.

2. Clone the Repository

    Use the SSH link to download the repo using `git clone git@github.com:DearEjay/CCA-Developer-Assessment.git`.

    **OR**

    Use the HTTPS link to download the repo using `git clone https://github.com/DearEjay/CCA-Developer-Assessment.git`.

3. Install Dependencies

    This command must be run every time you pull to download any new packages someone else may have added.

    Run `npm install` in the top level directory of the project (where `package.json` is) to install dependencies.

4. Create a `.env` file in the project's root directory with the following key-value pairs: 
    - PORT=3000
    - DB_PASSWORD='gp6x8B5s2cogVgv4'
    - DB_USERNAME='testuser'

5. Run the Development Server


    Run `npm run dev` to run the project's dev server.

## Assumptions:
1. Assumed all users can see other user's post on unified wall,
2. Assumed all posts needed timestamps for time ordering on unified wall, and 
3. Based on application design, assumed all valid users can log out whcih will destroy current session

## Approach/Structure:
1. Organized file structure to contain routes in unified folder at `CCA Assessent/src/routes`, 
2. API specific route logic (i.e. authentication, users, posts) contained in `CCA Assessent/src/routes/api` folder, 
3. Created one main ExpressRouter from all exported routers at `CCA Assessent/src/routes/router.js`  for scaliability and reusability

```bash
CCA\ Assessment/
├── CCA\ Backend\ Technical\ Assessment.pdf
├── README.md
├── dist
│   ├── index.js
│   └── index.js.map
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── models
    │   ├── Post.js
    │   └── User.js
    └── routes
        ├── api
        │   ├── auth.js
        │   ├── posts.js
        │   └── users.js
        └── router.js
```