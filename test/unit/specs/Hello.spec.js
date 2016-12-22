import Vue from 'vue'
import Tree from 'src/components/Tree'

describe('Tree.vue', () => {
  it('should render correct contents', () => {
    // const vm = new Vue({
    //   el: document.createElement('div'),
    //   render: (h) => h(Hello)
    // })
    // expect(vm.open)
    //   .to.equal(true)
    expect(typeof Tree.data).toBe('function')
    const defaultData = Tree.data()
    expect(defaultData.open).toBe(false)
  })
})
