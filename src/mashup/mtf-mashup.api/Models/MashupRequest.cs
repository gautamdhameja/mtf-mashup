using Newtonsoft.Json;

namespace mtf_mashup.api.Models
{
    public class MashupRequest
    {
        [JsonProperty("files")]
        public string[] Files { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("passPhrase")]
        public string PassPhrase { get; set; }
    }
}