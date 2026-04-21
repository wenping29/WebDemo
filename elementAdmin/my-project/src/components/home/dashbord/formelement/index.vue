<template>
  <div class="container-fluid page-body-wrapper">
    <div class="main-panel">        
      <div class="content-wrapper">
        <div class="row">
          <basicform></basicform>
          <bootstrapinput></bootstrapinput>
          <checkbox></checkbox>
          <defaultcom></defaultcom>
          <horizontal></horizontal>
          <inline></inline>
          <inputsize></inputsize>
          <selectsize></selectsize>
          <twocolumn></twocolumn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import basicform from './basicform/index'
import bootstrapinput from './bootstrapinput/index'
import checkbox from './checkbox/index'
import defaultcom from './default/index'
import horizontal from './horizontal/index'
import inline from './inline/index'
import inputsize from './inputsize/index'
import selectsize from './selectsize/index'
import twocolumn from './twocolumn/index'
export default {
  components: {
    basicform,
    bootstrapinput,
    checkbox,
    defaultcom,
    horizontal,
    inline,
    inputsize,
    selectsize,
    twocolumn
  }
}
</script>
<style>
</style>