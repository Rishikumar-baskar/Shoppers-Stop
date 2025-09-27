# Configuration Setup

## Environment Variables

This directory contains configuration files for the application. For security reasons, the actual `config.env` file is not tracked in Git.

### Setup Instructions

1. Copy the example configuration file:
   ```bash
   cp config.env.example config.env
   ```

2. Update the values in `config.env` with your actual configuration:
   - **Database**: Update `DB_LOCAL_URI` if using a different MongoDB connection
   - **JWT**: Set a strong `JWT_SECRET` for authentication
   - **Email**: Configure SMTP settings for email functionality
   - **Stripe**: Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/) and update:
     - `STRIPE_API_KEY` (publishable key)
     - `STRIPE_SECRET_KEY` (secret key)

### Security Notes

- Never commit the `config.env` file to version control
- Keep your API keys secure and don't share them
- Use different keys for development and production environments
- The `config.env.example` file is safe to commit as it contains no real credentials

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Go to the [API Keys section](https://dashboard.stripe.com/apikeys)
3. Copy your test keys (for development) or live keys (for production)
4. Replace the placeholder values in `config.env`
