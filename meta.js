module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "type": {
      "type": "list",
      "message": "choose your project type",
      "choices": [
        {
          "name": "initial a mobile project",
          "value": "mobile",
          "short": "mobile"
        },
        {
          "name": "initial a pc project",
          "value": "pc",
          "short": "pc"
        }
      ]
    },
    "babel": {
      "type": "confirm",
      "message": "Use babel tranform your code?"
    },
    "lint": {
      "type": "confirm",
      "message": "Use ESLint to lint your code?"
    },
    "lintConfig": {
      "when": "lint",
      "type": "list",
      "message": "Pick an ESLint preset",
      "choices": [
        {
          "name": "Standard (https://github.com/standard/standard)",
          "value": "standard",
          "short": "Standard"
        },
        {
          "name": "Airbnb (https://github.com/airbnb/javascript)",
          "value": "airbnb",
          "short": "Airbnb"
        },
        {
          "name": "none (configure it yourself)",
          "value": "none",
          "short": "none"
        }
      ]
    }
  },
  "filters": {
    ".eslintrc.js": "lint",
    ".eslintignore": "lint"
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n"
};
