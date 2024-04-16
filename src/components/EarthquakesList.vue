<template>
  <div>
    <div>
      <h3>Earthquakes list</h3>
      <div>
        <Dropdown
          v-model="selectedMagType"
          :options="mag_types"
          optionLabel="name"
          placeholder="Select a mag type"
          class="w-full md:w-14rem" />
      </div>
    </div>
    <div class="content-list flex justify-content-center">
      <DataTable paginator :rows="5" :value="filteredEarthquakes" tableStyle="min-width: 50rem">
        <Column field="id" header="Id"></Column>
        <Column field="attributes.title" header="Title"></Column>
        <Column field="type" header="Features"></Column>
        <Column field="attributes.mag_type" header="Mag Type"></Column>
        <Column header="Tsunami" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
          <template #body="{ data }">
            <Badge :value="data.attributes.tsunami" size="large" severity="warning"></Badge>
          </template>
        </Column>
        <Column header="Links" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
          <template #body="{ data }">
            <a :href="data.links" target="_blank">
              <Button label="Source"></Button>
            </a>
          </template>
        </Column>
        <Column header="Actions" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
          <template #body="{ data }">
            <Button label="Details"  @click="openModal(data)"></Button>
          </template>
        </Column>
      </DataTable>
    </div>  

    <Dialog
        header="Details"
        :visible="displayBasic"
        :style="{ width: '50rem' }"
        :modal="true"
        @update:visible="closeBasic()"
        >
        <div>
          <div class="m-0">
            <div class="grid">
              <div class="col-10">
                <h3>Title: {{ element.attributes.title }}</h3>
                <p class="text-justify">
                  External_id: {{ element.attributes.external_id }}
                  <br>
                  Magnitude: {{ element.attributes.magnitude }}
                  <br>
                  Tsunami: {{ element.attributes.tsunami }}
                </p>
                <h4>Coordinates</h4>
                <p class="text-justify">
                  latitude: {{ element.attributes.coordinates.latitude }}
                  <br>
                  longitude: {{ element.attributes.coordinates.longitude }} 
                </p>
              </div>
            </div>
            <p class="text-justify">
              <EarthquakeComments :earthquake_event_id="comment.earthquake_event_id" />
            </p>
          </div>
        </div>
    </Dialog>
  </div>
</template>

<script>
import { earthquakeService } from "@/services/earthquake";

import EarthquakeComments from '@/components/EarthquakeComments.vue';

import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import Badge from 'primevue/badge';

export default {
  name: 'EarthquakesList',
  props: {
  },
  components: {
    Dropdown, DataTable, Column, Button, Dialog, Badge, EarthquakeComments,
  },
  computed: {
    filteredEarthquakes() {
      if (this.selectedMagType) {
        return this.earthquakes.filter(earthquake =>
          earthquake.attributes.mag_type == this.selectedMagType.code);
      } else {
        return this.earthquakes;
      }
    }
  },
  data() {
    return {
      earthquakes: [],
      pagination: {},
      selectedMagType: '',
      displayBasic: false,
      element: {},
      comment: { body: '', earthquake_event_id: Number || 0 },
      mag_types: [
        { name: 'md', code: 'md' },
        { name: 'ml', code: 'ml' },
        { name: 'ms', code: 'ms' },
        { name: 'mw', code: 'mw' },
        { name: 'me', code: 'me' },
        { name: 'mi', code: 'mi' },
        { name: 'mb', code: 'mb' },
        { name: 'mlg', code: 'mlg' }
      ]
    };
  },
  mounted() {
    this.loadEarthquakes();
  },
  methods: {
    openBasic() {
      this.displayBasic = true;
    },
    closeBasic() {
      this.displayBasic = false;
    },
    openModal(element) {
      this.element = element
      this.comment.earthquake_event_id = element.id
      this.openBasic()
    },
    async loadEarthquakes() {
      try {
        const response = await earthquakeService.getEarthquakes();
        const { data, pagination } = response.data;
        this.earthquakes = data;
        this.pagination = pagination;
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
}
</script>

<style scoped>
  .p-datatable.p-component.p-datatable-responsive-scroll {
    width: 60rem;
  }
</style>
