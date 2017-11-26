using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace mtf_mashup.api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            CheckAddBinPath();
            CreateWorkingDirs();
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        }

        private void CreateWorkingDirs()
        {
            var temp = Path.GetTempPath();
            var perfDirName = ConfigurationManager.AppSettings["PerfLabDirName"];
            var audienceDirName = ConfigurationManager.AppSettings["AudienceDirName"];
            Directory.CreateDirectory(Path.Combine(temp, perfDirName));
            Directory.CreateDirectory(Path.Combine(temp, audienceDirName));
        }

        private void CheckAddBinPath()
        {
            var binPath = Path.Combine(new string[] { AppDomain.CurrentDomain.BaseDirectory, "bin" });
            var path = Environment.GetEnvironmentVariable("PATH") ?? "";

            if (!path.Split(Path.PathSeparator).Contains(binPath, StringComparer.CurrentCultureIgnoreCase))
            {
                path = string.Join(Path.PathSeparator.ToString(), new string[] { path, binPath });
                Environment.SetEnvironmentVariable("PATH", path);
            }
        }
    }
}
