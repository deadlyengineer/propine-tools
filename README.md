# Portfolio App

## installation

``
npm install
``

## design pattern

  I used singleton design pattern for this project.
  I made a Portfolio class for this calculation. And I create a instance for each portfolio.
  I used this design for maintainable app. I can update portfolio class to update this app.

## test cases

- Given no parameters, return the latest portfolio value per token in USD

  ``
  node index.js portfolio
  ``

- Given a token, return the latest portfolio value for that token in USD

  ``
  node index.js portfolio --token ETH
  ``

  ``
  node index.js portfolio --t ETH
  ``

- Given a date, return the portfolio value per token in USD on that date

  ``
  node index.js portfolio --date 2019-10-25
  ``

  ``
  node index.js portfolio --d 2019-10-25
  ``

- Given a date and a token, return the portfolio value of that token in USD on that date

  ``
  node index.js portfolio --token BTC --date 2019-10-25
  ``
  
  ``
  node index.js portfolio --t BTC --d 2019-10-25
  ``
