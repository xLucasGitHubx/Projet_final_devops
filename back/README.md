# Store application - front

1. Copy the source code to the server
2. Install the dependencies
```bash
npm install
```
3. Run prisma migrations
```bash
npx prisma migrate dev
```
4. Run the server in detached mode (make sure to adapt the env with DATABASE_URL)

## What to do
- [ ] Add a Dockerfile
- [ ] Add a CI/CD pipeline
    - [ ] Build the application
    - [ ] Run the tests (if applicable)
    - [ ] Deploy the application on cloud
