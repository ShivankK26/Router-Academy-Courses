---
sidebar_position: 10
---

# Module 10: Building via Nitro iFrame

## Integrating iFrame in any dApp

Integrating Router Nitro in iFrame format in any dApp is pretty easy. Following are the ways to Integrate it either in Mainnet or Testnet -

## Mainnet

Visit [iFrame Creator](https://app.routernitro.com/widget) for Mainnet and Generate the Code for it by Choosing the Source Chain, Source Token, Destination Chain, and Destination Token.

- Embedding the Widget in HTML File -

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Router Nitro Widget</title>
</head>
<body>
  <div id="widget-container">
    <iframe id="widget__iframe" width="600" height="400"></iframe>
  </div>

  <script>
    // describe widget configuration and saving to a global variable for future use
    var baseUrl = "https://app.routernitro.com/swap";

    const configuration = {
      isWidget: true,
      widgetId: "24",
      fromChain: "none",
      toChain: "none",
      fromToken: "none",
      toToken: "none",
      ctaColor: "#F3BF2B",
      textColor: "#FFFFFF",
      backgroundColor: "#313131",
      logoURI: "undefined",
      slippageTolerance: "1",
      display: "vertical",
      isFromSelLocked: "0",
      isToSelLocked: "0",
    };

    const paramString = new URLSearchParams(configuration).toString();
    document.getElementById("widget__iframe").src = `${baseUrl}?${paramString}`;
  </script>
</body>
</html>

```

- ReactJS Component of iFrame -

```jsx
import React, { useEffect } from 'react';

const RouterNitroWidget = () => {
  useEffect(() => {
    const baseUrl = "https://app.routernitro.com/swap";

    const configuration = {
      isWidget: true,
      widgetId: "24",
      fromChain: "none",
      toChain: "none",
      fromToken: "none",
      toToken: "none",
      ctaColor: "#F3BF2B",
      textColor: "#FFFFFF",
      backgroundColor: "#313131",
      logoURI: "undefined",
      slippageTolerance: "1",
      display: "vertical",
      isFromSelLocked: "0",
      isToSelLocked: "0",
    };

    const paramString = new URLSearchParams(configuration).toString();
    document.getElementById("widget__iframe").src = `${baseUrl}?${paramString}`;
  }, []);

  return (
    <div id="widget-container">
      <iframe id="widget__iframe" width="600" height="400" title="Router Nitro Widget"></iframe>
    </div>
  );
};

export default RouterNitroWidget;
```


## Testnet

Visit [iFrame Creator](https://testnet.routernitro.com/widget) for Testnet and Generate the Code for it by Choosing the Source Chain, Source Token, Destination Chain, and Destination Token.

- Embedding the Widget in HTML File -

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Router Nitro Widget</title>
</head>
<body>
  <div id="widget-container">
    <iframe id="widget__iframe" width="600" height="400"></iframe>
  </div>

  <script>
    // describe widget configuration and saving to a global variable for future use
    var baseUrl = "https://testnet.routernitro.com/swap";

    const configuration = {
      isWidget: true,
      widgetId: "24",
      fromChain: "none",
      toChain: "none",
      fromToken: "none",
      toToken: "none",
      ctaColor: "#F3BF2B",
      textColor: "#FFFFFF",
      backgroundColor: "#313131",
      logoURI: "undefined",
      slippageTolerance: "1",
      display: "vertical",
      isFromSelLocked: "0",
      isToSelLocked: "0",
    };

    const paramString = new URLSearchParams(configuration).toString();
    document.getElementById("widget__iframe").src = `${baseUrl}?${paramString}`;
  </script>
</body>
</html>
```

- ReactJS Component of iFrame -

```jsx
import React, { useEffect } from 'react';

const RouterNitroWidget = () => {
  useEffect(() => {
    const baseUrl = "https://testnet.routernitro.com/swap";

    const configuration = {
      isWidget: true,
      widgetId: "24",
      fromChain: "none",
      toChain: "none",
      fromToken: "none",
      toToken: "none",
      ctaColor: "#F3BF2B",
      textColor: "#FFFFFF",
      backgroundColor: "#313131",
      logoURI: "undefined",
      slippageTolerance: "1",
      display: "vertical",
      isFromSelLocked: "0",
      isToSelLocked: "0",
    };

    const paramString = new URLSearchParams(configuration).toString();
    document.getElementById("widget__iframe").src = `${baseUrl}?${paramString}`;
  }, []);

  return (
    <div id="widget-container">
      <iframe id="widget__iframe" width="600" height="400" title="Router Nitro Widget"></iframe>
    </div>
  );
};

export default RouterNitroWidget;
```