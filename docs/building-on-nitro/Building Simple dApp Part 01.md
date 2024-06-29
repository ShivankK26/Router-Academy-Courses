---
sidebar_position: 2
---


# Module 2: Building Simple dApp Part 01

<iframe width="560" height="315" src="https://www.youtube.com/embed/2sbvVfLiasI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## dApp Introduction

In this tutorial, we'll Build a Simple dApp using which we can Transfer AFTT Tokens from Fuji to Holsky Testnet. You can Build this dApp by following along the Tutorial.

The above Video consists an Introduction to how does the dApp look and work.

Check out the dApp we're Building by Clicking [here](https://github.com/router-resources/BuidingonNitro/tree/main).
    
- Directly Copy & Paste the CSS files in your Local Repository.

    ```css
    /*   App.css   */
    
    .navbar{
    display:flex;
    justify-content: center;
    }

    .name{
    color: #6DCFF6;
    }

    .button-52 {
    font-size: 16px;
    font-weight: 200;
    letter-spacing: 1px;
    padding: 13px 20px 13px;
    outline: 0;
    border: 1px solid black;
    cursor: pointer;
    position: relative;
    background-color: rgba(0, 0, 0, 0);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    }

    .button-52:after {
    content: "";
    background-color: #ffe54c;
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 100%;
    top: 7px;
    left: 7px;
    transition: 0.2s;
    }

    .button-52:hover:after {
    top: 0px;
    left: 0px;
    }

    @media (min-width: 768px) {
    .button-52 {
        padding: 13px 50px 13px;
    }
    }

    .button-51 {
        background-color: transparent;
        border: 1px solid #266DB6;
        box-sizing: border-box;
        color: #00132C;
        font-family: "Avenir Next LT W01 Bold",sans-serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        padding: 16px 23px;
        position: relative;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }
    
    .button-51:hover,
    .button-51:active {
        outline: 0;
    }
    
    .button-51:hover {
        background-color: transparent;
        cursor: pointer;
    }
    
    .button-51:before {
        background-color: #D5EDF6;
        content: "";
        height: calc(100% + 3px);
        position: absolute;
        right: -7px;
        top: -9px;
        transition: background-color 300ms ease-in;
        width: 100%;
        z-index: -1;
    }
    
    .button-51:hover:before {
        background-color: #6DCFF6;
    }
    
    @media (min-width: 768px) {
        .button-51 {
        padding: 16px 32px;
        }
    }
    ```


    ```css
    /*   index.css   */

    body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
    ```