pragma solidity ^0.4.24;
contract CarDealership {
   string bundleHash;
   function registerCar(string VIN, string Make, string Model, string _bundleHash, bytes32 assetId, bytes32 car) public {}
   function accidentReport(string report_name, string _bundleHash, bytes32 assetId, bytes32 car) public {}
   function carSale(string soldTo, bytes20 amount, string _bundleHash, bytes32 assetId, bytes32 car) public {}
}
