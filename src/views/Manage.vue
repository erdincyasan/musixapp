<template>
  <main>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <app-upload :addSong="addSong"></app-upload>
        </div>
        <div class="col-span-2">
          <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">{{$t('manage.my_songs')}}</span>
              <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
            </div>
            <div class="p-6">
              <!-- Composition Items -->
              <composite-item
                :updateUnsavedFlag="updateUnsavedFlag"
                :removeSong="removeSong"
                :updateSong="updateSong"
                v-for="(song, i) in songs"
                :key="song.docID"
                :song="song"
                :index="i"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import store from '@/store';
import AppUpload from '@/components/Upload.vue';
import CompositeItem from '@/components/CompositeItem.vue';
import { songsCollection, auth } from '@/includes/firebase';

export default {
  name: 'manage',
  components: {
    AppUpload,
    CompositeItem,
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
      this.unsavedFlag = false;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(val) {
      this.unsavedFlag = val;
    },
  },

  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();
    snapshot.forEach(this.addSong);
  },
  // Using ref
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
  // beforeRouteEnter(to, from, next) {
  //   if (store.state.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: 'home' });
  //   }
  // },
  beforeRouteLeave(to, from, next) {
    if (this.unsavedFlag) {
      // eslint-disable-next-line no-alert , no-restricted-globals
      const yeah = confirm('U have an un saved changes do you realy want to leave?');
      next(yeah);
    } else {
      next();
    }
    // eslint-disable-next-line no-alert
  },
};
</script>
