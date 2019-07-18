sap.ui.define([
	'jquery.sap.global',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel',
	"sap/ui/core/EventBus",
	"sap/ui/Device",
	'sap/base/Log'
], function (jQuery, MessageToast, Fragment, Controller, Filter, JSONModel, Log, FilterOperator, EventBus, Device) {
	"use strict";

	return Controller.extend("employee.employee.controller.Master", {

		onInit: function () {

		},

		onItemPress: function (oEvent) {

			var oItem, oCtx, loRouter, path;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext("Model");
			path = oCtx.getPath().split("/").slice(-1).pop();
			loRouter = sap.ui.core.UIComponent.getRouterFor(this);
			loRouter.navTo("detail", {
				employeeId: path
			});

		},

		onSearch: function (oEvent) {
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var sQueryUpLow = sQuery[0].toUpperCase() + sQuery.substr(1).toLowerCase();
				var filter = new Filter("Firstname", sap.ui.model.FilterOperator.Contains, sQueryUpLow);
				aFilters.push(filter);
			}

			// update list binding
			var list = this.getView().byId("employeeList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		}

	});
});