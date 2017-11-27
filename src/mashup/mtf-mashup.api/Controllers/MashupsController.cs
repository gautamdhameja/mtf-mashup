using mtf_mashup.api.Models;
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
        public async Task<string> Mashup([FromBody] MashupRequest request)
        {
            var mashedUp = Audio.AudioService.CreateMashup(request.Files);
            var assetUrl = await Storage.StorageService.UploadAsync(mashedUp, "audience", Path.GetFileName(mashedUp));
            var asset = new Asset
            {
                Name = request.Name,
                Email = request.Email,
                Link = assetUrl
            };

            return await BigchainDB.BdbService.RegisterMusicAsset(request.PassPhrase, asset);
        }
    }
}
