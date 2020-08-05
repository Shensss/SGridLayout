<script>
const buildChildren = function (config, slots, h) {
  const children = []
  config.map(item => {
    // 自己这层的slot
    const slotThisLevel = slots.filter(slot => {
      return slot.data.attrs['data-to'] === item.name
    })
    // 其他层
    const slotElse = slots.filter(slot => {
      return slot.data.attrs['data-to'] !== item.name
    })
    // 递归layout组件
    const layout = [h('layout', {
      props: {
        layout: item.layout,
        base: item.base
      },
      style: item.style
    }, slotElse)]

    // slot样式合并
    const childrenStyle = Object.assign({
      gridColumn: item.col.join('/'),
      gridRow: item.row.join('/')
    }, item.style)
    // slot节点
    children.push(h('div', {
      style: childrenStyle,
      class: {
        'sub-child': true
      }
    }, item.layout ? slotThisLevel.concat(layout) : slotThisLevel))
  })
  return children
}
const buildGap = function (option, self) {
  if (self) {
    return self.join(' ')
  } else if (option && option.gap) {
    return option.gap.join(' ')
  } else {
    return ''
  }
}

export default {
  name: 'layout',
  data () {
    return {}
  },
  render (createElement) {
    let children = []
    if (this.$slots.default && this.layout) {
      children = buildChildren(this.layout, this.$slots.default, createElement)
    }
    const cols = this.base.col.join(' ')
    const rows = this.base.row.join(' ')
    const gap = buildGap(this.$OPTION, this.base.gap)
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: cols,
      gridTemplateRows: rows,
      gap: gap
    }

    return createElement('div', {
      style: gridStyle
    }, children)
  },
  props: {
    base: {
      type: Object
    },
    layout: {
      type: Array
    }
  }
}
</script>