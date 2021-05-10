<template>
  <div class="menu-container">
    <sl-vue-tree
      ref="slVueTree"
      @input="onInputHandler"
      v-model="data"
      v-if="data" />
    <!-- <tree
      :data="data"
      draggable="draggable"
      @drag="ondrag"
      cross-tree="cross-tree">
      <div slot-scope="{data, store}">
        <template v-if="!data.isDragPlaceHolder">
          <v-btn
            icon
            small
            class="success"
            v-if="data.children && data.children.length"
            @click="store.toggleOpen(data)"><v-icon>{{data.open ? 'remove' : 'add'}}</v-icon></v-btn>
          <v-icon v-if="data.icon">{{ data.icon }}</v-icon>
          <span>{{data.orden}}.</span> <span>{{data.text}}</span>
        </template>
      </div>
    </tree> -->
  </div>
</template>

<script>
import '../../../../node_modules/sl-vue-tree/dist/sl-vue-tree-dark.css';
import { DraggableTree } from 'vue-draggable-nested-tree';
import SlVueTree from 'sl-vue-tree';
import * as th from 'tree-helper';

// var nodes = [
//   {title: 'Item1', isLeaf: true},
//   {title: 'Item2', isLeaf: true, data: { visible: false }},
//   {title: 'Folder1'},
//   {
//     title: 'Folder2', isExpanded: true, children: [
//       {title: 'Item3', isLeaf: true},
//       {title: 'Item4', isLeaf: true}
//     ]
//   }
// ];

export default {
  components: {
    Tree: DraggableTree,
    SlVueTree
  },
  data () {
    return {
      data: null,
      maxLevel: 2,
      prevNodes: null
    };
  },
  mounted () {
    this.getAllMenu();
  },
  methods: {
    setMenu (menu) {
      let data = [];
      for (let i in menu) {
        let item = {
          title: menu[i].label,
          orden: menu[i].orden,
          level: 2
        };
        if (menu[i].icon) {
          item.icon = menu[i].icon;
        }
        if (menu[i].submenu && menu[i].submenu.length) {
          let children = [];
          menu[i].submenu.map(item => {
            children.push({
              title: item.label,
              orden: item.orden
            });
          });
          item.children = children;
        }
        data.push(item);
      }
      return data;
    },
    getAllMenu () {
      this.$service.get('system/menu?all=true')
      .then(response => {
        if (response) {
          this.data = this.setMenu(response.menu);
          this.cloneDeep(this.data);
        }
      });
    },
    ondrag (node) {
      let nodeLevels = 1;
      th.depthFirstSearch(node, (childNode) => {
        if (childNode.level > nodeLevels) {
          nodeLevels = childNode.level;
        }
      });
      nodeLevels = nodeLevels - node.level + 1;
      const childNodeMaxLevel = this.maxLevel - nodeLevels;
      th.depthFirstSearch(this.data, (childNode) => {
        if (childNode === node) {
          return 'skip children';
        }
        this.$set(childNode, 'droppable', childNode.level <= childNodeMaxLevel);
      });
    },
    onInputHandler(newNodes) {
      let slVueTree = this.$refs.slVueTree;
      let limitReached = false;
      let childrenLimit = 3;

      slVueTree.traverse((node) => {
        if (node.children.length > childrenLimit) limitReached = true;
      });

      if (limitReached) {
        // alert('Limit is reached');
        this.nodes = this.cloneDeep(this.prevNodes);
        return;
      }

      this.prevNodes = this.cloneDeep(newNodes);
    },

    cloneDeep(obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }
};
</script>

<style lang="scss">
.he-tree{
  border: 1px solid #ccc;
  padding: 15px;
}
.tree-node{
}
.tree-node-inner{
  padding: 5px 8px;
  border: 1px solid #ccc;
  cursor: pointer;

  .v-btn {
    margin: 0 0 0 -5px;
  }
}
.draggable-placeholder{
}
.draggable-placeholder-inner{
  border: 1px dashed #0088F8;
  box-sizing: border-box;
  background: rgba(0, 136, 249, 0.09);
  color: #0088f9;
  text-align: center;
  padding: 0;
  display: flex;
  align-items: center;
}
</style>
