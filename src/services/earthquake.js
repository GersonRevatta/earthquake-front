import http from "@/http";

export const earthquakeService = {
  getEarthquakes() {
    return http.get("earthquake_events");
  }
};
