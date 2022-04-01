# Calendar Challenge
This project consists in a calendar with reminders managed by user
## Stack Used
- Vue.js
- Vuex
- Axios
- Luxon
- Jest

#### Extra Tools
- Tailwind CSS: An utility CSS Framework to build design. It was chosen because it is very light and widely used in projects of this type instead of using more robuster libraries like Vuetify, Vue Bootstrap or Elemen UI.
- FontAwesome: A famous icon library, very easy to use
- vue-datetime: A useful DateTime Picker Library that works perfectly with Luxon Date Time Library


## Requirements

- Node JS LTS
- NPM
- Git
## Project setup

```
git clone https://github.com/hugorabelo/calendar-challenge.git
```

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

If you have issues with snapshots, please run below command to recreate snapshots

```
npm run test:unit -- -u
```
## How It Works
Calendar has a Header, where it have a title for selected month and some buttons
- Today:  go to current month
- Chevrons: to navigate to previous and next month
- Add Reminder: here, user can open a dialog with form to create a new reminder

Below header exists a list of days as a table. Inside days we can have some reminders labels. Feature:
- When mouse is hovering day that has some reminders, user can see a button to delete all reminder for that specific day
- If user clicks on label, a new dialog is opened with reminder details, including weather forecast, and buttons to edit or remove selected reminder

### Screenshots

![Screen Shot 01](https://raw.githubusercontent.com/hugorabelo/calendar-challenge/main/public/screenshots/01.png)
![Screen Shot 02](https://raw.githubusercontent.com/hugorabelo/calendar-challenge/main/public/screenshots/02.png)
![Screen Shot 03](https://raw.githubusercontent.com/hugorabelo/calendar-challenge/main/public/screenshots/03.png)
![Screen Shot 04](https://raw.githubusercontent.com/hugorabelo/calendar-challenge/main/public/screenshots/04.png)