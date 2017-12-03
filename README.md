# mtf-mashup
Music Tech Fest - Perfomance Lab blockchain demo for Slush 2017

## The Project

This project is a simple demo of registering music creations on BigchainDB blockchain.
It was created by artists and engineers participating in the Music Tech Fest #MTFLabs in Helsinki (25-28 Nov. 2017).

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

### Functionality

The input files were tracks created by artists participating at the #MTFLabs and they were pre-uploaded in the temp folder in the API app. The  .Net API method picked up these tracks from the temp folder, merged them together and returned the path of the mashed up file saved in a temp folder.

The selection of tracks was made by the live audience using a simple React-Redux based frontend app sending the selections to the API.

### Infrastructure

The solution has the following infrastructure components,

* Web App is deployed using docker on a Azure VM
* .Net API is Azure API App
* Music repository is on Azure Blob Storage
* BigchainDB node is hosted on docker on a Azure VM
* Node.js API is also on docker on the same Azure VM

### Configuration

* For .Net API the configuration is in the `web.config` `AppSettings` section.
* For the node.js API the configuration is in the `env.json` file.

Note: All configuration settings related to cloud endpoints have been changed to empty strings in this public repository.
