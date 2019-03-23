# Quiktec Code Test Frontend - Jason Sant
## Overview
The task was to build a simple user interface, in order to buy tickets for a generic lotto game.

## Technologies Used
* Vue.js - Nuxt.js
* CSS Less
* CSS Grid
* Vuex
* Bootstrap-Vue

## How it works
Users lands on the homepage (Play Page) where they can buy tickets based on their balance and up to 10 tickets maximum can be bought. A ticket is bought by selecting 6 numbers out of the 48 provided and choosing the amount to wager.

Within the betslip page, users can see their current active tickets. Should they not have any, an empty state is presented with an option to buy tickets (redirects to Play Page).

On the Draw page, users can draw the lottery and any matched numbers from their betslips will be highlighted. If a ticket has 6 guessed numbers, then the amount wagered on that ticket is multiplied by 10 and added to the user balance. Once the draw is finished, the system gets rid of the tickets and the user is taken back to the Play Page to start over.

Demo: http://quiklotto-jasonsant.surge.sh/

## How to Deploy
        npm install

        npm run dev (Development)
