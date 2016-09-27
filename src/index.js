/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2016/3/31
 * Time: 22:02
 */
import "./css/style.css";
import treeCombox from "./form/field/tree-combox.vue";
import msDateField from "./form/field/date-field.vue";
import msDateRangeField from "./form/field/date-range-field.vue";
import msDateRangeSingleField from "./form/field/date-range-single-field.vue";
import msUeditorField from "./form/field/ueditor-field.vue";
import msKindeditorField from "./form/field/kindeditor-field.vue";
import msImageSelectPreviewField from "./form/field/image-select-preview-field.vue";

/*datepicker*/
import msDatepicker from "./picker/date/datepicker.vue";
import msDatepickerRange from "./picker/date/datepicker-range.vue";
import msDatepickerRangeSingle from "./picker/date/datepicker-range-single.vue";
import msDatepickerTime from "./picker/date/datepicker-time-panel.vue";

import msTreeList from "./tree/tree-list.vue";
import treeView from "./tree/tree-view.vue";
import msTreePanel from "./tree/panel.vue";

import msGridPanel from "./grid/panel.vue";

import msAlert from "./window/MessageBox/alert.vue";
import msConfirm from "./window/MessageBox/confirm.vue";
import msProgress from "./window/MessageBox/progress.vue";
import msModal from "./window/modal.vue";

import msVideo from "./player/video.vue";

import msPagination from "./toolbar/pagination.vue";
//pickerpopup
import pickerPopup from "./picker-popup/popup-picker/index.vue";
import group from "./picker-popup/group/index.vue";
import dateTime from "./picker-popup/datetime/index.vue";

//import "./export";

const MoenSunStrap = {
	msDatepicker,
	msDatepickerRange,
	msDatepickerRangeSingle,
	msDatepickerTime,
	treeCombox,
	msDateField,
	msDateRangeField,
	msDateRangeSingleField,
	msUeditorField,
	msKindeditorField,
	msImageSelectPreviewField,
	msTreeList,
	treeView,
	msTreePanel,
	msGridPanel,
	msAlert,
	msConfirm,
	msProgress,
	msModal,
	msVideo,
	msPagination,
	pickerPopup,
	group,
	dateTime
}

module.exports = MoenSunStrap;
