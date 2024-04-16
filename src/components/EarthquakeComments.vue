<template>
  <div>
    <h3>Comments</h3>
    <hr>
    <p v-for="(element, index) in comments" :key="`comment-${index}`">
      {{ element.body }}
    </p>
    <hr>
    <Textarea v-model="comment.body" rows="5" cols="60" /> 
    <Button label="Save comment" :disabled="comment.body ? false : true" @click="saveComment"></Button>
  </div>
</template>
<script>

import { commentService } from "@/services/comment";

import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

export default {
  name: 'EarthquakeComments',
  props: {
    earthquake_event_id: Number
  },
  components: {
    Button, Textarea,
  },
  mounted() {
    this.loadComments();
  },
  data() {
    return {
      comment: { earthquake_event_id: Number || 0, body: '' },
      comments: []
    };
  },
  methods: {
    async loadComments() {
      this.comment.earthquake_event_id = this.earthquake_event_id
      const response = await commentService.getCommentsByEarthquake(this.comment);
      this.comments = response.data
    },
    async saveComment() {
      const response = await commentService.postComment(this.comment);
      this.comments.push(response.data)
      this.comment.body = ''
    }
  }
}
</script>
<style scoped>
</style>
