<template>
  <div class="text-center">
    <p>{{ $t('installed.thanks') }}</p>

    <p>{{ $t('installed.success') }}</p>

    <a :href="redirect" class="btn btn-primary mb-3">
      {{ $t('installed.go') }} <b-icon-lightning-fill/>
    </a>

    <p>
      <span v-html="$t('installed.support')"/>
      <b-icon-heart-fill class="like-icon-color"/>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Done',

  computed: {
    redirect() {
      return window.location.href
        .replace('install.php', '')
        .replace('?', '');
    },
  },
};
</script>

<style lang="scss">
.like-icon-color {
  color: #ff7273;
}
</style>
