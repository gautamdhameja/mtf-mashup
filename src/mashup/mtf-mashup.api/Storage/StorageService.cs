using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Table;
using mtf_mashup.api.Models;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Threading.Tasks;

namespace mtf_mashup.api.Storage
{
    public class StorageService
    {
        /// <summary>
        /// Uploads a file to Azure blob storage
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static async Task<string> UploadAsync(string filePath, string containerName, string blobName)
        {
            try
            {
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
                ConfigurationManager.AppSettings["StorageConnectionString"]);

                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference(containerName);
                await container.CreateIfNotExistsAsync();

                CloudBlockBlob blockBlob = container.GetBlockBlobReference(blobName);
                using (var fileStream = System.IO.File.OpenRead(filePath))
                {
                    await blockBlob.UploadFromStreamAsync(fileStream);
                }

                return blockBlob.StorageUri.PrimaryUri.ToString();
            }
            catch(Exception)
            {
                // TODO: handle exception
                throw;
            }          
        }

        /// <summary>
        /// Download a file from Azure blob storage
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public static async Task<bool> DownloadAsync(string filePath, string containerName, string blobName)
        {
            try
            {
                // TODO: extract utility method to read config
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
                ConfigurationManager.AppSettings["StorageConnectionString"]);

                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference(containerName);
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(blobName);

                await blockBlob.DownloadToFileAsync(filePath, System.IO.FileMode.Create);
                return true;
            }
            catch (Exception)
            {
                // TODO: handle exception
                return false;
            }
        }

        /// <summary>
        /// Saves selections in the table storage
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static async Task SaveSelection(MashupRequest request)
        {
            try
            {
                // TODO: extract utility method to read config
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
                ConfigurationManager.AppSettings["StorageConnectionString"]);

                // Create the table client.
                CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

                // Retrieve a reference to the table.
                CloudTable table = tableClient.GetTableReference("selections");

                // Create the table if it doesn't exist.
                await table.CreateIfNotExistsAsync();

                var selection = new Selection(request.Email, request.Email)
                {
                    Files = JsonConvert.SerializeObject(request.Files)
                };

                // Create the TableOperation object that inserts the customer entity.
                TableOperation insertOperation = TableOperation.Insert(selection);

                // Execute the insert operation.
                var tableResult = await table.ExecuteAsync(insertOperation);
            }
            catch (Exception)
            {
                // TODO: handle exception
                throw;
            }
        }
    }
}