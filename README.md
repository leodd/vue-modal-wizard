# Vue Modal Wizard

[![npm version](https://badge.fury.io/js/vue-modal-wizard.svg)](https://badge.fury.io/js/vue-modal-wizard)
[![npm](https://img.shields.io/npm/dm/vue-modal-wizard.svg)](https://www.npmjs.com/package/vue-modal-wizard)

> Simple and intuitive, highly customizable Vue.js 2.0+ modal component.

## Install

```
npm i vue-modal-wizard
```

```javascript
import ModalWizard from 'vue-modal-wizard'
Vue.use(ModalWizard)

//use it in your vue component
this.$modal.open(modal, opts)

//or
ModalWizard.open(modal, opts)

/*
The default plugin name is 'modal'.
You can manually define it by giving a name option.
e.g.
Vue.use(ModalWizard, {name: 'coolModal'})
this.$coolModal.open(modal, opts)
*/
```

## Usage

There are three different ways to create a modal.

Define in inline template:

```javascript
this.$modal.open(`
  <template>
    <div>
      {{ message }}
      <button :click="onOk" }>ok</button>
    </div>
  </template>
`, {
  props: {
      message: 'here is a message',
      onOk: () => {console.log('ok')}
    }
})
```

Define in inline render function:

```
// P.S. I use JSX here for simplicity. You can use normal render function if you like.
this.$modal.open((h, props) => {
  return (
    <div>
      { props.message }
      <button onClick={ props.onOk }>ok</button>
    </div>
  )
}, {
  props: {
    message: 'here is a message',
    onOk: () => {console.log('ok')}
  }
})
```

Define in component (Recommended):

```HTML
// define the modal using vue component
<template>
  <div>
    {{ message }}
    <button :click="onOk" }>ok</button>
  </div>
</template>

<script>
  export default {
    props: ['message', 'onOk']
  }
</script>
```

```javascript
// use component as modal
import modal from 'component.vue'
this.$modal.open(modal /* or 'componentName' */, {
  props: {
    message: 'here is a message',
    onOk: () => {console.log('ok')}
  }
})
```
