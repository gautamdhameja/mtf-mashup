using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.Storage; 
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.Azure;
using System.Configuration;

namespace mtf_mashup.api.Storage
{
    public class StorageService
    {
        /// <summary>
        /// Uploads a file to Azure blob storage
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static async Task<bool> UploadAsync(string filePath, string containerName, string blobName)
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
                    blockBlob.UploadFromStream(fileStream);
                }

                return true;
            }
            catch(Exception ex)
            {
                // TODO: handle exception
                return false;
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
    }
}