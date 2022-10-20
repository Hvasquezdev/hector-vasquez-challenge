<template>
  <div class="base-card">
    <slot />
  </div>
</template>

<style>
.base-card {
  padding: 32px;
  border-radius: var(--border-radius);
  background-color: #fff;
  width: 100%;
  max-width: 468px;
}
</style>
