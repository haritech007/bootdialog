function bootDialog(options) {

	var defaults = {
		id: 'dialog-0',
		heading: "Dialog"
	};

	var self = this;
	var settings = $.extend(defaults, options);
	
	function createModal() {
		var ui = '<div class="modal fade" tabindex="-1" role="dialog" id="{{id}}">\
			<div class="modal-dialog">\
				<div class="modal-content">\
					<div class="modal-header"><h5 class="modal-title">{{heading}}</h5><button data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">&times;</span></button></div>\
					<div class="modal-body">Body</div>\
					{{action}}\
				</div>\
			</div>\
		</div>';
		ui = ui.replace(/{{id}}/gm, settings.id);
		ui = ui.replace(/{{heading}}/gm, settings.heading);
		var action = "";
		if(settings.buttons && settings.buttons.length) {
			for(var keys = 0; keys < settings.buttons.length; keys++) {
				var btnId = settings.id + "-btn-" + keys; 
				action += "<button id=\"" + btnId+ "\" class=\"{{class}}\">{{label}}</button>".replace(/{{label}}/g, settings.buttons[keys].label).replace(/{{class}}/g, settings.buttons[keys].class);
				if(settings.buttons[keys].fn){
					$(document).on("click", "#" + btnId, settings.buttons[keys].fn);
				}
			}
			ui = ui.replace(/{{action}}/g, "<div class=\"modal-footer\">" + action + "</div>");
		} else {
			ui = ui.replace(/{{action}}/g, "");
		}

		return ui;
	}

	function init() {
		var modal = createModal();
		if(!$("#" + settings.id).length) {
			$("body").append(modal);
		}
	}

	self.show = function() {
		$("#" + settings.id).modal("show");
	};

	self.hide = function() {
		$("#" + settings.id).modal("hide");
	};

	self.toggle = function() {
		var dialog = $("#" + settings.id);
		if(dialog.hasClass("in")) {
			dialog.modal("hide");
		} else {
			dialog.modal("show");
		}
	};

	init();
	return self;
};