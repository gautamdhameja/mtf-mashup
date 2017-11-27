using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mtf_mashup.api.Models
{
    
    public class MashupRequest
    {
        public string[] Files { get; set; }

        public string Email { get; set; }

        public string PassPhrase { get; set; }
    }
}