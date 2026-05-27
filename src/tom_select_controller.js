import {Controller} from "@hotwired/stimulus"
import TomSelect from "tom-select/popular";

export class TomSelectController extends Controller {
	static values = {
		dropDownInput: {type: Boolean, default: false},
		removeButton: {type: Boolean, default: true},
		maxOptions: {type: Number, default: null},
		dropdownParent: {type: String, default: null},
		openOnFocus: {type: Boolean, default: true},
	}

	get plugins() {
		let plugins = []
		if (this.dropDownInputValue) plugins.push("dropdown_input")
		if (this.removeButtonValue) plugins.push("remove_button")
		return plugins
	}

	connect() {
		this.reconnect = this.reconnect.bind(this); // Ensure that`this` points back to our controller
		window.addEventListener('turbo:morph', this.reconnect);
		this.initTomSelect()
	}

	initTomSelect() {
		this.tomSelect = new TomSelect(this.element, {
			maxOptions: this.maxOptionsValue,
			dropdownParent: this.dropdownParentValue,
			openOnFocus: this.openOnFocusValue,
			plugins: this.plugins,
		})
	}

	disconnect() {
		window.removeEventListener('turbo:morph', this.reconnect);
		this.tomSelect.destroy()
	}

	reconnect() {
		this.selected = this.tomSelect.getValue()
		this.tomSelect.destroy()
		this.initTomSelect()
		this.tomSelect.setValue(this.selected)
	}
}
