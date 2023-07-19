---
title: Dungeon Generation
date: "2023-07-17"
---

<script lang="ts">
  import DemoCanvas from "$lib/demos/DemoCanvas.svelte"
  import * as simple from "$lib/demos/dungeon_generation/simple.ts"
</script>

### A Simple naive dungeon generation algorithm using rectangular rooms and corridors

<DemoCanvas init={simple.init} start={simple.start} />
