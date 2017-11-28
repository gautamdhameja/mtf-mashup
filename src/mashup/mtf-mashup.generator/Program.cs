using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using mtf_mashup.api.Models;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace mtf_mashup.generator
{
    class Program
    {
        static void Main(string[] args)
        {
            // Step 0: Download all tracks in temp location
            var temp = Path.GetTempPath();
            Directory.CreateDirectory(Path.Combine(temp, "Tracks"));

            // Step 1: Read all table entries
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
            ConfigurationManager.AppSettings["StorageConnectionString"]);
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
            CloudTable table = tableClient.GetTableReference("slushmusic");
            TableContinuationToken token = null;
            var entities = new List<Selection>();
            do
            {
                var queryResult = table.ExecuteQuerySegmented(new TableQuery<Selection>(), token);
                entities.AddRange(queryResult.Results);
                token = queryResult.ContinuationToken;
            }
            while (token != null);

            // Step 2: Create Mashup and send mail for all entities
            foreach (var entity in entities)
            { 


            }
        }

        /// <summary>
        /// Send email using sendgrid
        /// </summary>
        /// <param name="email"></param>
        /// <param name="asset"></param>
        /// <param name="link"></param>
        /// <returns></returns>
        private static async Task SendMailAsync(string email, string asset, string link)
        {
            var apiKey = ConfigurationManager.AppSettings["SendGridKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("mtf@slushmusic.org", "Slush Music");
            var subject = "Here's what you created!";
            var to = new EmailAddress(email);

            var body = new StringBuilder();
            body.Append("Thanks for creating with the Slush Music Blockchain Mashup app.");
            body.Append(Environment.NewLine);
            body.Append("Your mashup is available for download at: " + link);
            body.Append(Environment.NewLine);
            body.Append("And the BigchainDB blockchain asset is available at: " + asset);
            body.Append(Environment.NewLine);
            body.Append("Have a great day!");

            var msg = MailHelper.CreateSingleEmail(from, to, subject, body.ToString(), null);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
