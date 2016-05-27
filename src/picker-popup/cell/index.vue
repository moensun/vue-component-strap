<template>
  <div class="weui_cell" :class="{'vux-tap-active': isLink || !!link}">
    <div class="weui_cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui_cell_bd" :class="{'weui_cell_primary':primary==='title'}">
      <p>
        {{title}}
        <slot name="after-title"></slot>
      </p>
      <inline-desc>{{inlineDesc}}</inline-desc>
    </div>
    <div class="weui_cell_ft" :class="{'weui_cell_primary':primary==='content', 'with_arrow': isLink || !!link}">
      {{value}}
      <slot name="value"></slot>
    </div>
  </div>
</template>

<script>
import InlineDesc from '../inline-desc/index.vue'
export default {
  components: {
    InlineDesc
  },
  props: {
    title: {
      type: String
    },
    value: {
      type: String
    },
    isLink: Boolean,
    inlineDesc: {
      type: String
    },
    primary: {
      type: String,
      default: 'title'
    },
    link: {
      type: [String, Object]
    }
  },
  methods: {
//    onClick () {
//      go(this.link, this.$router)
//    }
  }
}
</script>

<style lang="less">
@import '../styles/weui.0.4.2.min.css';
.vux-center-v, .vux-center-h, .vux-center {
  display: flex;
}

.vux-center-v, .vux-center {
  align-items: center;
}

.vux-center-h, .vux-center {
  justify-content: center;
}
.vux-tap-active {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.vux-tap-active:active {
  background-color: #ECECEC;
}
.weui_cell_bd p{
    margin:0px;
}
</style>
