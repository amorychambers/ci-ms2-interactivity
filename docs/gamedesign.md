The game must:

Setup a new game:
Call the Steam API to select four random games
Download the image icons for the games
Populate the board with hidden game images
Populate the player cards with visible game images

Play the first turn:
Create a random sequence of ten numbers for displaying the cards
Display the first four one after another with timers
Wait for player input

If player input matches the sequence:
Add one to current score
Play the second turn with an additional game in the sequence
Wait for player input

If player input does not match the sequence:
Display failure message
Reset for a new game

If player reaches tenth turn:
Display success message
(Optional: Display further data about the final game in the sequence using Steam API app news feature)


Testing notes:
Account for incorrect ID
Account for private profile
Account for fewer than four Steam games