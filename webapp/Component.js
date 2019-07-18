sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"employee/employee/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("employee.employee.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			var oDeviceModel = new sap.ui.model.json.JSONModel({
				isTouch: sap.ui.Device.support.touch,
				isNoTouch: !sap.ui.Device.support.touch,
				isPhone: sap.ui.Device.system.phone,
				isNoPhone: !sap.ui.Device.system.phone,
				listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
				listItemType: sap.ui.Device.system.phone ? "Active" : "Inactive"
			});
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// enable routing
			this.getRouter().initialize();

			// set the device model
		}
	});
});