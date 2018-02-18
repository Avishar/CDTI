using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Angularjs_Mvc_DelhiRto.Startup))]
namespace Angularjs_Mvc_DelhiRto
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
