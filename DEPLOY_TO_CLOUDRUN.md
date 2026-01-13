# Deploy to Google Cloud Run

This project is configured for deployment on Google Cloud Run using Next.js standalone output.

## Prerequisites

1.  [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and initialized.
2.  A Google Cloud Project created and billing enabled.

## Setup Steps

1.  **Login to Google Cloud:**
    ```bash
    gcloud auth login
    ```

2.  **Set your project ID:**
    Replace `[YOUR_PROJECT_ID]` with your actual project ID.
    ```bash
    gcloud config set project [YOUR_PROJECT_ID]
    ```

3.  **Enable necessary APIs:**
    ```bash
    gcloud services enable run.googleapis.com cloudbuild.googleapis.com
    ```

## Deployment

Run the following command to build and deploy your application directly from the source code:

```bash
gcloud run deploy ai-chef --source .
```

Follow the interactive prompts:
*   **Source code location:** Press Enter to confirm current directory.
*   **Region:** Select your preferred region (e.g., `asia-southeast2` for Jakarta or `us-central1`).
*   **Allow unauthenticated invocations:** Choose `y` if you want the app to be publicly accessible.

## Environment Variables

If you need to set environment variables (like API keys), you can add ` --set-env-vars KEY=VALUE` to the deploy command or configure them in the Google Cloud Console UI after deployment.

Example:
```bash
gcloud run deploy ai-chef --source . --set-env-vars NEXT_PUBLIC_API_URL=https://api.example.com
```

## Note on "Standalone" Mode

Wait! The project uses `output: 'standalone'` in `next.config.mjs` which optimizes the Docker image size. This is handled automatically by the created `Dockerfile`.
