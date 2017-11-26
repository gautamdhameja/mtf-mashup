using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Threading.Tasks;
using System.Web.Http;

namespace mtf_mashup.api.Controllers
{
    public class MashupsController : ApiController
    {
        /// <summary>
        /// Creates a mashup of mp3 files identified by IDs passed
        /// </summary>
        /// <param name="values"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task Mashup([FromBody] string[] values)
        {
            var mashedUp = Audio.AudioService.CreateMashup(values);
            await Storage.StorageService.UploadAsync(mashedUp, "audience", Path.GetFileName(mashedUp));
        }
    }
}
