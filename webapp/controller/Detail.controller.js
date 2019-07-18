sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"


], function (Controller,History) {
	"use strict";

	return Controller.extend("employee.employee.controller.Detail", {
		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachMatched(this._onRouteMatched, this);
		},
		onBeforeRendering: function () {

			// var oModel = this.getOwnerComponent().getModel("Model");
			// var oView;
			// oView = this.getView();
			// oModel.attachRequestCompleted(function (event) {
			// 	var fItem2 = event.getSource().aBindings[18].aKeys[0];
			// 	oView.bindElement({
			// 		path: "/" + fItem2,
			// 		model: "Model"
			// 	});
			// });

		},

		onAfterRendering: function () {
			var oJSONModel = new sap.ui.model.json.JSONModel();
			var oView = this.getView();
			// var tempArray = [];
			this.getOwnerComponent().getModel("Model").read("/GetEmployeeListSet", {
				method: "GET",
				success: function (data) {
					// alert(JSON.stringify(data));
					oJSONModel.setData(data);
					var result = data.results[0].EmployeeID;
					// tempArray = JSON.stringify(data);
					// // alert(tempArray);
					// console.log(tempArray);
					oView.bindElement({
						path: "/GetEmployeeListSet('" + result + "')",
						model: "Model"
					});

				}
			});

		},

		_onRouteMatched: function (oEvent) {

			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments").employeeId;
			oView = this.getView();
			oView.bindElement({
				path: "/" + oArgs,
				model: "Model"
			});

		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("main", true);
			}
		}

	});
});