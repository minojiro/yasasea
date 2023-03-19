<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
// import * as list from "@fortawesome/free-regular-svg-icons";

[
  solidIcons.faRobot,
  solidIcons.faSpinner,
  solidIcons.faCheck,
  solidIcons.faPaperPlane,
].forEach((icon) => library.add(icon));

const props = defineProps({
  icon: {
    type: String,
    default: "robot",
  },
  animateSpin: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <FontAwesomeIcon
    :icon="props.icon"
    :class="{ 'animate-spin': animateSpin }"
  />
</template>
