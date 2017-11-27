using NAudio.Lame;
using NAudio.Wave;
using System;
using System.Configuration;
using System.IO;
using System.Linq;

namespace mtf_mashup.api.Audio
{
    public class AudioService
    {
        /// <summary>
        /// Creates a mashup of two or more mp3 files by using naudio
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        public static string CreateMashup(string[] files)
        {
            if (files.Count() < 2)
            {
                throw new Exception("Not enough files selected!");
            }

            try
            {
                var mixer = new WaveMixerStream32
                {
                    AutoStop = true
                };

                var outputFile = Path.Combine(Path.GetTempPath(), ConfigurationManager.AppSettings["AudienceDirName"], Guid.NewGuid().ToString() + ".mp3");

                foreach (var file in files)
                {
                    var filePath = Path.Combine(Path.GetTempPath(), ConfigurationManager.AppSettings["PerfLabDirName"], file + ".mp3");
                    if (File.Exists(filePath))
                    {
                        var reader = new Mp3FileReader(filePath);
                        var waveStream = WaveFormatConversionStream.CreatePcmStream(reader);
                        var channel = new WaveChannel32(waveStream);
                        channel.Volume = 0.5f;
                        mixer.AddInputStream(channel);
                    }
                }

                var wave32 = new Wave32To16Stream(mixer);
                var mp3Writer = new LameMP3FileWriter(outputFile, wave32.WaveFormat, 128);
                wave32.CopyTo(mp3Writer);
                wave32.Close();
                mp3Writer.Close();
                return outputFile;
            }
            catch(Exception)
            {
                // TODO: handle exception
                throw;
            }
        }
    }
}