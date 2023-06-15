## TODO

- ~~Restructure app for further development~~
- ~~Setup testing framework~~
- ~~Implement /data POST~~
- Implement /data GET
- Refactor implementations with helper file structure
- Audit of package vulnerabilities
- Lockdown versions

## Notes

- Error's on batch database insert won't be handled, will need a way to notify if individual inserts fail within the batch
- Tests run off the actual "database", should be configured to use a mock


This project was bootstrapped using Node.js + TypeScript + Express

The task description can be found online at: https://powerxai.notion.site/Software-Engineer-c2d8095970d94e78a39f1abd86533939

## Getting Started

In the project directory, you can run:

### `npm run serve`

Runs the app in the development mode at [http://localhost:3000](http://localhost:3000).

The server will reload if you make edits.<br />
You will also see any lint or type errors in the console.
