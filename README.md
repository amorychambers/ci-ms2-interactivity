# Lost in Library - Steam Games

![Website homepage on different devices](docs/am-i-responsive.png)

Developed by Benedict Amory Chambers
## Table of Contents

1. [Project Goals](#project-goals)
    1. [User Goals](#user-goals)
    2. [Site Goals](#site-goals)
2. [User Experience](#user-experience)
    1. [Target Audience](#target-audience)
    2. [User Stories](#user-stories)
3. [Design](#design)
    1. [Design Choices](#design-choices)
    2. [Colours](#colours)
    3. [Fonts](#fonts)
    4. [Structure](#structure)
    5. [Wireframes](#wireframes)
4. [Technologies](#technologies)
    1. [Languages](#languages)
    2. [Frameworks and Tools](#frameworks-and-tools)
5. [Features](#features)
6. [Testing](#testing)
    1. [HTML Validation](#HTML-validation)
    2. [CSS Validation](#CSS-validation)
    3. [JavaScript Validation](#javascript-validation)
    4. [Accessibility](#accessibility)
    5. [Performance](#performance)
    6. [Compatibility](#compatibility)
    7. [Testing user stories](#testing-user-stories)
7. [Bugs](#bugs)
8. [Credits](#credits)
9. [Deployment](#deployment)
10. [Acknowledgements](#acknowledgements)

## Project Goals

This is a memory game that challenges the player to remember a sequence of ten games that are briefly shown on screen before they are prompted to enter the same sequence again. The game makes use of an API provided by the gaming platform and distributor, Steam, to access a user's public profile data and generate the sequence using only games they own, which adds a layer of familiarity to the challenge. The website aims to be engaging by focusing on interactivity, user feedback, and a personalised experience. It is intended to be a fun, accessible experience showcasing interactivity between a user and a website.

### User Goals

- A clear and concise understanding of the game experience the website offers
- A visually clean and uncluttered presentation that focuses the user's attention on the parts of the page they can interact with to personalise or engage with the game
- The site accounts for all interactive elements of the user's experiences, particularly when there is an error or incompatibility with user input


### Site Goals

- Uses interactivity to focus and hold a user's attention
- Offers a personalised and thus more memorable experience
- Connects with the user demographic and communicates the experience offered in a fitting and appropriate way


### Developer Goals

- The website looks good and functions properly in all interactive and non-interactive elements on a range of devices
- The game functions well on all devices and is clear and consistent to play
- The site is accessible to a wide range of users and is easy to navigate
- Offer a personalised experience and communicate clearly to the user how they can interact with the application

## User Experience

### Target Audience

- Steam users and games enthusiasts
- Any user that wants to play a simple memory game

### User Stories 

#### First-time User
As a first-time user, I want to:

1. Understand what the site is offering and why at first glance
2. Grasp the rules of the game before starting to play
3. Be able to easily decide what parameters of the game I want to change
4. Still be able to play the game if I am not a Steam user or am not seeking a personalised game experience
5. Know how the game works and how it is processing my personal data
6. Play on whatever device I am using
7. Easily contact the creator of the site if I have questions or feedback
8. Navigate around the site with ease and clarity

#### Returning User
As a returning user, I want to:

9. Start the game quickly, as I already understand the rules
10. Start a new game when the first game is finished
11. Choose how I want to play the game 
12. Have a new experience each time I play
13. Be surprised by games in my game library that I haven't played
14. Be able to easily check out one of those games at the end of the memory game


#### Site Owner
As the site owner, I want to:

15. Create an accessible and responsive website that works well and looks good on a wide range of devices
16. Design a fun, simple memory game
17. Tailor the game and website experience to the target demographic
18. Encourage users to have fun, and to explore their unplayed games
19. Aim for as simple an experience as possible and be direct about how the game accesses and uses personal data


## Design

### Design Choices

I've aimed to create as simple and clear a design as I can, in order to make the important information and interactive elements as clear as possible, to focus on the visuals of user feedback, and to not distract from the game. Additionally, I have themed the game around recognisable Steam design principles, in order to create a cohesive and intuitive experience.

### Colours

I have used a colour scheme that evokes the theming and usage of Steam as a platform, both being familiar background colours for Steam community pages. Additionally, I used some bright and complementary colours for the gameboard page; I chose a bright green colour both to indicate when a player has made a selection by highlighting the background of the image and to evoke success upon correct input; I chose a contrasting pink colour to draw the user's attention more to the next game being displayed in the sequence; I used a complementary red colour to indicate an incorrect input.

Main theme colour: #1b2838

Darker theme colour for contrast: #0c1620

### Fonts

I chose two fonts to use on the website; one for bold, attention grabbing headings, and one for clear, accessible, simple communicative text. Both fonts are sans-serif as I wanted them to look cohesive and easy-to-read; both were selected to fit in with the minimalistic aesthetic.

[Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) - Headings

[Roboto](https://fonts.google.com/specimen/Roboto) - Plain text

### Structure 



### Wireframes


Wireframes created in Balsamiq 

<details><summary>Homepage</summary>
<img src="docs/wireframes/mobile-homepage.png">
<img src="docs/wireframes/tablet-homepage.png">
<img src="docs/wireframes/desktop-homepage.png">
</details>



## Technologies 

### Languages

HTML5

CSS3

JavaScript

### Frameworks and Tools

[Node.js](https://nodejs.org/en)

[Bootstrap v5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

[Visual Studio Code](https://code.visualstudio.com/)

[Git](github.com)

[Google Fonts](https://fonts.google.com/)

[Balsamiq](https://balsamiq.com/)

[Obsidian](https://obsidian.md/)

[Pexels](https://www.pexels.com/)

[Imagemin](https://github.com/imagemin/imagemin-cli)

[cwebp Encoder](https://developers.google.com/speed/webp/docs/cwebp)

[Font Awesome](https://fontawesome.com/)

[Favicon](https://favicon.io/)

[W3C Markup Validation Service](https://validator.w3.org/)

[W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)

[WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

[Accessible Color Generator](https://www.learnui.docs/tools/accessible-color-generator.html)

[Am I Responsive?](https://ui.dev/amiresponsive)

[WAVE Web Accessibility Evaluation Tools](https://wave.webaim.org/)


## Features

### Header and Navigation



### Landing Page


### Ethos Images


### Visiting Information


### Map


### Footer


### Tea Menu


### Upcoming Events


### Past Events



### Contact Form



### 404 Error


## Testing

### HTML Validation


### CSS Validation

### JavaScript Validation


### Accessibility




### Performance




### Compatibility 


### Testing User Stories

#### First-Time User



#### Returning User


#### Site Owner


## Bugs


## Credits

- [Dan Beyer](https://danbeyer.github.io/) for a useful guide on creating server side HTTP calls to the Steam Web API
- [twilio.com](https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-node-js-and-express-development-environment) guide on creating an Express.js application 
- https://stackoverflow.com/questions/19697858/referenceerror-textencoder-is-not-defined
- [jestjs.io](https://jestjs.io/docs/) 


### Media Content


### External Code

- Initial template with .devcontainer folder cloned from Code Institute [ci-full-template](https://github.com/Code-Institute-Org/ci-full-template)
- Initial boilerplate HTML head from [Emmet extension](https://emmet.io/) in Visual Studio Code
- Code snippet for navigation bar from [Bootstrap v5.3 documentation](https://getbootstrap.com/docs/5.3/components/navbar/)
- Common syntax for XMLHttpRequest in JavaScript from [W3Schools](https://www.w3schools.com/xml/xml_http.asp)
- Server code snippet for creating server side HTTP calls to the Steam Web API from [Dan Beyer](https://danbeyer.github.io/steamapi/page2.html)

## Deployment


## Acknowledgements