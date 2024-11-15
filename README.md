# Pokemon Tactical Arena

## Overview
**Pokemon Tactical Arena** is a turn-based battle game built using **React** and **Redux Toolkit**. In the game, players can create their own custom pokemons, train them, and engage in battles against randomly generated opponents. The game incorporates data from the **PokeAPI**, allowing players to select from a variety of pokemons (starting with Pokémon), customize their stats, and fight in an arena setting. It also features a save/load functionality using `localStorage`, so players can save their progress and continue later.

This project demonstrates the application of various web technologies including **HTML**, **CSS**, **JavaScript**, **React**, **Redux Toolkit**, and **AJAX** to create an engaging user experience with data fetched from an external API.

## Features
- **Pokemon Creation**: Players can create custom pokemons with unique names and stats.
- **Turn-based Combat**: Players battle their pokemons against randomly generated opponents in an arena-style combat.
- **Dynamic Health System**: Both the player's and opponent's pokemons have health points (HP) that decrease during combat.
- **Random Opponent Generation**: A new opponent is generated each time the player fights, using data from the PokeAPI.
- **Save/Load Progress**: Players can save their progress and load it later using `localStorage`.
- **Responsive Interface**: The app is designed to be responsive and works on both desktop and mobile devices.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **Redux Toolkit**: State management library to handle global application state.
- **AJAX**: Used to fetch data from the PokeAPI for pokemon stats and attributes.
- **localStorage**: For saving and loading game progress in the browser.
- **HTML/CSS**: Basic web technologies used to structure and style the application.

## Game Flow
1. **Home Page**: The user can either create a custom pokemon or select a random one to enter the arena.
2. **Arena**: The player can fight against randomly generated opponents.
3. **Battle**: During each battle, both the player's and opponent's pokemons will take turns attacking, and health points will be updated accordingly.
4. **Save Progress**: Players can save their current game state (including their pokemon's stats and HP) and later load the game to continue from where they left off.

## Requirements Met
This project meets the requirements for the assignment:
- **Built with HTML, CSS, JavaScript, React, and Redux Toolkit**.
- **AJAX** is used to fetch data from **PokeAPI** (Pokemon API), which provides stats for the pokemons.
- The app includes **complex UI components** such as battle controls, a dynamic opponent generation system, and turn-based combat.
- **localStorage** is utilized to save and load the player's progress in the game, allowing them to pick up where they left off.

## Installation

### Prerequisites
Ensure you have **Node.js** and **npm** installed. If not, download and install them from [Node.js official website](https://nodejs.org/).

### Steps to Run the Application
1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/pokemon-arena.git
    cd pokemon-arena
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000` to play the game.

## Features in Detail

### pokemon Creation
- Players can customize their pokemons with unique names and attributes.
- The **PokeAPI** is used to fetch data about existing Pokémon, which can serve as the basis for the player's pokemons.

### Battle System
- The combat is turn-based, with the player and the opponent each taking turns to attack.
- Health points (HP) for each pokemon are updated after each turn.
- The opponent is randomly generated from the PokeAPI.

### Save and Load Game
- The **Save** button allows players to store the current state of the game, including the player's pokemon, the opponent, and their health points, in the browser's `localStorage`.
- The **Load** button lets players retrieve their saved game and continue from where they left off.

### Random Opponent Generation
- Opponents are randomly generated from the PokeAPI by selecting a random Pokémon from the first generation (ID 1-151).
- The player battles against these random opponents, and their stats are fetched from the API.

## Screenshots
SCREENSHOTS in ./screenshots folder !!!

## Future Improvements
- **Multiplayer Mode**: Adding the ability for players to battle against each other.
- **Expanded pokemon Creation**: Allow players to customize more than just the name and stats of their pokemons, such as adding skills or elemental types.
- **Advanced Combat Mechanics**: Implement elemental strengths and weaknesses to add more strategy to the battles.
- **UI Improvements**: Enhance the interface with animations, sound effects, and a more dynamic user experience.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [PokeAPI](https://pokeapi.co/) for providing data on Pokémon and pokemons.
- [React Documentation](https://reactjs.org/docs/getting-started.html) for helping implement the React framework.
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/) for state management.
