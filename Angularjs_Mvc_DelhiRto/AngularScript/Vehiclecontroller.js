app.controller("stuCntr", function ($scope, VehicleService) {

    //Variabled declared here.
    $scope.RetValData = "";
    $scope.RetValData1 = "";
    $scope.oldvalue = "";
    $scope.indexed = "";

    //Array variables declared here.
    $scope.vehicles = [];
    $scope.answers = [];

    //True/False on ng-show elements.
    $scope.dVehicle = false;
    $scope.dvVehicleDetails = false;
    $scope.valsh = true;
    $scope.txtsh = false;
    $scope.dltbtn = true;
    $scope.cnltbtn = false;
    $scope.svbtn = false;

    GetVehicleList();
   
 
    //To Get All Records  
    function GetVehicleList() {
        VehicleService.getAllVehicles().success(function (stu) {
            $scope.updtbtn = true;
            $scope.vehicles = "";
            $scope.vehicles = stu;
        }).error(function() {  
            //alert('Records Updated');  
        });  
    }

    //To do editing part
    $scope.searchVehicleByIdForShow = function (id_Search) {
        
        VehicleService.SearchVehicleById(id_Search).then(function (answer) {
            
            if (!$scope.dvVehicleDetails) {
                $scope.dvVehicleDetails = true;
                $scope.answers = JSON.parse('[' + JSON.stringify(answer.data) + ']');
            }
            else {
                $scope.dvVehicleDetails = false;
                $scope.id_Search = null;
            }
        }).error(function () {
            alert('Error in getting records by id ');
        });
        $scope.dvVehicleDetails = false;
    }

    //This will update vehicle list after editing part.
    $scope.saveVehicle = function (VehicleDetail, index) {
        var x = updateData(VehicleDetail, index);
        GetVehicleList();
        window.location.reload();
    }


    //To restore the old values of table cells if editing got canceled.
    $scope.SearchVehicleByIdCancel = function (answer, index) {
        $scope.oldvalue;
        $scope.answers[index] = $scope.oldvalue;
        $scope.txtsh = false;
        $scope.updtbtn = true;
        $scope.valsh = true;
        $scope.cnltbtn = false;
        $scope.svbtn = false;
        $scope.dvVehicleDetails = false;

    }

    function updateData(VehicleDetail, index) {
        var RetValData = VehicleService.UpdateVehicles(VehicleDetail);
        RetValData.then(function (stu) {
            $scope.vehicles = "";
            $scope.vehicles = stu;
        },
        function () {
            // alert('Records updated succesfully');
        });
    }

    $scope.vehicleUpdate = function (id_Search) {
        $scope.oldvalue = angular.copy(id_Search);
        $scope.valsh = false;
        $scope.txtsh = true;
        $scope.updtbtn = false;
        $scope.cnltbtn = true;
        $scope.svbtn = true;
       
    }

    // To display Add div  
    $scope.addNewVehicle = function() {
        $scope.Action = "Add";
        if (!$scope.dVehicle) {
            $scope.dVehicle = true;
        
        } else {
            $scope.dVehicle = false;
        }
    }

    // Adding New vehicle record  in db.
    $scope.addNewVehicleDetail = function (vehicle) {
        VehicleService.AddNewVehicleDetail(vehicle).success(function (msg) {

                $scope.vehicles.push(msg)
                $scope.dvAddStudnet = false;
                $scope.dVehicle = false;
                $scope.vehicle = null;
                alert('Vehicle has been added successfully.');

            }).error( function() {  
                alert('Error in adding record');  
            });  
    }

    // Deleting record.  
    $scope.deleteVehicle = function (stu, index) {    
            var retval = VehicleService.deleteVehicle(stu.Id).success(function(msg) {  
                $scope.vehicles.splice(index, 1);
                alert('Vehicle has been deleted successfully.');
                $scope.dvVehicleDetails = true;
                $scope.id_Search = null;
                alert( $scope.dvVehicleDetails.valueOf());
            }).error(function() {  
                alert('Oops! something went wrong.');  
            });
           
    }
           
});  