<template>
  <div class="c-author">
    <div class="c-author__img-container">
      <img :src="require(`~/assets/images/${author.img}`)" :alt="author.imgAlt" class="c-author__img">
    </div>
    <div class="c-author__info">
      <h4 class="c-author__name">{{ author.name }}</h4>
      <p class="c-author__bio">{{ author.bio }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      author: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.c-author {
  display: flex;
  align-items: center;

  &__img-container {
    width: rem(60px);
    height: rem(60px);
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 rem(2px) rem(4px) rgba(255,255,255,.5), 0 rem(2px) rem(4px) rgba(0,0,0,.5);
    margin-right: rem(16px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__img {
    max-width: 100%;
    display: block;
  }

  &__name {
    font-size: rem(19px);
    font-weight: bold;
  }

  &__bio {
    color: #abacbf;
    margin-top: rem(3px);
  }
}
</style>