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
            // create mashup
            var mashedUp = Audio.AudioService.CreateMashup(request.Files);

            // upload to azure blog storage and get blob uri
            var assetUrl = await Storage.StorageService.UploadAsync(mashedUp, "audience", Path.GetFileName(mashedUp));
            var asset = new Asset
            {
                Email = request.Email,
                Link = assetUrl
            };

            // save asset in BigchainDB
            return await BigchainDB.BdbService.RegisterMusicAsset(request.PassPhrase, asset);
        }

        /// <summary>
        /// Stores mashup selections
        /// </summary>
        /// <param name="values"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<bool> Select([FromBody] MashupRequest request)
        {
            await Storage.StorageService.SaveSelection(request);
            return true;
        }
    }
}
