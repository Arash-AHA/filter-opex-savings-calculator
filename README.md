
# Filter OPEX Savings Calculator

A web application that calculates operational expenditure savings for filter systems.

## Deployment to GitHub Pages

This project is configured to be deployed to GitHub Pages.

### Deployment Steps:

1. Install the gh-pages package (already added as a dependency)
2. Run the build command:
   ```
   npm run build
   ```
3. Deploy to GitHub Pages:
   ```
   npx gh-pages -d dist
   ```

### GitHub Pages Configuration:

After deployment, ensure your GitHub repository is configured to use GitHub Pages:
1. Go to your repository settings
2. Navigate to "Pages"
3. Select the gh-pages branch as the source
4. Set the folder to / (root)
5. Save the changes

Your application will be available at: https://[your-username].github.io/filter-opex-savings-calculator/
