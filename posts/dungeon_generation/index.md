---
title: "Procedural generation: 2D Dungeon generation"
date: "2023-07-17"
---

<script lang="ts">
  import DemoCanvas from "$lib/demos/DemoCanvas.svelte"
  import SimpleDungeonGenerationDemo from "$lib/demos/dungeon_generation/SimpleNaive.svelte"
</script>

I love procedural generation. Most games nowdays have some sort of procedural generation. 
It can be used to simulate complicated environmental effects, to spawn items and enemies within a level, or to create entire unique game worlds and levels.
I decided to learn some procedural genration techniques and algorithms which could possibly help me in my solo game dev projects.

Since I play quite a bit of roguelikes/lites in my spare time, I decided to start my procedural generation journey by learning to create some simple (and not so simple) 2D dungeons.
Here is my own simple algorithm...

### A Simple naive dungeon generation algorithm using rectangular rooms and corridors

<SimpleDungeonGenerationDemo />
