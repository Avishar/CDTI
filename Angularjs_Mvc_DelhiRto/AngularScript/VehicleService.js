app.service("VehicleService", function ($http) {
    //get All Vehicle 
    this.getAllVehicles = function () {
        return $http.get("VehicleDetails/GetVehicleList");
    }

     this.AllStudentsDetails = function () {
        return $http.get("VehicleDetails/GetVehicleList");
    }

    //get record by id
    this.SearchVehicleById = function (Id) {
        return $http.get("VehicleDetails/GetVehicleLists/" + Id);
    }

    // Adding Record  
    this.AddNewVehicleDetail = function (vehicle) {
        return $http({
            method: "post",
            url: "VehicleDetails/AddVehicle",
            data: JSON.stringify(vehicle),
            dataType: "json"
        });
    }
    // Updating record  
    this.UpdateVehicles = function (VehicleDetail) {
        return $http({
            method: "post",
            url: "VehicleDetails/UpdateVehicle",
            data: JSON.stringify(VehicleDetail),
            dataType: "json"
        });
        
    }
    // Deleting records  
    this.deleteVehicle = function (Id) {
        return $http.post('VehicleDetails/DeleteVehicle/' + Id)
    }
});