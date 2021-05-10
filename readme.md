![cover](https://mateuszlason.github.io/ArdentCode-recruitment-task/task.png)

# Ardent Code | Recruitment task | Simple text editor

---

_This is my implementation of Ardent Code recruitment task, had a lot of fun doing it!_

## Description

I decided to make a few functionalities more since the `execCommand` is a really easy way to handle text editor events.

Here's list of some of them:

- storing current session in `LocalStorage` (_button **Save**_) and getting it on page load
- font size, family, and color change (_note that in Google Chrome you need to confirm color pick with **Enter**, I tested it on Firefox and Safari and it worked just fine_)
- create hyperlink
- download and import file without using `Node.js`
- some `CSS media queries` for lower resolutions
- beautiful oldschool icons - thanks **Freepick**!

I plan to implement more responsive UI, similar to the ones we are used to (mark of current pressed button etc).

## Available scripts

`npm run start` - runs development mode

`npm run build` - runs build process for production

`npm run publish` - runs build process and publish the page using `gh-pages` branch
