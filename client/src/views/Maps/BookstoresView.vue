<template>
    <GMapMap :center="center" :options="options" :zoom="14" style="width: 100%; height: 700px">
        <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="false"
            @click="openMarker(m.id)">
            <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="openedMarkerID === m.id" :options="{
                pixelOffset: {
                    width: 10, height: 0
                },
                maxWidth: 320,
                maxHeight: 320,
            }">
                <div class="marker-info">
                    <span class="marker-info-title">{{ m.name }}</span>
                    <span class="marker-info-address">{{ m.address }}</span>
                    <MarkerInfo :marker-id="m.id" :name="m.name" />
                </div>
            </GMapInfoWindow>
        </GMapMarker>
    </GMapMap>
</template>

<script lang="ts">
import MarkerInfo from '@/components/MarkerInfo.vue'
import { usePlaceStore } from '@/stores/bookstores'

const placeStore = usePlaceStore()

const placeList = await placeStore.getAllPlaces()

export default {
    name: 'App',
    data() {
        return {
            openedMarkerID: null,
            center: { lat: -5.812066078186035, lng: -35.20643997192383 },
            markers: placeList,
            options: {
                'mapId': "4b40abc6af8af194"
            }
        }
    },
    methods: {
        openMarker(id) {
            this.openedMarkerID = id
        },
    },
    components: {
        MarkerInfo
    },
}

</script>

<style scoped>
.marker-info span {
    display: block;
    margin: 10px 0px;
}

.marker-info-title {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
}
</style>