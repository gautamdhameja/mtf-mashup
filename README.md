# mtf-mashup
Music Tech Fest - Perfomance Lab blockchain demo for Slush 2017

## The Project

This project is a simple demo of registering music creations, from artists and engineers participating in the Music Tech Fest Performance Lab in Helsinki (Nov. 2017), on the BigchainDB blockchain. Then the audience can mashup these to create their own music creations using an app and can register that on Blockchain, giving proper attribution to artists.

## The Components

The project has the following components,

```
            +------+
            |.Net  |
            |API   |    +----------+
            |Mashup|    |Azure     |
         +--+      +----+Storage   |
         |  |      |    |          |
         |  |      |    |          |
+-----+  |  |      |    |          |
|Web  |  |  +------+    +----------+
|App  +--+
|     +--+
|     |  |  +------+    +----------+
+-----+  |  |Nodejs|    |BigchainDB|
         |  |API   |    |          |
         |  |BDB   |    |          |
         +--+Client+----+          |
            |      |    |          |
            |      |    +----------+
            |      |
            +------+

```

### Web App

A react-redux web app to list the creations from the artists. Following are the functions for the web app,

* Show a list of music assets available using node.js api
* Allow the user to select any 3 of these assets
* POST the selection to the .Net API and it is persisted

### Mashup API

A .Net API app hosted in Azure, with with the web app interacts to create mashups. This API picks up the mp3 files saved in a Azure storage account and uses `naudio` library to merge them to create mashups. Following are the functions for the .Net API,

* Pick audio file from Azure storage as per user selection
* Call naudio method to merge files
* Save merged/mashed-up files to Azure Storage
* Call nodejs api to create asset for mashup

### BigchainDB API 

A node.js express API for interacting with BigchainDB to create transactions on the blockchain. We needed a different API because the BigchainDB driver for .net doesn't exist (yet). Following are the functions for the node.js API,

* Create BigchainDB asset
* Search assets

The web app connects with these 2 APIs directly to get the assets and to create mashups.

### Infrastructure

The solution has the following infrastructure components,

* Web App is deployed on Azure App Service
* .Net API is Azure API App
* Music repository is on Azure Storage Account
* BigchainDB node is hosted on docker on a Azure VM
* Node.js API is also on docker on the same Azure VM
