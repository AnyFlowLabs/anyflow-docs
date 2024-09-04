---
---

# Isolated Environments

Each deployment has its own isolated ephemeral environment, so you don't have to worry about other deployments affecting your code neither your code affecting other deployments. We do this by detecting your project's dependencies (node engine version) and dockerizing the script's execution. Moreover, this allows us to scale the deployment process horizontally, ensuring that your deployment is always fast and reliable no matter how many deployments are running at the same time in parallel or how many chains you are deploying to.