using System.Web;
using System.Web.Mvc;

namespace Angularjs_Mvc_DelhiRto
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
