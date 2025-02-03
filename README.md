# Elitebot.dev Periodic Check

Visit the [Elitebot.dev @TotomInc profile](https://elitebot.dev) to create a snapshot of the charts for historical data.

## Overview

This action runs every multiple times per day, every day, and performs the following:
- Launches a headless Chrome browser using Playwright
- Navigates to a specified website
- Verifies the presence of specific content _(to ensure the website has been loaded correctly)_
- Reports success or failure through GitHub Actions

## Technical Details

- Uses Node.js 20 and Playwright
- Implements stealth mode to bypass bot detection
- Runs on Ubuntu latest
- Uses `playwright-extra` and `puppeteer-extra-plugin-stealth` for enhanced capabilities

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── periodic-check.yml  # GitHub Actions workflow
├── scripts/
│   └── check-site.js          # Site checking script
├── package.json               # Node.js project configuration
└── README.md                  # This file
```

## Setup

1. Fork this repository
2. No additional setup required - the action will run automatically on schedule

## Local Development

To test the script locally:

```bash
# Install dependencies and setup Playwright
npm run setup

# Run the check script (headless mode)
npm start

# Run with visible browser window for debugging
npm run debug
```

## Workflow Schedule

The check runs nine times daily:
- 00:00 UTC
- 08:00 UTC
- 10:00 UTC
- 12:00 UTC
- 14:00 UTC
- 16:00 UTC
- 18:00 UTC
- 20:00 UTC
- 22:00 UTC

## Error Handling

The script will:
- Exit with code 1 if the check fails
- Log detailed error messages to the GitHub Actions console
- Exit with code 0 on successful checks

## License

MIT
