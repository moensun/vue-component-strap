/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2016/3/31
 * Time: 22:02
 */
'use strict';
import "./css/style.css";
import treeCombox from "./form/field/tree-combox.vue";
import msDateField from "./form/field/date-field.vue";
import msDateRangeField from "./form/field/date-range-field.vue";
import msDateRangeSingleField from "./form/field/date-range-single-field.vue";
import msUeditorField from "./form/field/ueditor-field.vue";

import msDatepicker from "./picker/date/datepicker.vue";
import msDatepickerRange from "./picker/date/datepicker-range.vue";
import msDatepickerRangeSingle from "./picker/date/datepicker-range-single.vue";

import msTreeList from "./tree/tree-list.vue";
import treeView from "./tree/tree-view.vue";
import msTreePanel from "./tree/panel.vue";

import msGridPanel from "./grid/panel.vue";

import msAlert from "./window/MessageBox/alert.vue";
import msConfirm from "./window/MessageBox/confirm.vue";
import msModal from "./window/modal.vue";

import msVideo from "./player/video.vue";
//import "./export";

module.exports = {
	msDatepicker,
	msDatepickerRange,
	msDatepickerRangeSingle,
	treeCombox,
	msDateField,
	msDateRangeField,
	msDateRangeSingleField,
	msUeditorField,
	msTreeList,
	treeView,
	msTreePanel,
	msGridPanel,
	msAlert,
	msConfirm,
	msModal,
	msVideo
}

