using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
//using System.Web.Http;
using System.Web.Http.Description;
using Angularjs_Mvc_DelhiRto.Models;
using System.Web.Mvc;

namespace Angularjs_Mvc_DelhiRto.Controllers
{
    public class VehicleDetailsController : Controller
    {
        private VehicleDetailsEntities dbContext = new VehicleDetailsEntities();
        // GET: Vehicle  
        public ActionResult Index()
        {
            return View();
        }

        //To add a new vehicle details in db.
        [HttpPost]
        public JsonResult AddVehicle(VehicleDetail vhl)
        {
            try
            {
                if (vhl != null)
                {
                        vhl.Id = new Random().Next(10,100).ToString();
                        dbContext.VehicleDetails.Add(vhl);
                        dbContext.SaveChanges();
                        return Json(vhl, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("Some Error Occured");
                }
            }
            catch {
                throw;
            }
        }


        //To update vehicle 
        [HttpPost]
        public string UpdateVehicle(VehicleDetail vhd)
        {
            try {
                if (vhd != null)
                {
                        VehicleDetail lstVehicle = dbContext.VehicleDetails.Where(x => x.Id == vhd.Id).FirstOrDefault();
                        lstVehicle.Address = vhd.Address;
                        lstVehicle.Age = vhd.Age;
                        lstVehicle.Cubic_Capacity = vhd.Cubic_Capacity;
                        lstVehicle.DealerName = vhd.DealerName;
                        lstVehicle.Engine_Number = vhd.Engine_Number;
                        lstVehicle.Horse_Power = vhd.Horse_Power;
                        lstVehicle.Id = vhd.Id;
                        lstVehicle.Maker = vhd.Maker;
                        lstVehicle.Name = vhd.Name;
                        lstVehicle.PanNumber = vhd.PanNumber;
                        lstVehicle.Vehicle_Type = vhd.Vehicle_Type;
                        lstVehicle.YOM = vhd.YOM;

                        dbContext.SaveChanges();
                        return "Vehicle Updated";
                }
                else
                {
                    return "Oops! something went wrong.";
                }
            }
            catch (Exception ex) {
                throw;
            }
        }


        // GET: VehicleDetails/GetVehicleList
        [HttpGet]
        public JsonResult GetVehicleList()
        {

             List<VehicleDetail> vehicleList = dbContext.VehicleDetails.ToList();
             return Json(vehicleList, JsonRequestBehavior.AllowGet); 
        }

        // GET: VehicleDetails/GetVehicleLists/5
        [HttpGet]
        public JsonResult GetVehicleLists(int? Id)
        {
            if (Id != null)
            {
                    var id = Id.ToString();
                    var lstStud = dbContext.VehicleDetails.Find(id);
                    return Json(lstStud, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Oops! Error occered.");
            }
        }

        //to delete an existing vehicle
        [HttpPost]
        public string DeleteVehicle(int Id)
        {
            if (Id != 0)
            {
                    var id = Id.ToString();  
                    var lstStud = dbContext.VehicleDetails.Where(x => x.Id == id).FirstOrDefault();
                    dbContext.VehicleDetails.Remove(lstStud);
                    dbContext.SaveChanges();
                    return "Vehicle has been deleted succhessfully.";
            }
            else
            {
                return " Oops! Error occured.";
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                dbContext.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}