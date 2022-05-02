<template>
  <div class="container">
      <div class="titleContainer">
        <h1 class="mainTitle">- Hacker News Stories -</h1>
      </div>
      <div class="story" v-for="story in sorted_stories()" :key="story">
        <div class="storyContainer">
          <div class="imgContainer"></div>
          <div class="storyScore">
            <p class="score">Story score: {{ story.data.score }}</p>
          </div>
          <div class="info">
            <p class="title">{{ story.data.title }}</p>
            <a href="{{ story.data.url }}" class="link">{{ story.data.url }}</a>
            <p class="meta">
             {{ story.data.time }} | Story ID: {{ story.data.id }}
            </p>
            <div class="authorContainer" v-for="author in authorForStories(story.data.by)" :key="author.id">
              <p class="authorInfo"> by {{ author.data.id }} | Current karma: {{ author.data.karma }} </p>
            </div>
          </div>
        </div>
    </div>
  </div>

</template>

<style>
@import 'styles.css';
</style>

<script src="./index.js">

</script>
