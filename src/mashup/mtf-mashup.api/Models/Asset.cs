using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mtf_mashup.api.Models
{
    public class Asset
    {
        public Asset()
        {
            this.Type = "mtfperflab";
        }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Link { get; set; }

        public string Type { get; private set; }
    }
}