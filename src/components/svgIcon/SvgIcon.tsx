import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    prefix: {
      type: String,
      default: "icon",
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#ef4",
    },
    size: {
      // 图标尺寸
      type: String,
      default: '32'
    },
    height: {
        // 图标尺寸
        type: String,
        default: ''
    },
    width:{
      type:String,
      default: ''
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return { symbolId };
  },
  render() {
    const  { size, height, width } = this.$props
    return (
      <svg aria-hidden="true" 
      style={{width: width ? width : `${size}px`, height: height ? `${height}px` : `${size}px`}} 
      >
        <use href={this.symbolId}  fill={this.color}/>
      </svg>
    );
  },
});
