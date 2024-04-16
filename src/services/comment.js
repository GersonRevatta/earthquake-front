import http from "@/http";

export const commentService = {
  postComment(object) {
    let url = `earthquake_events/${object.earthquake_event_id}/comments`
    return http.post(url, { comment: object } );
  },
  getCommentsByEarthquake(object) {
    let url = `earthquake_events/${object.earthquake_event_id}/comments`
    return http.get(url);
  },
};
