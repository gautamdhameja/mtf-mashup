using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mtf_mashup.api.Models
{
    public class BdbRequest
    {
        [JsonProperty("asset")]
        public Asset Asset { get; set; }

        [JsonProperty("metadata")]
        public object Metadata { get; set; }

        [JsonProperty("passPhrase")]
        public string PassPhrase { get; set; }
    }
}