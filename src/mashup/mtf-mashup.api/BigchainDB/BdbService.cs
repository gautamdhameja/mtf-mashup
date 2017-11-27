using mtf_mashup.api.Models;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace mtf_mashup.api.BigchainDB
{
    public class BdbService
    {
        // calls the API to register the mashup asset on BigchainDB
        public static async Task<string> RegisterMusicAsset(string passPhrase, Asset asset)
        {
            var bdbServer = ConfigurationManager.AppSettings["BigChainDBAPI"];
            var transaction = new Transaction();
            var request = new BdbRequest
            {
                Asset = asset,
                Metadata = null,
                PassPhrase = passPhrase
            };

            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(bdbServer);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var content = new StringContent(JsonConvert.SerializeObject(request));
                    var response = await client.PostAsync("assets", content);
                    if (response.IsSuccessStatusCode)
                    {
                        string data = await response.Content.ReadAsStringAsync();
                        transaction = JsonConvert.DeserializeObject<Transaction>(data);
                    }
                }

                return transaction.Id;
            }
            catch (Exception)
            {
                // TODO: handle exception
                throw;
            }
        }
    }
}