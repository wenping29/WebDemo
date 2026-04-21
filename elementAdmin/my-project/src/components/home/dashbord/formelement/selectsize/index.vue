<template>
  <div class="col-md-6 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Select size</h4>
        <p class="card-description">
          Add classes like <code>.form-control-lg</code> and <code>.form-control-sm</code>.                    
        </p>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Large select</label>
          <select class="form-control form-control-lg" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Default select</label>
          <select class="form-control" id="exampleFormControlSelect2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect3">Small select</label>
          <select class="form-control form-control-sm" id="exampleFormControlSelect3">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import leftmenu from './leftMenu/index'
export default {
  components: {
    // leftmenu
  }
}
</script>
<style>
</style>