# Store application - front

1. Install the dependencies
```bash
npm install
```
2. Run the build (make sure that the env contains the good URLs)
```bash
npm run build
```
3. Copy the dist folder to the server and serve it through apache or nginx

To hot reload run `npm run dev`

## What to do
- [ ] Add a Dockerfile
- [ ] Add a Nginx/Apache configuration file
- [ ] Add a CI/CD pipeline
  - [ ] Build the application
  - [ ] Run the tests (if applicable)
  - [ ] Deploy the application on cloud
