using Newtonsoft.Json;

namespace mtf_mashup.api.Models
{
    public class Transaction
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("asset")]
        public object Asset { get; set; }

        [JsonProperty("metadata")]
        public object Metadata { get; set; }
    }
}